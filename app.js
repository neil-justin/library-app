const addBookBtn = document.querySelector('#add-book-btn');
const bookDialog = document.querySelector('#dialog-box');
const bookTitleInput = bookDialog.querySelector('#book-title');
const bookAuthorInput = bookDialog.querySelector('#book-author');
const bookPagesInput = bookDialog.querySelector('#book-pages');
const bookStatusInput = bookDialog.querySelector('#book-status');
const submitBookBtn = bookDialog.querySelector('#submit-book-btn');

addBookBtn.addEventListener('click', () => {
    if (typeof bookDialog.showModal === 'function') {
        bookDialog.showModal();
    }
});

let myLibrary = [];
let book = new Book('The Giving Tree', 'Shel Silverstein', '64', true);
myLibrary.push(book);
let isBookInLibrary;

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

submitBookBtn.addEventListener('click', () => displayBook(false));

function addBookToLibrary(title, author, pages, status) {
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
}

displayBook(true);

function displayBook(isBookInLibrary) {
    if (!isBookInLibrary) {
        addBookToLibrary(bookTitleInput.value, bookAuthorInput.value,
            bookPagesInput.value, bookStatusInput.checked);
    }

    let bookStatusBtn;

    if (Object.keys(book).length === 0) {
        displayBook(false);
    } else {
        const tbody = document.querySelector('tbody');
        const tr = document.createElement('tr');
        /* Associating the DOM element with the actual book objects so that I could
        manipulate */
        tr.setAttribute('data-array-element', `${myLibrary.length - 1}`);
        tbody.appendChild(tr)

        for (const property in book) {
            const td = document.createElement('td');

            if (property === 'status') {
                bookStatusBtn = document.createElement('button');
                bookStatusBtn.classList.add('book-status-btn');
                td.appendChild(bookStatusBtn);

                displayBookStatus(book.status);

                function displayBookStatus(status) {
                    switch (status) {
                        case true:
                            return bookStatusBtn.textContent = 'Read';
                        case false:
                            return bookStatusBtn.textContent = 'Want to Read';
                    }
                }
            } else {
                td.textContent = book[property];
            }

            tr.appendChild(td);
        }
    }

    bookStatusBtn.addEventListener('click', () => {
        switch (bookStatusBtn.textContent) {
            case 'Read':
                bookStatusBtn.textContent = 'Want to Read';
                break;
            case 'Want to Read':
                bookStatusBtn.textContent = 'Read';
        }

        const bookArrayIndex = parseInt(tr.getAttribute('data-array-element'));
        myLibrary[bookArrayIndex].status = myLibrary[bookArrayIndex].status ? false : true;
    });
};