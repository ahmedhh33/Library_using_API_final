const apiUrl = "https://localhost:7211/api/BookManagement";
const tableBody = document.getElementById("book-table-body");
const searchOptionSelect = document.getElementById("search-option");
const searchInput = document.getElementById("search-input");

const searchBooks = (event) => {
  if (event) {
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
  }
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
  const BorroweButton = document.createElement("button");
  BorroweButton.classList.add("remove-button");
  BorroweButton.textContent = "Borrow";
  BorroweButton.addEventListener("click", () => borrowBook(book.b_ID));
  actionCell.appendChild(BorroweButton);
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
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");
    document.body.appendChild(formContainer);

    const borrowingForm = document.createElement("form");
    borrowingForm.classList.add("borrowing-form");

    const formTitle = document.createElement("h2");
    formTitle.textContent = "Borrowing Form";
    formContainer.appendChild(formTitle);

    const accountNumberLabel = createLabel("account-number", "Account Number");
    const accountNumberInput = createInput("account-number", "number");
    accountNumberInput.classList.add("form-input");
    accountNumberInput.placeholder = "Enter Account Number";

    const accountHolderIdLabel = createLabel("account-holder-id", "Account Holder ID");
    const accountHolderIdInput = createInput("account-holder-id", "number");
    accountHolderIdInput.classList.add("form-input");
    accountHolderIdInput.placeholder = "Enter Account Holder ID";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.classList.add("submit-button");

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      const accountNumber = accountNumberInput.value;
      const accountHolderId = accountHolderIdInput.value;

      const borrowUrl = `https://localhost:7211/api/BorrowingTransactions?patronId=1&bookId=${bookId}&AccountNumber=${accountNumber}&AccountHolderID=${accountHolderId}`;
      fetch(borrowUrl, {
        method: "POST",
      })
        .then((response) => {
          if (response.ok) {
            alert("Book borrowed successfully");
            window.location.href = "main.html";
          } else {
            throw new Error("Failed to borrow the book");
          }
        })
        .catch((error) => {
          console.log("An error occurred while borrowing the book:", error);
        });
    });

    borrowingForm.appendChild(accountNumberLabel);
    borrowingForm.appendChild(accountNumberInput);
    borrowingForm.appendChild(accountHolderIdLabel);
    borrowingForm.appendChild(accountHolderIdInput);
    borrowingForm.appendChild(submitButton);

    formContainer.appendChild(borrowingForm);
  }
};

function createLabel(forId, labelText) {
  const label = document.createElement("label");
  label.setAttribute("for", forId);
  label.textContent = labelText;
  return label;
}

function createInput(id, type) {
  const input = document.createElement("input");
  input.id = id;
  input.type = type;
  return input;
}


searchBooks();
