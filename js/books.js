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
    // Looping through the array
    const books = Store.getBooks();
    console.log('books: ', books);
    books.forEach((book) => Interface.addBook(book));
  }

  // adding book to the Interface
  static addBook(book) {
    const list = document.getElementById('books');
    const bookDetails = document.createElement('div');
    bookDetails.innerHTML = `<article>
        <div>"${book.title}" by ${book.author}</div>
        <button value="${book.title}" class="btn-danger delete">Remove</button>
        </article>
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
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
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
    console.log('removeBook: ',books);
    books.forEach((book, index) => {
      if (book.title === title) {
        console.log('index: ',index);
        //books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

document.onreadystatechange = () => {
  // Diplay book
  document.addEventListener('DOMContentLoaded', Interface.displayBooks);

  if (document.readyState === 'complete') {
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
      Interface.deleteBook(e.target, e.target.value);
    });

    const menu = document.querySelectorAll('.nav-menu');
    const listBtn = document.getElementById('books');
    const addBtn = document.getElementById('book-frm');
    const contactBtn = document.getElementById('contacts');
    const heading = document.getElementById('heading');
    menu.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        addBtn.classList.add('hidden');
        listBtn.classList.add('hidden');
        contactBtn.classList.add('hidden');
        switch (e.target.id) {
          case 'list':
            heading.textContent = "All awesome books";
            listBtn.classList.remove('hidden');
            break;
          case 'add':
            heading.textContent = "Add a new book";
            addBtn.classList.remove('hidden');
            break;
          case 'contact':
            heading.textContent = "Contact information";
            contactBtn.classList.remove('hidden');
            break;
          default:
            listBtn.classList.remove('hidden');
        }
      });
    });

    const currentTime = document.getElementById('time');
    const updateTime = () => {
      const now = new Date();
      currentTime.innerHTML = now.toDateString() +", "+ now.toLocaleTimeString('en-US');
    };
    updateTime();
    setInterval(updateTime, 1000);
  }
};
