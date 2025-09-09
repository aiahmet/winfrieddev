// Test cases for improved HTML preview

import React from "react";
import { HtmlPreview } from "./components/HtmlPreview";

// Test cases for HTML preview
const testCases = [
  {
    name: "Table without border attribute",
    code: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table>`
  },
  {
    name: "Table with border attribute",
    code: `<table border="1">
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table>`
  },
  {
    name: "Table with style attribute",
    code: `<table style="border: 1px solid black;">
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table>`
  },
  {
    name: "Complex table with thead, tbody, tfoot",
    code: `<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Body 1</td>
      <td>Body 2</td>
    </tr>
    <tr>
      <td>Body 3</td>
      <td>Body 4</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Footer 1</td>
      <td>Footer 2</td>
    </tr>
  </tfoot>
</table>`
  },
  {
    name: "Table with colspan and rowspan",
    code: `<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>Doe</td>
    <td rowspan="2">25</td>
  </tr>
  <tr>
    <td>Jane</td>
    <td>Smith</td>
  </tr>
</table>`
  },
  {
    name: "Invalid HTML",
    code: `<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>John</td>
    <td>25</td>
  </tr>
</table`
  },
  {
    name: "Empty code",
    code: ``
  }
];

console.log("Testing improved HTML Preview component...\n");

testCases.forEach((testCase) => {
  console.log(`Test: ${testCase.name}`);
  console.log(`Code: ${testCase.code}`);
  
  // In a real test environment, we would render the component and check the output
  // For now, we'll just log that the test is being performed
  console.log("Rendering HtmlPreview component with this code...");
  console.log("-------------------\n");
});

console.log("HTML Preview testing complete.");

// Example usage of the component
export function TestHtmlPreview() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">HtmlPreview Component Tests</h1>
      
      {testCases.map((testCase, index) => (
        <div key={index} className="border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">{testCase.name}</h2>
          <div className="mt-4">
            <HtmlPreview code={testCase.code} />
          </div>
        </div>
      ))}
    </div>
  );
}