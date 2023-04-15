class CustomValidator {
    constructor() {
        this.errorMessages = {
            emptyInputError: "Please fill the input",
            authorNameError: "The name must only contains letters (A-Z)",
            bookImageError: "Upload an image",
            bookPagesError: "Enter the number of the book's pages",
        };
    }

    static get formInputs() {
        return document.querySelectorAll("input:not([type='radio']), textarea");
    }
}
