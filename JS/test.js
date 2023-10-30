const createBorrowBookform = document.getElementById("Borrowing-form");
createBorrowBookform.addEventListener("submit", (event) => {
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
});
