const index = require('./index');

it('google books api query for keyword python', () => {
  let fetchCalled = false;
  const fakeFetch = (url) => {
    expect(url).toBe('https://www.googleapis.com/books/v1/volumes?q=python&key=AIzaSyDevB-OBasdn3STsB7imSEgcDclGwke3-w&maxResults=5')
    fetchCalled = true;
    return Promise.resolve({
      json: () => Promise.resolve({
        kind: 'books#volumes',
        totalItems: 1583,
        items: [
          {
            kind: 'books#volume',
            id: 'BcN0swEACAAJ',
            etag: '5+RNYh69XnM',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/BcN0swEACAAJ',
            volumeInfo: [Object],
            saleInfo: [Object],
            accessInfo: [Object],
            searchInfo: [Object]
          },
          {
            kind: 'books#volume',
            id: 'pMEUG8oNBfkC',
            etag: 'TVdPZkn4qQ0',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/pMEUG8oNBfkC',
            volumeInfo: [Object],
            saleInfo: [Object],
            accessInfo: [Object],
            searchInfo: [Object]
          },
          {
            kind: 'books#volume',
            id: '6omNDQAAQBAJ',
            etag: 'MMquI6JMjWY',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/6omNDQAAQBAJ',
            volumeInfo: [Object],
            saleInfo: [Object],
            accessInfo: [Object],
            searchInfo: [Object]
          },
          {
            kind: 'books#volume',
            id: '9MS9BQAAQBAJ',
            etag: 'Fp72nftypxc',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/9MS9BQAAQBAJ',
            volumeInfo: [Object],
            saleInfo: [Object],
            accessInfo: [Object],
            searchInfo: [Object]
          },
          {
            kind: 'books#volume',
            id: '4pgQfXQvekcC',
            etag: 'kSOQWu241v8',
            selfLink: 'https://www.googleapis.com/books/v1/volumes/4pgQfXQvekcC',
            volumeInfo: [Object],
            saleInfo: [Object],
            accessInfo: [Object],
            searchInfo: [Object]
          }
        ]
      })
    })
  }

  return index.bookQuery(fakeFetch).then(result => {
    expect(result).toBe({
      kind: 'books#volumes',
      totalItems: 1583,
      items: [
        {
          kind: 'books#volume',
          id: 'BcN0swEACAAJ',
          etag: '5+RNYh69XnM',
          selfLink: 'https://www.googleapis.com/books/v1/volumes/BcN0swEACAAJ',
          volumeInfo: [Object],
          saleInfo: [Object],
          accessInfo: [Object],
          searchInfo: [Object]
        },
        {
          kind: 'books#volume',
          id: 'pMEUG8oNBfkC',
          etag: 'TVdPZkn4qQ0',
          selfLink: 'https://www.googleapis.com/books/v1/volumes/pMEUG8oNBfkC',
          volumeInfo: [Object],
          saleInfo: [Object],
          accessInfo: [Object],
          searchInfo: [Object]
        },
        {
          kind: 'books#volume',
          id: '6omNDQAAQBAJ',
          etag: 'MMquI6JMjWY',
          selfLink: 'https://www.googleapis.com/books/v1/volumes/6omNDQAAQBAJ',
          volumeInfo: [Object],
          saleInfo: [Object],
          accessInfo: [Object],
          searchInfo: [Object]
        },
        {
          kind: 'books#volume',
          id: '9MS9BQAAQBAJ',
          etag: 'Fp72nftypxc',
          selfLink: 'https://www.googleapis.com/books/v1/volumes/9MS9BQAAQBAJ',
          volumeInfo: [Object],
          saleInfo: [Object],
          accessInfo: [Object],
          searchInfo: [Object]
        },
        {
          kind: 'books#volume',
          id: '4pgQfXQvekcC',
          etag: 'kSOQWu241v8',
          selfLink: 'https://www.googleapis.com/books/v1/volumes/4pgQfXQvekcC',
          volumeInfo: [Object],
          saleInfo: [Object],
          accessInfo: [Object],
          searchInfo: [Object]
        }
      ]
    })
    expect(fakeFetch).toBe(true)
  })
})