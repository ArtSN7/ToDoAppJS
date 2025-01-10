// Import the password checking function from our service
import { checkUserPassword } from '../data/service.js';

// Add submit event listener to the login form
document.getElementById('loginForm').addEventListener('submit', (e) => {
    // Prevent the form from submitting normally
    e.preventDefault();

    // Get form values and remove any extra spaces
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Check if either field is empty
    if (!username || !password) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    try {
        // Check if username and password match
        if (checkUserPassword(username, password)) {
            // Store the username in localStorage to maintain session
            localStorage.setItem('currentUser', username);
            // Redirect to main page on successful login
            window.location.href = 'main.html';
        } else {
            // Show error if credentials don't match
            showErrorMessage('Invalid username or password');
        }
    } catch (error) {
        // Handle any unexpected errors
        showErrorMessage('An error occurred. Please try again.');
        console.error('Login error:', error);
    }
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
        alert(message);
    }
}