// Import the password checking function from our service
import { checkUserPassword } from '../data/service.js';

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault(); //  prevent from instant redirection
    // get user data from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // store this data in the dictionary
    const userData = { username, password };
    console.log(userData);

    if (checkUserPassword(username, password)) {
        window.location.href = 'main.html' // redirect to the main page
    } else {
        // Show error if credentials don't match
        showErrorMessage('Invalid username or password');
        return;
    }
    // else need to show a message that the user already exists in the html page
    
    
    
});


// Function to display error messages to the user
function showErrorMessage(message) {
    // Try to find error message element
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        // Update error message text and show it
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        // Fallback to alert if error element not found
        return;
    }
}