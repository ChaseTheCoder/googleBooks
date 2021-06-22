const index = require('../index');
const testData = require('./testData');

it('google books api query for keyword python', async () => {
  // let fetchCalled = false;
  // const fakeFetch = (url) => {
  //   expect(url).toBe('https://www.googleapis.com/books/v1/volumes?q=python&key=AIzaSyDevB-OBasdn3STsB7imSEgcDclGwke3-w&maxResults=5')
  //   fetchCalled = true;
  //   return Promise.resolve({
  //     json: () => Promise.resolve(TestData)
  //   })
  // }

  const result = await index.bookQuery(testData);
  expect(result.items[0].volumeInfo.title).toBe("Learning Python");
})