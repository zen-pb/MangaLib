const container = document.querySelector(".container");

const myLibrary = [
  {
    img: "./assets/images/jjk-vol25.svg",
    title: "Jujutsu Kaisen VOL. 25",
    author: "Gege Akutami",
    pages: "218",
    status: "read",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  displayLibrary();

  container.addEventListener("click", (event) => {
    if (event.target.closest(".close-card")) {
      const card = event.target.closest(".card");
      if (card) {
        const bookTitle = card.querySelector(".title").textContent;
        deleteBook(bookTitle);
        card.remove();
      }
    }
  });

  const addBookButton = document.getElementById("addBookButton");
  const modalAddBook = document.getElementById("modalAddBook");
  const modalCloseButton = document.getElementById("modalCloseButton");

  const addBookForm = document.getElementById("addBookForm");
  const exists = document.getElementById("alreadyExists");
  const submitBookButton = document.getElementById("submitBook");

  const uploadedImage = document.getElementById("uploadedImage");
  const imagePreview = document.getElementById("imagePreview");

  let imageURL = "./assets/images/default.svg";

  uploadedImage.addEventListener("change", function () {
    const image = uploadedImage.files[0];

    if (image) {
      imageURL = URL.createObjectURL(image);
      imagePreview.src = imageURL;
      imagePreview.style.display = "block";
    } else {
      imagePreview.src = "./assets/images/default.svg";
      imagePreview.style.display = "none";
    }
  });

  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const pagesInput = document.getElementById("pages");

  titleInput.addEventListener("input", (event) => {
    const title = event.target.value.trim();

    if (bookExists(title)) {
      exists.classList.add("exists");
      submitBookButton.disabled = true;
    } else {
      exists.classList.remove("exists");
      submitBookButton.disabled = false;
    }

    if (title === "") {
      titleInput.setCustomValidity("Please input a title!");
    } else {
      titleInput.setCustomValidity("");
    }

    if (document.activeElement !== titleInput) {
      titleInput.reportValidity();
    }
  });

  authorInput.addEventListener("input", (event) => {
    const author = event.target.value.trim();

    if (author === "") {
      authorInput.setCustomValidity("Please input an author!");
    } else {
      authorInput.setCustomValidity("");
    }

    if (document.activeElement !== authorInput) {
      authorInput.reportValidity();
    }
  });

  pagesInput.addEventListener("input", (event) => {
    const pages = event.target.value.trim();

    if (pages === "") {
      pagesInput.setCustomValidity("Please input book pages!");
    } else {
      pagesInput.setCustomValidity("");
    }

    if (document.activeElement !== pagesInput) {
      pagesInput.reportValidity();
    }
  });

  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const status = document.querySelector('input[name="status"]:checked').value;

    if (!bookExists(title)) {
      const book = new Book(imageURL, title, author, pages, status);
      addBookToLibrary(book);
      closeModal();
      flush();
      displayLibrary();
    }
  });

  addBookButton.addEventListener("click", () => {
    modalAddBook.classList.add("open");
  });

  modalCloseButton.addEventListener("click", () => {
    closeModal();
    flush();
  });
});

function closeModal() {
  modalAddBook.classList.remove("open");
}

class Book {
  constructor(imageURL, title, author, pages, status) {
    this.img = imageURL;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
}

function deleteBook(bookTitle) {
  const index = myLibrary.findIndex(
    (book) =>
      book.title.toLowerCase().replace(/ /g, "") ===
      bookTitle.toLowerCase().replace(/ /g, "")
  );

  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

function displayLibrary() {
  container.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    const button = document.createElement("button");
    const svg = document.createElement("img");
    const bookDiv = document.createElement("div");
    const bookImg = document.createElement("img");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const label = document.createElement("label");
    const bookStatus = document.createElement("input");
    const span = document.createElement("span");
    const p = document.createElement("p");

    card.classList.add("card");
    button.classList.add("close-card");
    bookDiv.classList.add("book");
    bookTitle.classList.add("title");
    bookAuthor.classList.add("author");
    bookPages.classList.add("pages");
    label.classList.add("switch");
    bookStatus.type = "checkbox";
    span.classList.add("slider");

    button.id = "cardCloseButton";
    button.name = "close";
    svg.src = "./assets/images/close.svg";
    svg.alt = "close";
    bookImg.src = book.img;
    bookImg.alt = "book cover";
    bookImg.width = "200";
    bookImg.height = "300";
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = `${book.pages} page/s`;
    bookStatus.checked = book.status === "read";
    p.textContent = "Read";

    button.appendChild(svg);

    bookDiv.appendChild(bookImg);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);

    label.appendChild(bookStatus);
    span.appendChild(p);
    label.appendChild(span);

    card.appendChild(button);
    card.appendChild(bookDiv);
    card.appendChild(label);

    container.appendChild(card);
  });
}

function bookExists(bookTitle) {
  return myLibrary.some(
    (book) =>
      book.title.toLowerCase().replace(/ /g, "") ===
      bookTitle.toLowerCase().replace(/ /g, "")
  );
}

function flush() {
  imagePreview.style.display = "none";
  imagePreview.src = "./assets/images/default.svg";

  const inputs = [
    document.getElementById("title"),
    document.getElementById("author"),
    document.getElementById("pages"),
    document.getElementById("uploadedImage"),
  ];

  inputs.forEach((input) => (input.value = ""));

  const statusInputs = document.querySelectorAll('input[name="status"]');
  statusInputs.forEach((input) => (input.checked = false));
}
