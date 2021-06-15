# Command Line Google Book Search

Command line application using JavaScript that uses Google Book API to search for books and construct a reading list of your favorites.

## Installation

Clone and run npm install to locally run and save reading list.


```bash
npm install
```

## Libraries

* 'google-books-search' A simple Node.js client for the Google Books API.
* 'inquirer' A collection of common interactive command line user interfaces.

## Project Status

Currently able to retrieve data through a search using google-boooks-search.

Bug: index.js lines 25-36
Expectation: run a google-books-search using 'books.search(...)',line25, then console.log results at line 29. Then run 'addBook()'.
Result: 'addBook()' runs first, then the console.log appears.  
Next Attempt: I need this to run synchronously because I will use the data from the Google Books to select in next prompt to save in a reading list.
I've tried async / await in the current fuction, yet the same results occur.
Feedback more than welcome!

### Next Actions
Once the data retrieving I will then easily be able to add one of the book queries selected to the reading list.  I would continue using recursion to in prompts (inquirer) so the user could continue with the program in the terminal.

## Contributers
Chase Sheaff
Full Stack Developer
General Assembly Software Engingeering Immersive Alumni