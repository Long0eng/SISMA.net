const Footer = () => {
  return (
    <footer className="py-12 bg-primary">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg font-bold text-primary-foreground">
              sisma<span className="text-gradient">.net</span>
            </p>
            <p className="text-sm text-primary-foreground/50 mt-1">
              Monitoraggio sismico accessibile per tutti.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-primary-foreground/50">
            <a href="#chi-siamo" className="hover:text-primary-foreground transition-colors">Chi Siamo</a>
            <a href="#prodotto" className="hover:text-primary-foreground transition-colors">Prodotto</a>
            <a href="#mappa" className="hover:text-primary-foreground transition-colors">Mappa</a>
            <a href="#acquista" className="hover:text-primary-foreground transition-colors">Acquista</a>
            <a href="#login" className="hover:text-primary-foreground transition-colors">Login</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/30">
          © 2025 sisma.net. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
