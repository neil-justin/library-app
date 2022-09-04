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

let book;
let bookInLibrary = true;

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

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
}

displayBook();

function displayBook() {
    const tbody = document.querySelector('tbody');
    const tr = document.createElement('tr');
    /* Associating the DOM element with the actual book objects so that I could
    manipulate */
    tr.setAttribute('data-array-element', `${myLibrary.length - 1}`);
    tbody.appendChild(tr)

    let bookStatusBtn;

    /* prevent the function from displaying the book IF the book wasn't stored in
    the myLibrary array */
    if (bookInLibrary) {
        for (const property in myLibrary[myLibrary.length - 1]) {
            const td = document.createElement('td');

            if (property === 'status') {
                bookStatusBtn = document.createElement('button');
                bookStatusBtn.classList.add('book-status-btn');
                bookStatusBtn.setAttribute('data-status-property', `${myLibrary.length - 1}`)
                td.appendChild(bookStatusBtn);

                displayBookStatus(myLibrary[myLibrary.length - 1][[property]]);

                function displayBookStatus(status) {
                    switch (status) {
                        case true:
                            return bookStatusBtn.textContent = 'Read';
                        case false:
                            return bookStatusBtn.textContent = 'Want to Read';
                    }
                }
            } else {
                td.textContent = myLibrary[myLibrary.length - 1][property];
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

        const bookArrayIndex = parseInt(bookStatusBtn.getAttribute('data-status-property'));
        myLibrary[bookArrayIndex].status = myLibrary[bookArrayIndex].status ? false : true;
    });
};
