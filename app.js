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

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

submitBookBtn.addEventListener('click', () => addBookToLibrary());

function addBookToLibrary() {
    const book = new Book(bookTitleInput.value, bookAuthorInput.value,
        bookPagesInput.value, bookStatusInput.checked);

    myLibrary.push(book);

    for (const property in book) {
        if (book[[property]] === '') {
            myLibrary.pop();
            alert('Please fill all the fields');
            break;
        }
    }

}