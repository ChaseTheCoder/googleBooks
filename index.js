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


const bookQuery = (query) => {
  let queryResults = [];
  books.search(query, function(error, results) {
    if ( ! error ) {
        for(let i = 0; i < 5; i++){
            let bookNode = new Book(results[i].title, results[i].authors, results[i].publisher);
            queryResults.push(bookNode);
        }
        console.log(queryResults)
    } else {
        console.log(error);
    }
  })
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
      bookQuery(answer1.title)
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