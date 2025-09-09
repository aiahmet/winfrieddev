// Exercise Challenge Constants
export const EXERCISE_PREFIX = "Übung";
export const COMPLETED_STATUS = "Abgeschlossen";
export const IN_PROGRESS_STATUS = "In Arbeit";
export const EDITOR_LABEL = "Editor:";
export const SUCCESS_MESSAGE = "Großartig! Deine Lösung ist korrekt. Weiter geht's mit der nächsten Übung.";
export const PREVIOUS_EXERCISE = "Vorherige Übung";
export const RESET_BUTTON = "Zurücksetzen";
export const SHOW_SOLUTION = "Lösung anzeigen";
export const NEXT_EXERCISE = "Nächste Übung";
export const FINISH_BUTTON = "Abschließen";

// Exercise Data Constants
export const TITLE_1 = "Einfache Tabelle erstellen";
export const DESC_1 = "Erstelle eine einfache Tabelle mit einer Kopfzeile und zwei Datenzeilen. Verwende die Tags <table>, <tr>, <th> und <td>.";
export const INITIAL_CODE_1 = "<!-- Erstelle hier deine Tabelle -->";
export const HINT_1_1 = "Verwende das <table>-Tag für die Tabelle";
export const HINT_1_2 = "Die Kopfzeile wird mit <th>-Tags erstellt";
export const HINT_1_3 = "Datenzellen verwenden <td>-Tags";
export const HINT_1_4 = "Jede Zeile benötigt ein <tr>-Tag";
export const HINTS_1 = [HINT_1_1, HINT_1_2, HINT_1_3, HINT_1_4];

export const TITLE_2 = "Tabelle mit Colspan";
export const DESC_2 = "Erstelle eine Tabelle mit einer Zelle, die sich über zwei Spalten erstreckt. Verwende das colspan-Attribut.";
export const INITIAL_CODE_2 = `<table border="1">
  <tr>
    <th>Name</th>
    <th>Alter</th>
    <th>Stadt</th>
  </tr>
  <!-- Füge hier eine Zeile mit colspan hinzu -->
</table>`;
export const HINT_2_1 = "Füge eine neue <tr>-Zeile hinzu";
export const HINT_2_2 = "Verwende das colspan-Attribut in einem <td>-Tag";
export const HINT_2_3 = "colspan=\"2\" bedeutet, dass die Zelle zwei Spalten breit ist";
export const HINTS_2 = [HINT_2_1, HINT_2_2, HINT_2_3];

export const TITLE_3 = "Tabelle mit Rowspan";
export const DESC_3 = "Erstelle eine Tabelle mit einer Zelle, die sich über zwei Zeilen erstreckt. Verwende das rowspan-Attribut.";
export const INITIAL_CODE_3 = `<table border="1">
  <tr>
    <th>Kategorie</th>
    <th>Produkt</th>
    <th>Preis</th>
  </tr>
  <!-- Erstelle hier Zeilen mit rowspan -->`;
export const HINT_3_1 = "Verwende das rowspan-Attribut in einem <td>-Tag";
export const HINT_3_2 = "rowspan=\"2\" bedeutet, dass die Zelle zwei Zeilen hoch ist";
export const HINT_3_3 = "Achte darauf, dass die nachfolgenden Zeilen eine Zelle weniger haben";
export const HINTS_3 = [HINT_3_1, HINT_3_2, HINT_3_3];

export const TITLE_4 = "Komplexe Tabelle";
export const DESC_4 = "Erstelle eine komplexe Tabelle mit sowohl colspan als auch rowspan. Kombiniere beide Attribute in einer Tabelle.";
export const INITIAL_CODE_4 = "<!-- Erstelle hier eine komplexe Tabelle -->";
export const HINT_4_1 = "Plane zuerst deine Tabellenstruktur auf Papier";
export const HINT_4_2 = "Verwende colspan für Zellen, die sich über mehrere Spalten erstrecken";
export const HINT_4_3 = "Verwende rowspan für Zellen, die sich über mehrere Zeilen erstrecken";
export const HINT_4_4 = "Achte darauf, dass die Anzahl der Zellen in jeder Zeile stimmt";
export const HINTS_4 = [HINT_4_1, HINT_4_2, HINT_4_3, HINT_4_4];