// Function to handle the registration form submission
function handleRegistrationForm(event) {
    event.preventDefault();
    // Handle registration form submission
    alert("Registration functionality will be added soon!");

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    console.log(username);
    const data = {
        name: username,
        emailAddress: email,
        password: password,
        age: age
    };

    var requestOptions = {
        method: 'POST'
    };

    const apiPOSTURL = `https://localhost:7211/api/PatronManagement?name=${username}&emailAddress=${email}&age=${age}&password=${password}`;
    fetch(apiPOSTURL,requestOptions)
        .then(response => {
            if (response.ok) {
                // Registration successful, redirect to the home page
                window.location.href = "C:/Users/TRA/Desktop/atyap/libraryweb/HTML/home.html";
            } else {
                throw new Error('Registration failed');
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to handle the login form submission
function handleLoginForm(event) {
    event.preventDefault();
    // Add your login form submission logic here
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log(`${email}--${password}`);
    // Add server-side authentication logic here

    const data = {
        email: email,
        password: password,
    };

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: "follow",
    };

    const apiUrl = "https://localhost:7211/api/Login";
    fetch(apiUrl, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            } else {
                return response.text().then((textData) => {
                    console.log(textData);
                    localStorage.setItem("authToken", textData);
                    window.location.href = "addbooks.html";
                });
            }
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Invalid email or password. Please try again.");
        });
}

// Function to show the registration form
function showRegistration() {
    const loginSection = document.getElementById("login-section");
    const registrationSection = document.getElementById("registration-section");

    loginSection.style.display = "none";
    registrationSection.style.display = "block";
}
