let library = document.querySelector(".library"),
    addBookBtn = document.querySelector(".add-book"),
    form = document.querySelector("form"),
    imageInput = document.getElementById("book-image"),
    addImageBtn = document.getElementById("add-image-btn"),
    closeBtn = document.querySelector(".close-form-btn"),
    submitBtn = document.querySelector('button[type="submit"'),
    favorBtn = document.querySelector(".favorite-icon"),
    readBtn = document.querySelector(".is-read-icon"),
    trashBtn = document.querySelector(".trash-icon"),
    books = [];

function Book(bookName, author, pages, isRead, image, isFavorite, description) {
    this.bookName = bookName;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.image = image;
    this.isFavorite = isFavorite;
    this.description = description;
}

Book.prototype.createBookElement = function () {
    let bookContainer = document.createElement("div"),
        bookText = document.createElement("div"),
        bookTitle = document.createElement("h3"),
        bookAuthor = document.createElement("span"),
        bookPages = document.createElement("h3"),
        bookDescription = document.createElement("p"),
        favoriteIcon = favorBtn.cloneNode(true),
        isReadIcon = readBtn.cloneNode(true);

    if (this.isFavorite === "yes-favorite") {
        favoriteIcon.querySelector(".no-heart").style.display = "none";
        favoriteIcon.querySelector(".red-heart").style.display = "initial";
    } else {
        favoriteIcon.querySelector(".red-heart").style.display = "none";
        favoriteIcon.querySelector(".no-heart").style.display = "initial";
    }

    if (this.isRead === "yes-read") {
        isReadIcon.querySelector(".no-reading").style.display = "none";
        isReadIcon.querySelector(".yellow-reading").style.display = "initial";
    } else {
        isReadIcon.querySelector(".yellow-reading").style.display = "none";
        isReadIcon.querySelector(".no-reading").style.display = "initial";
    }

    bookContainer.setAttribute("class", "book");
    bookText.setAttribute("class", "text");
    bookTitle.setAttribute("class", "title");
    bookAuthor.setAttribute("class", "author");
    bookPages.setAttribute("class", "pages");
    bookDescription.setAttribute("class", "description");
    favoriteIcon.onclick = toggleFavorite;
    isReadIcon.onclick = toggleRead;

    bookContainer.style.backgroundImage = `url(${this.image})`;
    bookTitle.innerText = this.bookName;
    bookAuthor.innerText = this.author;
    bookPages.innerText = this.pages + " pages";
    bookDescription.innerText = this.description;

    bookText.append(bookTitle, bookAuthor, bookPages, bookDescription);
    bookContainer.append(isReadIcon, favoriteIcon, bookText);
    library.insertBefore(bookContainer, addBookBtn);
};

Book.prototype.saveImage = function () {
    let reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
            localStorage.setItem("image", reader.result);
        },
        false
    );

    reader.readAsDataURL(this.image);
};

Book.prototype.addToBooks = function () {
    this.saveImage();
    this.image = localStorage.image;
    books.push(this);
    localStorage.setItem("books", JSON.stringify(books));
};

function closeForm() {
    closeBtn.style.display = "none";
    form.style.display = "none";
    document
        .querySelector(":root")
        .style.setProperty("--black-transparent-background", "initial");
    library.style.zIndex = "initial";
}

function openForm() {
    closeBtn.style.display = "initial";
    form.style.display = "initial";
    document
        .querySelector(":root")
        .style.setProperty(
            "--black-transparent-background",
            "linear-gradient(#0002, #0002)"
        );
    library.style.zIndex = "-1";
}

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

    newBook.addToBooks();
    newBook.createBookElement();
    closeForm();
    form.reset();
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
addImageBtn.onclick = () => imageInput.click();
submitBtn.onclick = addBookToLibrary;
closeBtn.onclick = closeForm;
favorBtn.onclick = toggleFavorite;
readBtn.onclick = toggleRead;
trashBtn.onmouseover = changeTrashColor;
trashBtn.onmouseleave = changeTrashColor;
window.onload = retrieveLibrary;
