import * as cheerio from 'cheerio';
import { TITLE_1, DESC_1, INITIAL_CODE_1, HINTS_1, TITLE_2, DESC_2, INITIAL_CODE_2, HINTS_2, TITLE_3, DESC_3, INITIAL_CODE_3, HINTS_3, TITLE_4, DESC_4, INITIAL_CODE_4, HINTS_4 } from "@/lib/constants";

export interface Exercise {
  id: number;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hints: string[];
  validation: (code: string) => boolean;
}

export const exercises: Exercise[] = [
  {
    id: 1,
    title: TITLE_1,
    description: DESC_1,
    initialCode: INITIAL_CODE_1,
    solution: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Alter</th>
  </tr>
  <tr>
    <td>Anna</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Max</td>
    <td>30</td>
  </tr>
</table>`,
    hints: HINTS_1,
    validation: (code: string) => {
      try {
        const $ = cheerio.load(code);
        const table = $('table');
        if (table.length === 0) return false;
        const hasBorder = table.attr('border') !== undefined || table.attr('style') !== undefined;
        const hasTh = $('th').length > 0;
        const hasTd = $('td').length > 0;
        const hasTr = $('tr').length > 0;
        return hasBorder && hasTh && hasTd && hasTr;
      } catch {
        return false;
      }
    }
  },
  {
    id: 2,
    title: TITLE_2,
    description: DESC_2,
    initialCode: INITIAL_CODE_2,
    solution: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Alter</th>
    <th>Stadt</th>
  </tr>
  <tr>
    <td colspan="2">Gesamt</td>
    <td>2</td>
  </tr>
</table>`,
    hints: HINTS_2,
    validation: (code: string) => {
      try {
        const $ = cheerio.load(code);
        const table = $('table');
        if (table.length === 0) return false;
        const hasTr = $('tr').length > 0;
        const hasTdWithColspan = $('td[colspan]').length > 0;
        return hasTr && hasTdWithColspan;
      } catch {
        return false;
      }
    }
  },
  {
    id: 3,
    title: TITLE_3,
    description: DESC_3,
    initialCode: INITIAL_CODE_3,
    solution: `<table border="1">
  <tr>
    <th>Kategorie</th>
    <th>Produkt</th>
    <th>Preis</th>
  </tr>
  <tr>
    <td rowspan="2">Obst</td>
    <td>Apfel</td>
    <td>1.50€</td>
  </tr>
  <tr>
    <td>Banane</td>
    <td>1.20€</td>
  </tr>
</table>`,
    hints: HINTS_3,
    validation: (code: string) => {
      try {
        const $ = cheerio.load(code);
        const table = $('table');
        if (table.length === 0) return false;
        const hasTr = $('tr').length > 0;
        const hasTdWithRowspan = $('td[rowspan]').length > 0;
        return hasTr && hasTdWithRowspan;
      } catch {
        return false;
      }
    }
  },
  {
    id: 4,
    title: TITLE_4,
    description: DESC_4,
    initialCode: INITIAL_CODE_4,
    solution: `<table border="1">
  <tr>
    <th colspan="2">Personal</th>
    <th>Alter</th>
  </tr>
  <tr>
    <td rowspan="2">Entwicklung</td>
    <td>Anna</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Max</td>
    <td>30</td>
  </tr>
  <tr>
    <td rowspan="2">Design</td>
    <td>Lisa</td>
    <td>28</td>
  </tr>
  <tr>
    <td>Tom</td>
    <td>32</td>
  </tr>
</table>`,
    hints: HINTS_4,
    validation: (code: string) => {
      try {
        const $ = cheerio.load(code);
        const table = $('table');
        if (table.length === 0) return false;
        const hasTr = $('tr').length > 0;
        const hasTh = $('th').length > 0;
        const hasTd = $('td').length > 0;
        const hasTdWithRowspan = $('td[rowspan]').length > 0;
        const hasTdWithColspan = $('td[colspan]').length > 0;
        return hasTr && hasTh && hasTd && hasTdWithRowspan && hasTdWithColspan;
      } catch {
        return false;
      }
    }
  }
];