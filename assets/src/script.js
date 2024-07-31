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
        const book = card.textContent.toLowerCase().replace(/ /g, "");
        deleteBook(book);
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

  let imageURL = "../assets/images/default.svg";

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
  let title = "";

  titleInput.addEventListener("input", (event) => {
    title = event.target.value;

    if (bookExists(title)) {
      exists.classList.add("exists");
      submitBookButton.disabled = true;
    } else {
      exists.classList.remove("exists");
      submitBookButton.disabled = false;
    }
  });

  addBookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const status = document.querySelector('input[name="status"]:checked').value;

    if (!bookExists(title)) {
      addBookToLibrary(Book(imageURL, title, author, pages, status));
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

function Book(imageURL, title, author, pages, status) {
  return {
    img: imageURL,
    title: title,
    author: author,
    pages: pages,
    status: status,
  };
}

function addBookToLibrary(bookObject) {
  myLibrary.push(bookObject);
}

function deleteBook(book) {
  myLibrary.forEach((item, index) => {
    let bookTitle = item.title.toLowerCase().replace(/ /g, "");

    if (book.includes(bookTitle)) {
      myLibrary.splice(index, 1);
    }
  });
}

function displayLibrary() {
  myLibrary.forEach((book) => {
    if (cardChecker(book.title)) {
      return;
    } else {
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
      bookPages.textContent = `${book.pages} pages`;
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
    }
  });
}

function bookExists(bookTitle) {
  let exists = false;
  let title = bookTitle.toLowerCase().replace(/ /g, "");

  myLibrary.forEach((book) => {
    let bookLib = book.title.toLowerCase().replace(/ /g, "");

    if (bookLib === title) {
      exists = true;
    }
  });

  return exists;
}

function cardChecker(bookTitle) {
  let exists = false;
  const book = document.querySelector(".book");

  if (book != null && book.innerHTML.includes(bookTitle)) {
    exists = true;
  }

  return exists;
}

function flush() {
  imagePreview.style.display = "none";
  imageURL = "../assets/images/default.svg";
  title.value = "";
  author.value = "";
  pages.value = "";
  status.value = "";
}
