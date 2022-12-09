let libray = document.querySelector(".library"),
    addBookBtn = document.querySelector(".add-book"),
    form = document.querySelector("form"),
    imageInput = document.getElementById("book-image"),
    addImageBtn = document.getElementById("add-image-btn"),
    closeBtn = document.querySelector(".close-form-btn"),
    submitBtn = document.querySelector('button[type="submit"'),
    favorBtn = document.querySelector(".favorite-icon");

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
        bookDescription = document.createElement("p");

    bookContainer.setAttribute("class", "book");
    bookText.setAttribute("class", "text");
    bookTitle.setAttribute("class", "title");
    bookAuthor.setAttribute("class", "author");
    bookPages.setAttribute("class", "pages");
    bookDescription.setAttribute("class", "description");

    bookContainer.style.backgroundImage = `url(${URL.createObjectURL(
        this.image
    )})`;
    bookTitle.innerText = this.bookName;
    bookAuthor.innerText = this.author;
    bookPages.innerText = this.pages + " pages";
    bookDescription.innerText = this.description;

    bookText.append(bookTitle, bookAuthor, bookPages, bookDescription);
    bookContainer.appendChild(bookText);
    libray.insertBefore(bookContainer, addBookBtn);
};

function closeForm() {
    closeBtn.style.display = "none";
    form.style.display = "none";
    document
        .querySelector(":root")
        .style.setProperty("--black-transparent-background", "initial");
    libray.style.zIndex = "initial";
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
    libray.style.zIndex = "-1";
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

    closeForm();
    newBook.createBookElement();
    form.reset();
}

function toggleFavorite() {
    let noHeart = document.querySelector(".no-heart"),
        redHeart = document.querySelector(".red-heart");

    if (noHeart.style.display !== "none") {
        noHeart.style.display = "none";
        redHeart.style.display = "initial";
    } else {
        redHeart.style.display = "none";
        noHeart.style.display = "initial";
    }
}

addBookBtn.onclick = openForm;
addImageBtn.onclick = () => imageInput.click();
submitBtn.onclick = addBookToLibrary;
closeBtn.onclick = closeForm;
favorBtn.onclick = toggleFavorite;
