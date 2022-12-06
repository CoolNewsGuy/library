let libray = document.querySelector(".library"),
    addBookBtn = document.querySelector(".add-book"),
    form = document.querySelector("form"),
    imageInput = document.getElementById("book-image"),
    addImageBtn = document.getElementById("add-image-btn"),
    closeBtn = document.querySelector(".close-form-btn");

function Book(name, author, pages, isRead, image, isFavorite, description) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.image = image;
    this.isFavorite = isFavorite;
    this.description = description;
}

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

addBookBtn.onclick = openForm;
addImageBtn.onclick = () => imageInput.click();
closeBtn.onclick = closeForm;
