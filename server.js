import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { google } from 'googleapis';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const CREDENTIALS_FILE = path.join(__dirname, 'credentials.json');

// Google Sheets Configuration
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Orders';

// Middleware
app.use(cors());
app.use(express.json());

// Initialize orders file if it doesn't exist
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}

// Google Sheets Setup
let sheets = null;
let sheetsEnabled = false;

async function initGoogleSheets() {
    try {
        if (!fs.existsSync(CREDENTIALS_FILE)) {
            console.log('⚠️  credentials.json not found - Google Sheets disabled');
            return;
        }

        const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_FILE, 'utf-8'));

        // Check if it's a placeholder file
        if (credentials._comment) {
            console.log('⚠️  credentials.json is placeholder - Google Sheets disabled');
            return;
        }

        if (!SPREADSHEET_ID || SPREADSHEET_ID === 'your_spreadsheet_id_here') {
            console.log('⚠️  SPREADSHEET_ID not configured - Google Sheets disabled');
            return;
        }

        const auth = new google.auth.GoogleAuth({
            keyFile: CREDENTIALS_FILE,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const authClient = await auth.getClient();
        sheets = google.sheets({ version: 'v4', auth: authClient });
        sheetsEnabled = true;
        console.log('✅ Google Sheets connected successfully');
    } catch (error) {
        console.error('❌ Failed to initialize Google Sheets:', error.message);
    }
}
// Verify sheet tab exists, create if missing
async function ensureSheetExists() {
    try {
        const response = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        const sheetNames = response.data.sheets.map(s => s.properties.title);
        console.log('📋 Available sheets:', sheetNames);

        if (!sheetNames.includes(SHEET_NAME)) {
            console.log(`⚠️ Sheet "${SHEET_NAME}" not found, creating...`);
            await sheets.spreadsheets.batchUpdate({
                spreadsheetId: SPREADSHEET_ID,
                requestBody: {
                    requests: [{
                        addSheet: {
                            properties: { title: SHEET_NAME }
                        }
                    }]
                }
            });
            console.log(`✅ Sheet "${SHEET_NAME}" created`);
        }
        return true;
    } catch (error) {
        console.error('❌ Failed to verify/create sheet:', error.message);
        return false;
    }
}

// Append order to Google Sheets
async function appendToSheet(order) {
    console.log('🔍 appendToSheet called, sheetsEnabled:', sheetsEnabled, 'sheets:', !!sheets);

    if (!sheetsEnabled || !sheets) {
        console.log('⚠️ Sheets not enabled, skipping append');
        return false;
    }

    try {
        // Verify sheet exists
        await ensureSheetExists();

        // Format date for spreadsheet
        const formattedDate = new Date(order.event_time).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Row data matching columns: Date, Name, Phone, City, Status, Source Page
        const rowData = [
            formattedDate,        // Date
            order.name,           // Name
            order.phone,          // Phone
            order.city,           // City
            'New',                // Status
            order.page_url,       // Source Page
        ];

        const range = `${SHEET_NAME}!A:F`;
        console.log('🔍 Appending to spreadsheetId:', SPREADSHEET_ID);
        console.log('🔍 Sheet name:', SHEET_NAME);
        console.log('🔍 Range:', range);
        console.log('🔍 Row data:', rowData);

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: range,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: {
                values: [rowData],
            },
        });

        console.log('📊 Order added to Google Sheets!');
        console.log('📊 Response status:', response.status);
        console.log('📊 Updates:', JSON.stringify(response.data?.updates));
        return true;
    } catch (error) {
        console.error('❌ Failed to append to Google Sheets:', error.message);
        if (error.response?.data) {
            console.error('❌ API Error:', JSON.stringify(error.response.data));
        }
        console.error('❌ Full error:', error);
        return false;
    }
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        google_sheets: sheetsEnabled ? 'connected' : 'disabled'
    });
});

// Webhook endpoint for receiving orders
app.post('/webhook/order', async (req, res) => {
    try {
        const { name, phone, city, page_url, event_time } = req.body;

        // Validate required fields
        if (!name || !phone || !city) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: name, phone, city'
            });
        }

        // Create order object
        const order = {
            id: Date.now().toString(),
            name,
            phone,
            city,
            page_url: page_url || 'unknown',
            event_time: event_time || new Date().toISOString(),
            received_at: new Date().toISOString()
        };

        // Read existing orders
        const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));

        // Add new order
        orders.push(order);

        // Save orders locally
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

        // Add to Google Sheets
        const sheetAdded = await appendToSheet(order);

        // Log the order
        console.log('\n=== New Order Received ===');
        console.log(`📦 Order ID: ${order.id}`);
        console.log(`👤 Name: ${order.name}`);
        console.log(`📞 Phone: ${order.phone}`);
        console.log(`📍 City: ${order.city}`);
        console.log(`🔗 Page URL: ${order.page_url}`);
        console.log(`⏰ Event Time: ${order.event_time}`);
        console.log(`📊 Google Sheets: ${sheetAdded ? 'Added' : 'Skipped'}`);
        console.log('========================\n');

        res.status(200).json({
            success: true,
            message: 'Order received successfully',
            order_id: order.id,
            google_sheets: sheetAdded
        });

    } catch (error) {
        console.error('Error processing order:', error);
        res.status(500).json({
            success: false,
            error: 'Internal server error'
        });
    }
});

// Get all orders (for testing/admin purposes)
app.get('/orders', (req, res) => {
    try {
        const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
        res.json({ success: true, count: orders.length, orders });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error reading orders' });
    }
});

// Start server
async function startServer() {
    await initGoogleSheets();

    app.listen(PORT, () => {
        console.log(`\n🚀 Webhook Server running on http://localhost:${PORT}`);
        console.log(`📨 Webhook URL: http://localhost:${PORT}/webhook/order`);
        console.log(`💾 Orders saved to: ${ORDERS_FILE}`);
        console.log(`📊 Google Sheets: ${sheetsEnabled ? 'Enabled' : 'Disabled'}\n`);
    });
}

startServer();
