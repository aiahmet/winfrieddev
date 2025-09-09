export interface Example {
  id: number;
  title: string;
  code: string;
  description: string;
  difficulty: "Anfänger" | "Fortgeschritten" | "Experte";
  category: "Basic" | "Advanced" | "Forms" | "Comparisons" | "Data";
}

export const examples: Example[] = [
  {
    id: 1,
    title: "Einfache Tabelle",
    code: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Alter</th>
    <th>Stadt</th>
  </tr>
  <tr>
    <td>Anna</td>
    <td>25</td>
    <td>Berlin</td>
  </tr>
  <tr>
    <td>Max</td>
    <td>30</td>
    <td>München</td>
  </tr>
</table>`,
    description: "Eine grundlegende Tabelle mit Kopfzeile und Datenzeilen.",
    difficulty: "Anfänger",
    category: "Basic"
  },
  {
    id: 2,
    title: "Tabelle mit Colspan",
    code: `<table border="1">
  <tr>
    <th colspan="2">Persönliche Daten</th>
    <th>Beruf</th>
  </tr>
  <tr>
    <td>Vorname</td>
    <td>Nachname</td>
    <td>Entwickler</td>
  </tr>
  <tr>
    <td>Anna</td>
    <td>Müller</td>
    <td>Designer</td>
  </tr>
</table>`,
    description: "Verwendung von colspan um Zellen über mehrere Spalten zu erstrecken.",
    difficulty: "Fortgeschritten",
    category: "Advanced"
  },
  {
    id: 3,
    title: "Tabelle mit Rowspan",
    code: `<table border="1">
  <tr>
    <th rowspan="2">Kategorie</th>
    <th colspan="2">Produkte</th>
  </tr>
  <tr>
    <th>Preis</th>
    <th>Menge</th>
  </tr>
  <tr>
    <td>Obst</td>
    <td>2.50 €</td>
    <td>10</td>
  </tr>
  <tr>
    <td>Gemüse</td>
    <td>1.80 €</td>
    <td>5</td>
  </tr>
</table>`,
    description: "Verwendung von rowspan um Zellen über mehrere Zeilen zu erstrecken.",
    difficulty: "Experte",
    category: "Advanced"
  },
  {
    id: 4,
    title: "Vergleichstabelle",
    code: `<table border="1">
  <tr>
    <th>Feature</th>
    <th>Basic Plan</th>
    <th>Pro Plan</th>
    <th>Enterprise</th>
  </tr>
  <tr>
    <td>Speicher</td>
    <td>10 GB</td>
    <td>100 GB</td>
    <td>Unbegrenzt</td>
  </tr>
  <tr>
    <td>Benutzer</td>
    <td>1</td>
    <td>10</td>
    <td>Unbegrenzt</td>
  </tr>
  <tr>
    <td>Support</td>
    <td>E-Mail</td>
    <td>24/7 Chat</td>
    <td>Dediziert</td>
  </tr>
</table>`,
    description: "Eine Vergleichstabelle für verschiedene Service-Optionen.",
    difficulty: "Fortgeschritten",
    category: "Comparisons"
  },
  {
    id: 5,
    title: "Datentabelle mit Styling",
    code: `<table border="1" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th style="padding: 8px; text-align: left;">Produkt</th>
      <th style="padding: 8px; text-align: left;">Preis</th>
      <th style="padding: 8px; text-align: left;">Verfügbarkeit</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 8px;">Laptop</td>
      <td style="padding: 8px;">999 €</td>
      <td style="padding: 8px;">Auf Lager</td>
    </tr>
    <tr style="background-color: #f9f9f9;">
      <td style="padding: 8px;">Smartphone</td>
      <td style="padding: 8px;">599 €</td>
      <td style="padding: 8px;">Ausverkauft</td>
    </tr>
  </tbody>
</table>`,
    description: "Eine gestaltete Datentabelle mit Kopf- und Körperbereichen.",
    difficulty: "Fortgeschritten",
    category: "Data"
  },
  {
    id: 6,
    title: "Formular mit Tabelle",
    code: `<form>
  <table border="1">
    <tr>
      <td><label for="name">Name:</label></td>
      <td><input type="text" id="name" name="name"></td>
    </tr>
    <tr>
      <td><label for="email">E-Mail:</label></td>
      <td><input type="email" id="email" name="email"></td>
    </tr>
    <tr>
      <td colspan="2"><input type="submit" value="Absenden"></td>
    </tr>
  </table>
</form>`,
    description: "Ein Formular integriert in eine Tabelle für strukturierte Eingaben.",
    difficulty: "Experte",
    category: "Forms"
  },
  {
    id: 7,
    title: "Zeitplantabelle",
    code: `<table border="1">
  <tr>
    <th rowspan="2">Tag</th>
    <th colspan="3">Zeitplan</th>
  </tr>
  <tr>
    <th>Morgen</th>
    <th>Mittag</th>
    <th>Abend</th>
  </tr>
  <tr>
    <td>Montag</td>
    <td>Arbeit</td>
    <td>Pause</td>
    <td>Freizeit</td>
  </tr>
  <tr>
    <td>Dienstag</td>
    <td>Sport</td>
    <td>Meeting</td>
    <td>Lernen</td>
  </tr>
</table>`,
    description: "Eine Zeitplantabelle mit rowspan und colspan für komplexe Layouts.",
    difficulty: "Experte",
    category: "Advanced"
  },
  {
    id: 8,
    title: "Produktkatalog",
    code: `<table border="1" style="border-collapse: collapse;">
  <tr>
    <th style="padding: 10px;">Produkt</th>
    <th style="padding: 10px;">Beschreibung</th>
    <th style="padding: 10px;">Preis</th>
  </tr>
  <tr>
    <td style="padding: 10px;">Buch</td>
    <td style="padding: 10px;">Ein spannendes Abenteuer</td>
    <td style="padding: 10px;">19.99 €</td>
  </tr>
  <tr>
    <td style="padding: 10px;">Film</td>
    <td style="padding: 10px;">Action geladen</td>
    <td style="padding: 10px;">14.99 €</td>
  </tr>
</table>`,
    description: "Ein einfacher Produktkatalog in Tabellenform.",
    difficulty: "Anfänger",
    category: "Data"
  }
];