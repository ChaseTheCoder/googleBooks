const { prompt } = require('inquirer');
const books = require('google-books-search');

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

let bookQueryResults = [];

const bookQuery = (query) => {
  books.search(query, function(error, results) {
    if ( ! error ) {
        for(let i = 0; i < 5; i++){
            let bookNode = new Book(results[i].title, results[i].authors, results[i].publisher);
            bookQueryResults.push(bookNode);
            // console.log(bookNode);
        }
        console.log(bookQueryResults)
    } else {
        console.log(error);
    }
  })
  print(bookQueryResults)
};

const print = (input) => {
  let counter = 1
  input.forEach( current => {
    console.log('Book ' + counter + ' -----------------');
    console.log('Title: ' + current.title);
    console.log('Authors: ' + current.authors);
    console.log('Publisher: ' + current.publisher);
    console.log(' ');
    counter++;
  })
};

const titleSearch = [
  {
      type: 'input',
      name: 'title',
      message: 'Search Books By Key Words: '
  }
];

const searchBooks = () => {
  prompt(titleSearch).then(answers => {
      bookQuery(answers.title)
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