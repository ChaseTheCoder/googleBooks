const { prompt } = require('inquirer');
const Book = require('./model.js');
const fetch = require("node-fetch");

const askUser = () => {
  return prompt([
    {
      type: 'list',
      name: 'initialChoices',
      message: 'Google Book Search: Select a Choice',
      choices: ['Search books', 'View Reading List', 'Done!']
    }
  ])
};

const searchPrompt = [
  {
      type: 'input',
      name: 'googleSearch',
      message: 'Search Books By Key Words: '
  }
];

const searchBooks = () => {
  prompt(searchPrompt).then(answer1 => {
    let query = answer1.googleSearch;
    bookQuery(query)
  })
};

const bookQuery = async (query) => {
  key = "AIzaSyDevB-OBasdn3STsB7imSEgcDclGwke3-w";
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${key}&maxResults=5`
  );
  const results = await response.json();
  const queryResults = await displayQuery(results);
  queryResults.map((book, index) => {
    console.log("\n");
    console.log("Book " + index+1);
    console.log("Title: " + book.title);
    console.log("Author(s): " + book.authors);
    console.log("Publisher: " + book.publisher);
  })
  console.log("\n");
  addBook(queryResults);
};

const displayQuery = async (results) => {
  let queryResults = [];

  for(let i = 0; i < 5; i++){
    let bookNode = new Book(results.items[i].volumeInfo.title, results.items[i].volumeInfo.authors, results.items[i].volumeInfo.publisher);
    queryResults.push(bookNode);
  }
  return queryResults;
}

const addPrompt = [
  {
      type: 'number',
      name: 'addBook',
      message: 'Enter the Book Number You want to add to your reading list.  Enter a number 1-5.'
  }
];

const addBook = (queryResults) => {
  prompt(addPrompt).then(answer2 => {
    if (typeof answer2.addBook !== 'number' || answer2.addBook < 1 || answer2.addBook > 5) {
      console.log("Please enter a valid number: 1, 2, 3, 4, 5")
      addBook(queryResults);
    } else {
      console.log("you chose: " + answer2.addBook)
    }
  })
};


const start = () => {
  console.log('','\n','\n','\n',"Welcome to Google Book Search",'\n');
  askUser().then(answer => {
    if(answer.initialChoices === 'Search books') {
      searchBooks();
    }
  })
}

start();

// module.exports = index;