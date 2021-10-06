class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // method adding books
  addBookToList(book) {
    const list = document.getElementById('book-list'),
        row = document.createElement('tr');
    // Inserting columns
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="delete">x</a></td>
    `;

    list.appendChild(row);
  }
  // method show alert
  showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container'),
          form = document.querySelector('#book-form');
  
    container.insertBefore(div, form);

    setTimeout(function() {
      document.querySelector('.alert').remove();
    }, 2000)
  }
  // Delete books
  deleteBook(target) {
    if(target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
  // Clear fields
  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

class Store {

  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function(book) {
      const ui = new UI;

      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function(book, index) {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks);
// EL for add book
document.getElementById('book-form').addEventListener('submit', function(e) {

  const title = document.getElementById('title').value, 
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  console.log(ui);
  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Show error
    ui.showAlert('Please fill in all fields', 'error');

  } else {

    ui.addBookToList(book);

    Store.addBook(book);
    // Show success
    ui.showAlert('Book Added!', 'success');
    ui.clearFields();

  }
  
  e.preventDefault();

});
// EL for delete
document.getElementById('book-list').addEventListener('click', function(e) {

  const ui = new UI();

  ui.deleteBook(e.target);
 

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show success book removed
  ui.showAlert('Book Removed!', 'success');

  e.preventDefault();
});