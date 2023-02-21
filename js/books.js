/**
 * Project: Awesome-books
 * File: books.js
 * Created: 2/20/23
 * Author: Abdullah Al Mamun <mamun1214@gmail.com>
 */
// Book Class
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
// UI class
class Interface {
  static displayBooks() {
    // const libray = [
    //   {
    //     title: "Things fall Apart",
    //     author: "Chinua Achebe",
    //   },
    //   {
    //     title: "Gone too soon",
    //     author: "Dele falasi",
    //   },
    // ];
    // Looping through the array
    const books = Store.getBooks();
    books.forEach((book) => Interface.addBook(book));
  }

  // adding book to the Interface
  static addBook(book) {
    const list = document.getElementById('books');
    const bookDetails = document.createElement('div');
    bookDetails.innerHTML = `
        <p tabindex="0" class="list-item">${book.title}</p>
        <p tabindex="0" class="list-item">${book.author}</p>
        <button value="${book.title}" tabindex="0" class="delete-button delete">Remove</button>
        `;
    list.appendChild(bookDetails);
  }

  // clearing the input field after submitting
  static clearInputfield() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }

  // Deleting books
  static deleteBook(del, tit) {
    if (del.classList.contains('delete')) {
      del.parentElement.remove();
      Store.removeBook(tit)
      Interface.showAlert('Book has been deleted', 'error');
    }
  }

  // Alert to show suucess or failed message
  static showAlert(message, className) {
    // creating a div for two classes "Success and failed messages"
    const newdiv = document.createElement('div');
    // creating a Dynamic className for the div
    newdiv.className = `alert alert-${className}`;
    // appending an event for differnt messages
    newdiv.appendChild(document.createTextNode(message));
    const containerELement = document.querySelector('.addnewbook');
    const header = document.querySelector('.titletag');
    containerELement.insertBefore(newdiv, header);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

// Local Storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    let books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}
// Diplay book
document.addEventListener('DOMContentLoaded', Interface.displayBooks);
// Add book
document.getElementById('addbook').addEventListener('click', (e) => {
  e.preventDefault();
  // get values from input
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  // Making sure the input field has a value
  if (title === '' || author === '') {
    Interface.showAlert('Fill all the input field', 'error');
  } else {
    Interface.showAlert('Book has been added to the Libray', 'success');
    // creating a const(book) for each of the new books
    const book = new Book(title, author);

    // Adding book to Interface
    Interface.addBook(book);

    // store Book
    Store.addBook(book);

    // clearing the inputfield after submitting
    Interface.clearInputfield();
  }
});

// Remove book
document.querySelector('#books').addEventListener('click', (e) => {
    console.log(e.target.value)
  Interface.deleteBook(e.target,e.target.value);
});
