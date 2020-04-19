// Book Class : Represents a Book

class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class : Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        const bookList = document.querySelector('#book-list');

        books.forEach((book) => {
            const title = book.title;
            const author = book.author;
            const isbn = book.isbn;

            const row = document.createElement('tr');

            row.innerHTML = `<td>${title}</td> <td>${author}</td> <td>${isbn}</td> <td><button class="btn btn-danger btn-sm delete px-1 py-0"><i class="fas fa-times"></i></button> </td>`;

            bookList.appendChild(row);
        
        });
    }

    static addBook(book){
        const bookList = document.querySelector('#book-list');

        const title = book.title;
        const author = book.author;
        const isbn = book.isbn;

        const row = document.createElement('tr');

        row.innerHTML = `<td>${title}</td> <td>${author}</td> <td>${isbn}</td> <td><button class="btn btn-danger btn-sm delete px-1 py-0"><i class="fas fa-times"></i></button> </td>`;

        bookList.appendChild(row);
    }

    static removeBook(el){
        el.parentNode.parentNode.remove();
    }

    static showAlert(message, className){
        const container = document.getElementById('container');
        const form = document.getElementById('book-form');

        const alert = document.createElement('div');
        alert.className = `alert alert-${className}`;
        alert.appendChild(document.createTextNode(message));

        container.insertBefore(alert,form);

        setTimeout( () => document.querySelector('.alert').remove(), 3000)

    }

    static clearFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';

    }

}
// Store Class : Handle Browser Storage
class Store {
    static getBooks(){
        let books;

        if (localStorage.getItem('books') == null){
            books = [];
        }
        else{
            books = JSON.parse(localStorage.getItem('books'));
            console.log(books)
        }

        return books;
    }

    static addBook(book){
        let bookList = Store.getBooks();

        bookList.push(book);

        localStorage.setItem('books',JSON.stringify(bookList))
        

    }

    static removeBook(isbn){
        let bookList = Store.getBooks();
        
        bookList.forEach( (book,index) => {
            if(book.isbn == isbn)
                bookList.splice(index,1);
        });

        localStorage.setItem('books',JSON.stringify(bookList));
    }
}


// Event: Display Books
document.addEventListener('DOMContentLoaded', (e) => {
    
    // Display books
    UI.displayBooks();

});


// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit',(e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill all the fields.','danger');
    }
    else{
        // Create book object
        const book = new Book(title,author,isbn);

        // Add book to store
        Store.addBook(book);

        // Display books in UI
        UI.addBook(book);

        // Show success message
        UI.showAlert("Book added!","success")

        // Clear Fields
        UI.clearFields();
    }

});

// Event: Remove a Book

document.querySelector('tbody').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete') || e.target.classList.contains('fa-times')){
        let button; 

        // Grab button when button is clicked
        if(e.target.classList.contains('delete')){
            button = e.target;
        }
        // Grab button when icon is clicked
        else if(e.target.classList.contains('fa-times')){
            button = e.target.parentNode;
        }
        if(confirm('Are you sure?')){
            // Remove from Store
            Store.removeBook(button.parentNode.parentNode.children[2].textContent);

            // Remove from UI
            UI.removeBook(button);

            // Show success message
            UI.showAlert('Book removed!','danger');
        }
        
    }
})

