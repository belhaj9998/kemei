const Footer = () => {
  return (
    <footer className="py-8 bg-card border-t border-border" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-gradient">Kemei</span>
            <span className="text-muted-foreground">®</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Kemei. جميع الحقوق محفوظة.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              موديل: KM-1871
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
