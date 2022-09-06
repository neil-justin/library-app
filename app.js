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

const bookTitleInput = bookDialog.querySelector('#book-title');
const bookAuthorInput = bookDialog.querySelector('#book-author');
const bookPagesInput = bookDialog.querySelector('#book-pages');
const bookStatusInput = bookDialog.querySelector('#book-status');

function displayBook(isBookInLibrary) {
    if (!isBookInLibrary) {
        // Immediately invoke function
        (function (title, author, pages, status) {
            book = new Book(title, author, pages, status);
            myLibrary.push(book);

            for (const property in book) {
                if (book[property] === '') {
                    book = {};
                    myLibrary.pop();
                    return;
                }
            }

            return book;
        })(bookTitleInput.value, bookAuthorInput.value,
            bookPagesInput.value, bookStatusInput.checked);
    }

    let removeBookBtn;
    let bookStatusBtn;
    let tr;

    if (Object.keys(book).length === 0) {
        displayBook(false);
    } else {
        const tbody = document.querySelector('tbody');
        tr = document.createElement('tr');
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
                                return bookStatusBtn.textContent = 'Read';
                            case false:
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
    }

    const bookArrayIndex = parseInt(tr.getAttribute('data-array-element'));

    bookStatusBtn.addEventListener('click', () => {
        switch (bookStatusBtn.textContent) {
            case 'Read':
                bookStatusBtn.textContent = 'Want to Read';
                break;
            case 'Want to Read':
                bookStatusBtn.textContent = 'Read';
        }

        myLibrary[bookArrayIndex].status = !myLibrary[bookArrayIndex].status;
    });

    removeBookBtn.addEventListener('click', () => {
        myLibrary.splice(bookArrayIndex, 1);

        const book = document.querySelector(`[data-array-element='${bookArrayIndex}']`);
        book.remove();
    });
};

displayBook(true);