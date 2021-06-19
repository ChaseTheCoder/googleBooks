const { prompt } = require('inquirer');
const books = require('google-books-search');
// const Book = require('./model.js');
const fetch = require("node-fetch");

class Book {
  constructor(title, authors, publisher){
    this.title = title;
    this.authors = authors;
    this.publisher = publisher;
  }
}

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

const bookQuery = async (query) => {
  let queryResults = [];

  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  const results = await response.json();

  console.log(results)
  addBook();
};

const searchPrompt = [
  {
      type: 'input',
      name: 'title',
      message: 'Search Books By Key Words: '
  }
];

const searchBooks = () => {
  prompt(searchPrompt).then(answer1 => {
      bookQuery(answer1)
  })
};

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