let library = document.querySelector(".library"),
    addBookBtn = document.querySelector(".add-book"),
    editBookBtn = document.querySelector(".edit-book-btn"),
    favorBtn = document.querySelector(".favorite-icon"),
    readBtn = document.querySelector(".is-read-icon"),
    trashBtn = document.querySelector(".trash-icon"),
    editBtn = document.querySelector(".edit-icon"),
    chosenBook,
    books = [];

function addBookToLibrary(e) {
    e.preventDefault();

    let bookName = document.getElementById("book-name").value,
        bookAuthor = document.getElementById("book-author").value,
        bookPages = document.getElementById("pages").value,
        isRead = document.querySelector('[name="read"]:checked').value,
        image = document.getElementById("book-image").files[0],
        isFavorite = document.querySelector('[name="favorite"]:checked').value,
        description = document.getElementById("book-description").value;

    let newBook = new Book(
        bookName,
        bookAuthor,
        bookPages,
        isRead,
        image,
        isFavorite,
        description
    );

    newBook.displayBook();
    closeForm();
    form.reset();
}

function editBookInformation(e) {
    e.preventDefault();

    let bookName = document.getElementById("book-name").value,
        bookAuthor = document.getElementById("book-author").value,
        bookPages = document.getElementById("pages").value,
        isRead = document.querySelector('[name="read"]:checked').value,
        image = document.getElementById("book-image").files[0],
        isFavorite = document.querySelector('[name="favorite"]:checked').value,
        description = document.getElementById("book-description").value;

    let editedBook = new Book(
        bookName,
        bookAuthor,
        bookPages,
        isRead,
        image,
        isFavorite,
        description
    );

    editedBook.isEdited = true;
    editedBook.displayBook();
    closeForm();
    form.reset();
}

function removeBook(e) {
    let currentBook = e.target.parentNode;

    books = books.filter(
        (book) =>
            book.bookName !== currentBook.querySelector(".title").innerText &&
            book.author !== currentBook.querySelector(".author").innerText
    );

    localStorage.setItem("books", JSON.stringify(books));
    currentBook.remove();
}

function toggleFavorite(e) {
    let noHeart = e.target.querySelector(".no-heart"),
        redHeart = e.target.querySelector(".red-heart");

    if (noHeart.style.display !== "none") {
        noHeart.style.display = "none";
        redHeart.style.display = "initial";
    } else {
        redHeart.style.display = "none";
        noHeart.style.display = "initial";
    }

    saveFavorite(e);
}

function saveFavorite(e) {
    let currentBook = e.target.parentNode;

    for (let book of books) {
        if (
            book.bookName === currentBook.querySelector(".title").innerText &&
            book.author === currentBook.querySelector(".author").innerText
        ) {
            switch (book.isFavorite) {
                case "not-favorite":
                    book.isFavorite = "yes-favorite";
                    break;

                case "yes-favorite":
                    book.isFavorite = "not-favorite";
            }
        }
    }

    localStorage.setItem("books", JSON.stringify(books));
}

function toggleRead(e) {
    let noReading = e.target.querySelector(".no-reading"),
        yellowReading = e.target.querySelector(".yellow-reading");

    if (noReading.style.display !== "none") {
        noReading.style.display = "none";
        yellowReading.style.display = "initial";
    } else {
        yellowReading.style.display = "none";
        noReading.style.display = "initial";
    }

    saveRead(e);
}

function saveRead(e) {
    let currentBook = e.target.parentNode;

    for (let book of books) {
        if (
            book.bookName === currentBook.querySelector(".title").innerText &&
            book.author === currentBook.querySelector(".author").innerText
        ) {
            switch (book.isRead) {
                case "not-read":
                    book.isRead = "yes-read";
                    break;

                case "yes-read":
                    book.isRead = "not-read";
            }
        }
    }

    localStorage.setItem("books", JSON.stringify(books));
}

function changeTrashColor(e) {
    let normalTrash = e.target.querySelector(".normal-trash"),
        redTrash = e.target.querySelector(".red-trash");

    if (normalTrash.style.display !== "none") {
        normalTrash.style.display = "none";
        redTrash.style.display = "initial";
    } else {
        redTrash.style.display = "none";
        normalTrash.style.display = "initial";
    }
}

function changePenColor(e) {
    let normalPen = e.target.querySelector(".normal-pen"),
        greenPen = e.target.querySelector(".green-pen");

    if (normalPen.style.display !== "none") {
        normalPen.style.display = "none";
        greenPen.style.display = "initial";
    } else {
        greenPen.style.display = "none";
        normalPen.style.display = "initial";
    }
}

function retrieveLibrary() {
    if (localStorage.books) {
        books = JSON.parse(localStorage.books);
    }

    for (let book of books) {
        Object.setPrototypeOf(book, Book.prototype);
        book.createBookElement();
    }
}

addBookBtn.onclick = openForm;
favorBtn.onclick = toggleFavorite;
readBtn.onclick = toggleRead;
trashBtn.onmouseover = changeTrashColor;
trashBtn.onmouseleave = changeTrashColor;
editBtn.onmouseover = changePenColor;
editBtn.onmouseleave = changePenColor;
editBtn.onclick = openForm;
editBookBtn.onclick = editBookInformation;
window.onload = retrieveLibrary;
