const addBookBtn = document.querySelector('#add-book-btn');
const bookDialog = document.querySelector('#dialog-box');
const submitBookBtn = bookDialog.querySelector('#submit-book-btn');

addBookBtn.addEventListener('click', () => {
    if (typeof bookDialog.showModal === 'function') {
        bookDialog.showModal();
    }
});

let myLibrary = [];
let book = new Book('The Giving Tree', 'Shel Silverstein', '64', true);
myLibrary.push(book);

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

submitBookBtn.addEventListener('click', () => displayBook(false));

const form = bookDialog.querySelector('form');
const bookTitleInput = bookDialog.querySelector('#book-title');
const bookAuthorInput = bookDialog.querySelector('#book-author');
const bookPagesInput = bookDialog.querySelector('#book-pages');
const bookStatusInput = bookDialog.querySelector('#book-status');

function displayBook(isBookInLibrary) {
    const errorMessageReference = document.querySelector('#error-message');

    if (errorMessageReference !== null) {
        /* revert the button to its initial state so that the form will be
            close automatically when the inputted book details is not
            a duplicate */
        submitBookBtn.setAttribute('type', 'submit');
        errorMessageReference.remove();
    }

    for (let i = 0; i < myLibrary.length; i++) {
        if (bookTitleInput.value === myLibrary[i].title &&
            bookAuthorInput.value === myLibrary[i].author) {
            /* to prevent form from automatically closing when the submit
                button was clicked */
            submitBookBtn.setAttribute('type', 'button');

            const errorMessage = document.createElement('p');
            errorMessage.setAttribute('id', 'error-message');
            errorMessage.textContent = 'This book already exists in your library';
            form.appendChild(errorMessage);

            obj = {};
            return isBookInLibrary = true;
        }
    }

    if (isBookInLibrary === false) {
        // Immediately invoke function
        (function (title, author, pages, status) {
            book = new Book(title, author, pages, status);
            myLibrary.push(book);

            for (const property in book) {
                if (book[property] === '') {
                    myLibrary.pop();
                    return book = {};
                }
            }

            return book;
        })(bookTitleInput.value, bookAuthorInput.value,
            bookPagesInput.value, bookStatusInput.checked);
    }

    if (!(Object.keys(book).length === 0)) {
        let removeBookBtn;
        let bookStatusBtn;

        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        /* Associating the DOM element with the actual book objects so that I could
        manipulate */
        tr.setAttribute('data-array-element', `${myLibrary.length - 1}`);
        tbody.appendChild(tr)

        for (const property in book) {
            const td = document.createElement('td');

            switch (property) {
                case 'title':
                case 'author':
                case 'pages':
                    td.textContent = book[property];
                    break;
                case 'status':
                    td.classList.add('td-status');
                    bookStatusBtn = document.createElement('button');
                    bookStatusBtn.classList.add('book-status-btn');
                    td.appendChild(bookStatusBtn);

                    (function (status) {
                        switch (status) {
                            case true:
                                bookStatusBtn.classList.add('read-status');
                                bookStatusBtn.classList.remove('want-to-read-status');
                                return bookStatusBtn.textContent = 'Read';
                            case false:
                                bookStatusBtn.classList.add('want-to-read-status');
                                bookStatusBtn.classList.remove('read-status');
                                return bookStatusBtn.textContent = 'Want to Read';
                        }
                    })(book.status);

                    removeBookBtn = document.createElement('button');
                    removeBookBtn.classList.add('remove-book-btn');
                    removeBookBtn.textContent = 'Remove'
                    td.appendChild(removeBookBtn);
            }

            tr.appendChild(td);
        }

        const bookArrayIndex = parseInt(tr.getAttribute('data-array-element'));

        bookStatusBtn.addEventListener('click', () => {
            switch (bookStatusBtn.textContent) {
                case 'Read':
                    bookStatusBtn.classList.add('want-to-read-status');
                    bookStatusBtn.classList.remove('read-status');
                    bookStatusBtn.textContent = 'Want to Read';
                    break;
                case 'Want to Read':
                    bookStatusBtn.classList.add('read-status');
                    bookStatusBtn.classList.remove('want-to-read-status');
                    bookStatusBtn.textContent = 'Read';
            }

            myLibrary[bookArrayIndex].status = !myLibrary[bookArrayIndex].status;
        });

        removeBookBtn.addEventListener('click', () => {
            myLibrary.splice(bookArrayIndex, 1);

            const book = document.querySelector(`[data-array-element='${bookArrayIndex}']`);
            book.remove();
        });
    }
};

displayBook(true);