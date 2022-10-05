const addBookButton = document.querySelector('#add-book-button');
addBookButton.addEventListener('click', () => {
    const bookFormDialogBox = document.querySelector('#book-form-dialog-box');
    bookFormDialogBox.showModal();
});

const bookTitleInput = document.querySelector('#book-title');
const bookAuthorInput = document.querySelector('#book-author');
const bookPagesInput = document.querySelector('#book-pages');
const bookStatusInput = document.querySelector('#book-status');

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }

    addBookInLibrary() {
        newBook = new Book(bookTitleInput.value, bookAuthorInput.value,
            bookPagesInput.value, bookStatusInput.checked);
        myLibrary.push(newBook);
        return isBookInLibrary = true;
    }
}

let newBook = new Book('The Giving Tree', 'Shel Silverstein', '64',
    /* checked = */ true);
let myLibrary = [];
myLibrary.push(newBook);
let isBookInLibrary = true;

const displayController = {
    form: document.querySelector('form'),

    removeErrorMessage: function (errorMessage) {
        if (errorMessage) {
            errorMessage.remove();

            /* revert the button to its initial state so that the form will be
            close automatically */
            submitBookButton.setAttribute('type', 'submit');
        }
    },

    checkDuplicate: function () {
        for (let i = 0; i < myLibrary.length; i++) {
            if (bookTitleInput.value === myLibrary[i].title &&
                bookAuthorInput.value === myLibrary[i].author) {
                /* For some reason, this prevents the form from closing
                automatically when the submit button was clicked and when the
                inputted book already exist in the library */
                submitBookButton.setAttribute('type', 'button');

                const errorMessage = document.createElement('p');
                errorMessage.setAttribute('id', 'error-message');
                errorMessage.textContent = 'This book already exists in your library';
                this.form.appendChild(errorMessage);

                newBook = null;
                isBookInLibrary = false;

                return newBook, isBookInLibrary;
            }
        }
    },

    displayBook: function () {
        if (isBookInLibrary) {
            const tbody = document.querySelector('tbody');
            const tr = document.createElement('tr');
            // this will be use to tie the table's elements into the myLibrary array
            tr.setAttribute('data-index', myLibrary.length - 1);
            tbody.appendChild(tr)

            for (const property in newBook) {
                const td = document.createElement('td');

                switch (property) {
                    case 'title':
                    case 'author':
                    case 'pages':
                        td.textContent = newBook[property];
                        break;
                    case 'status':
                        td.classList.add('td-status');
                        const bookStatusButton = document.createElement('button');
                        bookStatusButton.addEventListener('click', (event) => {
                            displayController.toggleBookStatusButton(event);
                        });
                        bookStatusButton.classList.add('book-status-button');
                        td.appendChild(bookStatusButton);

                        switch (newBook.status) {
                            case true:
                                bookStatusButton.classList.add('read-status');
                                bookStatusButton.textContent = 'Read';
                                break;
                            case false:
                                bookStatusButton.classList.add('want-to-read-status');
                                bookStatusButton.textContent = 'Want to Read';
                        }

                        const removeBookButton = document.createElement('button');
                        removeBookButton.addEventListener('click', (event) => {
                            displayController.removeBook(event);
                        });
                        removeBookButton.classList.add('remove-book-button');
                        removeBookButton.textContent = 'Remove'
                        td.appendChild(removeBookButton);
                }

                tr.appendChild(td);
            }
        }
    },

    toggleBookStatusButton: function (event) {
        switch (event.target.textContent) {
            case 'Read':
                event.target.classList.remove('read-status');
                event.target.classList.add('want-to-read-status');
                event.target.textContent = 'Want to Read';
                break;
            case 'Want to Read':
                event.target.classList.remove('want-to-read-status');
                event.target.classList.add('read-status');
                event.target.textContent = 'Read';
        }

        /* Since the data-index attribute is not a direct attribute of the book
        status button, I have to traverse the DOM upward (in this case, using
        closest() method) to retrieve the value of the said attribute */
        const bookIndex = parseInt(event.target.closest('[data-index]')
            .dataset.index);

        myLibrary[bookIndex].status = !myLibrary[bookIndex].status;
    },

    removeBook: function (event) {
        const bookIndex = parseInt(event.target.closest('[data-index]')
            .dataset.index);

        myLibrary.splice(bookIndex, 1);

        const bookInfo = document.querySelector(`[data-index='${bookIndex}']`);
        bookInfo.remove();
    },
}

/* Placing this method invocation right below the submitBookButton below
will result in TypeError. Keep this above the submitBookButton */
displayController.displayBook();

const submitBookButton = document.querySelector('#submit-book-button');
submitBookButton.addEventListener('click', () => {
    displayController.removeErrorMessage(document
        .querySelector('#error-message'));
    displayController.checkDuplicate();

    /* You might be wondering why I place the if statement here instead of
    putting it inside the addBookInLibrary method. That's because there are
    instance where the value of the newBook is null (i.e. when the inputted
    book is a duplicate). If that instance occurs and there's no if statement
    below, the newBook object will IMMEDIATELY try to access the
    addBookInLibrary method (which doesn't exist if the value of the newBook
    is null), which in turns will logs a TypeError error message. */
    if (newBook) {
        newBook.addBookInLibrary();
    }

    displayController.displayBook();
});