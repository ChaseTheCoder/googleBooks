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
    console.log("answer1: " + answer1);
    let query = answer1.googleSearch;
    console.log("query" + query);
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
  // addBook(queryResults);
};

const displayQuery = async (results) => {
  let queryResults = [];

  for(let i = 0; i < 5; i++){
    let bookNode = new Book(results.items[i].volumeInfo.title, results.items[i].volumeInfo.authors, results.items[i].volumeInfo.publisher);
    console.log(bookNode);
    queryResults.push(bookNode);
  }
  return queryResults;
}

const addPrompt = [
  {
      type: 'input',
      name: 'add',
      message: 'Which number book do you want to add? 0,1,2,3,4 '
  }
];

const addBook = () => {
  prompt(addPrompt).then(answer => {
      console.log("you chose: " + answer.number)
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