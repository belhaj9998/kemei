import express from 'express';
import cors from 'cors';
import { google } from 'googleapis';

const app = express();
const PORT = process.env.PORT || 3001;
const startTime = Date.now();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = process.env.SHEET_NAME || 'Orders';

const corsOptions = {
    origin: [
        'https://kemei-8yz.pages.dev',
        'http://localhost:8080',
        'http://localhost:5173'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

let sheets = null;
let sheetsEnabled = false;

async function initGoogleSheets() {
    console.log("⚠️ Google Sheets init temporarily disabled for Railway debug");
    return;

    try {
        const credentialsJson = process.env.GOOGLE_CREDENTIALS;
        if (!credentialsJson) {
            console.log('GOOGLE_CREDENTIALS not set');
            return;
        }
        if (!SPREADSHEET_ID) {
            console.log('SPREADSHEET_ID not set');
            return;
        }
        const credentials = JSON.parse(credentialsJson);
        const auth = new google.auth.GoogleAuth({
            credentials: credentials,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        const authClient = await auth.getClient();
        sheets = google.sheets({ version: 'v4', auth: authClient });
        sheetsEnabled = true;
        console.log('Google Sheets connected');
    } catch (error) {
        console.error('Google Sheets init failed:', error.message);
    }
}

async function appendToSheet(order) {
    if (!sheetsEnabled || !sheets) return false;
    try {
        const formattedDate = new Date(order.event_time).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
        const rowData = [
            formattedDate,
            order.name,
            order.phone,
            order.city,
            'New',
            order.page_url,
        ];
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:F`,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            requestBody: { values: [rowData] },
        });
        return true;
    } catch (error) {
        console.error('Sheets append failed:', error.message);
        return false;
    }
}

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
    res.json({ service: 'Kemei Order API', status: 'running' });
});

app.post('/webhook/order', async (req, res) => {
    try {
        const { name, phone, city, page_url, event_time } = req.body;
        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid name' });
        }
        if (!phone || typeof phone !== 'string' || phone.trim().length < 8) {
            return res.status(400).json({ success: false, error: 'Invalid phone' });
        }
        if (!city || typeof city !== 'string' || city.trim().length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid city' });
        }
        const order = {
            id: Date.now().toString(),
            name: name.trim(),
            phone: phone.trim(),
            city: city.trim(),
            page_url: page_url || 'unknown',
            event_time: event_time || new Date().toISOString(),
            received_at: new Date().toISOString()
        };
        const sheetAdded = await appendToSheet(order);
        console.log(`Order ${order.id}: ${order.name} - ${order.city}`);
        res.status(200).json({
            success: true,
            message: 'Order received',
            order_id: order.id,
            google_sheets: sheetAdded
        });
    } catch (error) {
        console.error('Order error:', error.message);
        res.status(500).json({ success: false, error: 'Server error' });
    }
});

async function startServer() {
    await initGoogleSheets();
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer();
