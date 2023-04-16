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

    static checkIfInputIsEmpty(e, allFields = CustomValidator.formInputs) {
        if (e) {
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
        } else
            allFields.forEach((field) => {
                if (field.value === "") {
                    let fieldErrorElement = document.querySelector(
                        `#${field.id} + .error-message`
                    );

                    field.classList.add("invalid");
                    fieldErrorElement.textContent = field.validationMessage;
                }
            });
    }

    static checkIfImageUploaded() {
        let bookImage = document.querySelector("#book-image");
        let bookImageErrorElement = document.querySelector(".book-image-error");

        if (bookImage.value === "") {
            bookImage.setCustomValidity("Please select an image");

            bookImageErrorElement.textContent = bookImage.validationMessage;
        } else {
            bookImage.setCustomValidity("");

            bookImageErrorElement.textContent = "";
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

CustomValidator.form.addEventListener("submit", (e) => {
    CustomValidator.checkIfImageUploaded();
    CustomValidator.checkIfInputIsEmpty();
    CustomValidator.preventInvalidFormSubmission(e);
});
