// Test cases for HTML preview

// Test cases for HTML preview
// Test cases for HTML preview

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
  }
];

console.log("Testing HTML Preview component...\n");

testCases.forEach((testCase) => {
  console.log(`Test: ${testCase.name}`);
  console.log(`Code: ${testCase.code}`);
  console.log("-------------------\n");
});

console.log("HTML Preview testing complete.");