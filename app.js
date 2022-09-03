window.addEventListener('load', () => displayBook())

const addBookBtn = document.querySelector('.add-book-btn');
const bookDialog = document.querySelector('#dialog-box');
const submitBookBtn = bookDialog.querySelector('.submit-book-btn');
const bookTitleInput = bookDialog.querySelector('#book-title');
const bookAuthorInput = bookDialog.querySelector('#book-author');
const bookPagesInput = bookDialog.querySelector('#book-pages');
const bookStatusInput = bookDialog.querySelector('#book-status');

addBookBtn.addEventListener('click', () => {
    if (typeof bookDialog.showModal === 'function') {
        bookDialog.showModal();
    }
});

let myLibrary = [
    {
        title: 'The Giving Tree',
        author: 'Shel Silverstein',
        pages: '64',
        status: true,
    },
];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

let book;
let bookInLibrary = true;

submitBookBtn.addEventListener('click', () => addBookToLibrary(bookTitleInput.value,
    bookAuthorInput.value, bookPagesInput.value, bookStatusInput.checked));

function addBookToLibrary(title, author, pages, status) {
    book = new Book(title, author, pages, status);
    myLibrary.push(book);

    for (const property in book) {
        if (book[[property]] === '') {
            myLibrary.pop();
            bookInLibrary = false;
            alert('Please fill all the fields');
            break;
        }
    }

    displayBook();
    return book;
}

function displayBook() {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    tbody.appendChild(tr)

    /* prevent the function from displaying the book IF the book wasn't stored in
    the myLibrary array */
    if (bookInLibrary === true) {
        for (const property in myLibrary[myLibrary.length - 1]) {
            const td = document.createElement('td');

            if (property === 'status') {
                const statusButton = document.createElement('button');
                statusButton.classList.add('book-status-btn');
                td.appendChild(statusButton);

                checkBookStatus(myLibrary[myLibrary.length - 1][[property]]);

                function checkBookStatus(status) {
                    switch (status) {
                        case true:
                            statusButton.textContent = 'Read';
                            break;
                        case false:
                            statusButton.textContent = 'Want to Read';
                    }
                }
            } else {
                td.textContent = myLibrary[myLibrary.length - 1][property];
            }

            tr.appendChild(td);
        }
    }
}