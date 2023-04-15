class CustomValidator {
    static get errorMessages() {
        return {
            emptyInputError: "Please fill the input",
            authorNameError: "The name must only contains letters (A-Z)",
            bookImageError: "Upload an image",
            bookPagesError: "Enter the number of the book's pages",
        };
    }

    static get formInputs() {
        return document.querySelectorAll("input:not([type='radio']), textarea");
    }

    static checkIfInputIsEmpty(e) {
        let errorElement = document.querySelector(
            `#${e.target.id} + .error-message`
        );

        if (e.target.value.length === 0) {
            errorElement.textContent =
                CustomValidator.errorMessages.emptyInputError;

            e.target.classList.add("invalid");
        } else {
            errorElement.textContent = "";
            e.target.classList.remove("invalid");
        }
    }
}

CustomValidator.formInputs.forEach((input) => {
    ["focusout", "focusin", "input"].forEach((event) => {
        input.addEventListener(event, CustomValidator.checkIfInputIsEmpty);
    });
});
