document.addEventListener("DOMContentLoaded", () => {
  const addBookButton = document.getElementById("addBookButton");
  const modalAddBook = document.getElementById("modalAddBook");
  const modalCloseButton = document.getElementById("modalCloseButton");

  const addBookForm = document.getElementById("addBookForm");

  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.querySelector('input[name="status"]:checked').value;

    addBookToLibrary(Book(title, author, pages, status));

    closeModal();
  });

  addBookButton.addEventListener("click", () => {
    modalAddBook.classList.add("open");
  });

  modalCloseButton.addEventListener("click", closeModal);
});

function closeModal() {
  modalAddBook.classList.remove("open");
}

const myLibrary = [];

function Book(title, author, pages, status) {
  return {
    title: title,
    author: author,
    pages: pages,
    status: status,
  };
}

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
}

function createCard() {
  const card = document.createElement("div");
  card.classList.add("card");

  const cardAuthor = document.createElement("p");
  cardAuthor.classList.add("author");

  const cardPages = document.createElement("p");
  cardPages.classList.add("pages");
}
