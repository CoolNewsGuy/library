let form = document.querySelector("form"),
    submitBtn = document.querySelector(".add-book-btn"),
    closeBtn = document.querySelector(".close-form-btn"),
    imageInput = document.getElementById("book-image"),
    addImageBtn = document.getElementById("add-image-btn"),
    isFormValid = false;

function closeForm() {
    closeBtn.style.display = "none";
    form.style.display = "none";
    document
        .querySelector(":root")
        .style.setProperty("--black-transparent-background", "initial");
    library.style.zIndex = "initial";
}

function openForm(e) {
    closeBtn.style.display = "initial";
    form.style.display = "initial";
    document
        .querySelector(":root")
        .style.setProperty(
            "--black-transparent-background",
            "linear-gradient(#0002, #0002)"
        );
    library.style.zIndex = "-1";

    let originalFormTitle = form.querySelector(".original-form-title"),
        alternativeFormTitle = form.querySelector(".alternative-form-title");

    if (e.target.parentNode.classList.contains("book")) {
        originalFormTitle.style.display = "none";
        alternativeFormTitle.style.display = "block";
        submitBtn.style.display = "none";
        editBookBtn.style.display = "block";
    } else {
        originalFormTitle.style.display = "block";
        alternativeFormTitle.style.display = "none";
        submitBtn.style.display = "block";
        editBookBtn.style.display = "none";
    }

    chosenBook = e.target.parentNode;
}

function checkIfFormIsValid() {
    let formInputs = document.querySelectorAll("form input");

    formInputs.forEach((input) => {
        isFormValid = input.checkValidity();
    });

    return isFormValid;
}

form.onsubmit = (e) => {
    // if form is not valid then stop
    if (!checkIfFormIsValid()) {
        return;
    }

    let formAddAndEditBtns = form.querySelectorAll("button[type='submit']");

    // check whether user is adding or editing the book
    if (formAddAndEditBtns[0].style.display === "block") {
        addBookToLibrary(e);
    } else {
        editBookInformation(e);
    }

    isFormValid = false;
};
