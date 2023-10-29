const apiUrl = "https://localhost:7211/api/BookManagement";
const tableBody = document.getElementById("book-table-body");
const searchOptionSelect = document.getElementById("search-option");
const searchInput = document.getElementById("search-input");

const searchBooks = (event) => {
  event.preventDefault();
  const searchOption = searchOptionSelect.value;
  const searchValue = searchInput.value;

  let searchUrl = apiUrl;

  if (searchOption === "GetBookByTitle") {
    searchUrl = `${apiUrl}/GetBookByTitle?title=${searchValue}`;
  } else if (searchOption === "GetAllBook") {
    searchUrl = `${apiUrl}/GetAllBook`;
  } else {
    searchUrl = `${apiUrl}/${searchOption}/${searchValue}`;
  }

  fetch(searchUrl)
    .then((response) => {
      if (!response.ok) {
        console.log("Response not okay:", response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((book) => {
        const row = createRow(book);
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.log("An error occurred while fetching books:", error);
    });
};

const createRow = (book) => {
  const row = document.createElement("tr");
  row.id = `book-${book.b_ID}`;

  addCell(row, book.b_ID);
  addCell(row, book.title);
  addCell(row, book.author);
  addCell(row, book.publication_year);
  addCell(row, book.is_Available ? "True" : "False");

  const actionCell = document.createElement("td");
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "Borrow";
  removeButton.addEventListener("click", () => borrowBook(book.b_ID));
  actionCell.appendChild(removeButton);
  row.appendChild(actionCell);

  return row;
};

const addCell = (row, text) => {
  const cell = document.createElement("td");
  cell.textContent = text;
  row.appendChild(cell);
};

const removeBook = (bookId) => {
  const confirmation = confirm("Are you sure you want to remove this book?");
  if (confirmation) {
    deleteBook(bookId)
      .then((response) => {
        if (response.ok) {
          const row = document.getElementById(`book-${bookId}`);
          row.parentNode.removeChild(row);
        } else {
          throw new Error("Failed to delete the book");
        }
      })
      .catch((error) => {
        console.log("An error occurred while deleting the book:", error);
      });
  }
};

const deleteBook = (bookId) => {
  const deleteUrl = `${apiUrl}?ID=${bookId}`;
  return fetch(deleteUrl, {
    method: "DELETE",
  });
};

searchBooks();

function openNewWindow() {
  const dropdown = document.getElementById("select-option");
  const selectedValue = dropdown.value;
  window.open(selectedValue, "_blank");
};