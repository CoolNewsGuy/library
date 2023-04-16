const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === "style") {
            const display = mutation.target.style.display;

            if (display === "initial") {
                CustomValidator.hideFormErrorsAfterSuccessfulSubmission();
            }
        }
    });
});

observer.observe(CustomValidator.form, { attributes: true });
