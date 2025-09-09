export function Footer() {
  return (
    <footer className="bg-muted border-t border-border mt-16 focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">© 2024 WinfriedDev. Alle Rechte vorbehalten.</p>
          </div>
          <nav aria-label="Footer Navigation">
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:rounded px-2 py-1 touch-manipulation min-h-[44px] flex items-center"
                aria-label="Impressum - Legal information"
              >
                Impressum
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:rounded px-2 py-1 touch-manipulation min-h-[44px] flex items-center"
                aria-label="Datenschutz - Privacy policy"
              >
                Datenschutz
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:rounded px-2 py-1 touch-manipulation min-h-[44px] flex items-center"
                aria-label="Kontakt - Contact information"
              >
                Kontakt
              </a>
            </div>
          </nav>
        </div>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Erstellt für 17-jährige Schüler in Deutschland
        </div>
      </div>
    </footer>
  );
}