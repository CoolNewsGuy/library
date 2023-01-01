addBookBtn.onclick = openForm;
favorBtn.onclick = toggleFavorite;
readBtn.onclick = toggleRead;
trashBtn.onmouseover = changeTrashColor;
trashBtn.onmouseleave = changeTrashColor;
editBtn.onmouseover = changePenColor;
editBtn.onmouseleave = changePenColor;
editBtn.onclick = openForm;
editBookBtn.onclick = editBookInformation;
window.onload = retrieveLibrary;

addImageBtn.onclick = () => imageInput.click();
submitBtn.onclick = addBookToLibrary;
closeBtn.onclick = closeForm;
