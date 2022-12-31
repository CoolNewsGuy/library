class Book {
    constructor(
        bookName,
        author,
        pages,
        isRead,
        image,
        isFavorite,
        description
    ) {
        this.bookName = bookName;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.image = image;
        this.isFavorite = isFavorite;
        this.description = description;
        this.isEdited = false;
    }

    createBookElement() {
        let bookContainer = document.createElement("div"),
            bookText = document.createElement("div"),
            bookTitle = document.createElement("h3"),
            bookAuthor = document.createElement("span"),
            bookPages = document.createElement("h3"),
            bookDescription = document.createElement("p"),
            favoriteIcon = favorBtn.cloneNode(true),
            isReadIcon = readBtn.cloneNode(true),
            trashIcon = trashBtn.cloneNode(true),
            editIcon = editBtn.cloneNode(true);

        if (this.isFavorite === "yes-favorite") {
            favoriteIcon.querySelector(".no-heart").style.display = "none";
            favoriteIcon.querySelector(".red-heart").style.display = "initial";
        } else {
            favoriteIcon.querySelector(".red-heart").style.display = "none";
            favoriteIcon.querySelector(".no-heart").style.display = "initial";
        }

        if (this.isRead === "yes-read") {
            isReadIcon.querySelector(".no-reading").style.display = "none";
            isReadIcon.querySelector(".yellow-reading").style.display =
                "initial";
        } else {
            isReadIcon.querySelector(".yellow-reading").style.display = "none";
            isReadIcon.querySelector(".no-reading").style.display = "initial";
        }

        trashIcon.onmouseover = changeTrashColor;
        trashIcon.onmouseleave = changeTrashColor;
        editIcon.onmouseover = changePenColor;
        editIcon.onmouseleave = changePenColor;
        editIcon.onclick = openForm;
        favoriteIcon.onclick = toggleFavorite;
        isReadIcon.onclick = toggleRead;
        trashIcon.onclick = removeBook;

        bookContainer.setAttribute("class", "book");
        bookText.setAttribute("class", "text");
        bookTitle.setAttribute("class", "title");
        bookAuthor.setAttribute("class", "author");
        bookPages.setAttribute("class", "pages");
        bookDescription.setAttribute("class", "description");

        bookContainer.style.backgroundImage = `url(${this.image})`;
        bookTitle.innerText = this.bookName;
        bookAuthor.innerText = this.author;
        bookPages.innerText = this.pages + " pages";
        bookDescription.innerText = this.description;

        bookText.append(bookTitle, bookAuthor, bookPages, bookDescription);
        bookContainer.append(
            editIcon,
            trashIcon,
            isReadIcon,
            favoriteIcon,
            bookText
        );

        if (this.isEdited) {
            library.insertBefore(bookContainer, chosenBook);
            chosenBook.remove();
            this.isEdited = false;

            for (let book of books) {
                if (
                    book.bookName ===
                        chosenBook.querySelector(".title").innerText &&
                    book.author ===
                        chosenBook.querySelector(".author").innerText
                ) {
                    books[books.indexOf(book)] = this;
                }
            }

            localStorage.setItem("books", JSON.stringify(books));
        } else library.insertBefore(bookContainer, addBookBtn);
    }

    displayBook() {
        let reader = new FileReader();

        reader.addEventListener(
            "load",
            () => {
                localStorage.setItem("image", reader.result);
                this.image = localStorage.image;
                if (!this.isEdited) this.addToBooks();
                this.createBookElement();
            },
            false
        );

        reader.readAsDataURL(this.image);
    }

    addToBooks() {
        books.push(this);
        localStorage.setItem("books", JSON.stringify(books));
    }
}
