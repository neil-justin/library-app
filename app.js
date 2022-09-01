const addBookBtn = document.querySelector('.add-book-btn');
const bookDialog = document.querySelector('#dialog-box');
const submitBookBtn = bookDialog.querySelector('.submit-book-btn');
const bookTitleInput = bookDialog.querySelector('#book-title');
const bookAuthorInput = bookDialog.querySelector('#book-author');
const bookPagesInput = bookDialog.querySelector('#book-pages');

addBookBtn.addEventListener('click', () => {
    if (typeof bookDialog.showModal === 'function') {
        bookDialog.showModal();
    }
});