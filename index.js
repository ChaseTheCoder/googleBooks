const { prompt } = require('inquirer');
const fetch = require('node-fetch');

let readingList = [];

const welcome = () => {
  console.log('','\n','\n','\n','Welcome to Google Book Search','\n');
  start();
}

const initialChoices = [
  {
    type: 'list',
    name: 'initialChoices',
    message: 'Google Book Search: Select a Choice',
    choices: ['Search books', 'View Reading List', 'Done!']
  }
];

const askUser = () => {
  return prompt(initialChoices);
};

const start = () => {
  askUser().then(answer => {
    if(answer.initialChoices === 'Search books') {
      searchBooks();
    } else if(answer.initialChoices === 'View Reading List') {
      if(readingList.length < 1){
        console.log('\n')
        console.log('You don\'t have any books yet.')
        console.log('To add books, select Search books', '\n')
        start();
      } else { 
        console.log('\n')
        console.log('--------- Your Reading List --------- ')
        consoleQuery(readingList);
        start();
      }
    } else if(answer.initialChoices === 'Done!') {
      console.log('Thanks for using Google Book Search.')
      console.log('Until next time. Goodbye!')
      process.exit();
    }
  })
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
  key = 'AIzaSyDevB-OBasdn3STsB7imSEgcDclGwke3-w';
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5&key=${key}`
  ).catch( error => {
    console.log(error).then(searchBooks()); // attempt to search again if no result
  }
  );
  const results = await response.json();
  const queryResults = await creatQueryList(results);
  addBook(queryResults);
};

const creatQueryList = async (results) => {
  let queryResults = [];

  for(let i = 0; i < 5; i++){
    queryResults.push({
      title: results.items[i].volumeInfo.title, 
      authors: results.items[i].volumeInfo.authors, 
      publisher: results.items[i].volumeInfo.publisher
    });
  }
  console.log(queryResults);
  
  return queryResults;
}

const consoleQuery = (input) => {
  input.map((book, index) => {
    let bookNumber = index+1;
    console.log('\n');
    console.log('Book ' + bookNumber);
    console.log('Title: ' + book.title);
    console.log('Author(s): ' + book.authors);
    console.log('Publisher: ' + book.publisher);
  })
  console.log('\n');
}

const addPrompt = [
  {
      type: 'number',
      name: 'addBook',
      message: 'Enter the Book Number You want to add to your reading list.  Enter a number 1-5. If you don\'t want any enter: \"no\".'
  }
];

const addBook = (queryResults) => {
  prompt(addPrompt).then(answer2 => {
    if(typeof answer2.addBook !== 'number' || answer2.addBook < 1 || answer2.addBook > 5) {
      console.log('Please enter a valid number: 1, 2, 3, 4, 5')
      addBook(queryResults);
    } else {
      let choiceNumber = answer2.addBook - 1;
      console.log('\n');
      console.log('You chose: ' + answer2.addBook);
      readingList.push(queryResults[choiceNumber]);
      let index = readingList.length - 1;
      console.log(readingList[index].title + ' has been added to your Reading List ');
      console.log('\n');
      start();
    }
  })
};

welcome();

exports.bookQuery = bookQuery;
exports.askUser = askUser;
exports.creatQueryList = creatQueryList;