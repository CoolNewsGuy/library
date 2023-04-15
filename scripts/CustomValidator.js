class CustomValidator {
    static get errorMessages() {
        return {
            emptyInputError: "Please fill the input",
            authorNameError: "The name must only contains letters (A-Z)",
            bookImageError: "Upload an image",
            bookPagesError: "Enter the number of the book's pages",
        };
    }

    static get form() {
        return document.querySelector("form");
    }

    static get formInputs() {
        return document.querySelectorAll("input:not([type='radio']), textarea");
    }

    static checkIfInputIsEmpty(e) {
        let errorElement = document.querySelector(
            `#${e.target.id} + .error-message`
        );
        let input = e.target;

        if (input.validity.valueMissing) {
            errorElement.textContent = input.validationMessage;

            input.classList.add("invalid");
        } else {
            errorElement.textContent = "";

            input.classList.remove("invalid");
        }
    }

    static preventInvalidFormSubmission(e) {
        if (!CustomValidator.form.checkValidity()) {
            e.preventDefault();
        }
    }
}

CustomValidator.formInputs.forEach((input) => {
    ["focusout", "focusin", "input"].forEach((event) => {
        input.addEventListener(event, CustomValidator.checkIfInputIsEmpty);
    });
});

CustomValidator.form.addEventListener(
    "submit",
    CustomValidator.preventInvalidFormSubmission
);
