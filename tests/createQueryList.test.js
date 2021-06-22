const index = require('../index');
const testData = require('./testData');

it('consoles query results', async () => {
  const results = [
    {
      title: "Learning Python",
      authors: [
        "Mark Lutz"
      ],
      publisher: "O'Reilly Media, Inc."
    },
    {
      title: "Violent Python",
      authors: [
      "TJ O'Connor"
      ],
      publisher: "Syngress",
    },
    {
      title: "Python Tricks",
      authors: [
      "Dan Bader"
      ],
      publisher: "Dan Bader"
    },
    {
      title: "Python Data Science Handbook",
      authors: [
      "Jake VanderPlas"
      ],
      publisher: "O'Reilly Media, Inc."
    }
  ]

  const result = await index.creatQueryList(testData.testData);
  expect(result).toBe(results);
});