const askUser = require('../index');

it('return prompt', async () => {
  const initialChoices = [
    {
      type: 'list',
      name: 'initialChoices',
      message: 'Google Book Search: Select a Choice',
      choices: ['Search books', 'View Reading List', 'Done!']
    }
  ];
  
  const result = await askUser();
  expect(result).toBe(initialChoices);
});