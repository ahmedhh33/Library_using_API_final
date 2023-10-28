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

const borrowBook = (bookId) => {
  const confirmation = confirm("Are you sure you want to borrow this book?");
  if (confirmation) {
    window.location.href = "Borrow.html";
    function handleBorrowngForm(event) {
      event.preventDefault();
      const accountNumber = document.getElementById("accountNumber").value;
      const accountHolderId = document.getElementById("accountHolderId").value;
      const patronId = document.getElementById("patronId").value;

      // Call the borrowBook API endpoint here with the necessary data
      const borrowUrl = `https://localhost:7211/api/BorrowingTransactions?patronId=${patronId}&bookId=${bookId}&AccountNumber=${accountNumber}&AccountHolderID=${accountHolderId}`;
      fetch(borrowUrl, {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            alert("Book borrowed successfully");
            window.location.href = "main.html";
            // Update the UI or handle any necessary tasks after successful borrowing
          } else {
            throw new Error("Failed to borrow the book");
          }
        })
        .catch((error) => {
          console.log("An error occurred while borrowing the book:", error);
        });
    }
  }
};

searchBooks();
