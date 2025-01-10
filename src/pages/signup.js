// Import necessary functions from our service
import { checkUserExists, addUser } from '../data/service.js';

// Add submit event listener to the signup form
document.getElementById('signupForm').addEventListener('submit', (e) => {
    // Prevent the form from submitting normally
    e.preventDefault();

    // Get form values and remove any extra spaces
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation: Check if any field is empty
    if (!username || !email || !password || !confirmPassword) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showErrorMessage('Passwords do not match');
        return;
    }

    // Validate email format using regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address');
        return;
    }

    try {
        // Check if username or email is already taken
        if (checkUserExists(username, email)) {
            showErrorMessage('Username or email already exists');
            return;
        }

        // Attempt to add the new user
        if (addUser(username, email, password)) {
            // Store the username in localStorage to maintain session
            localStorage.setItem('currentUser', username);
            // Redirect to main page on successful signup
            window.location.href = 'main.html';
        } else {
            // Show error if user couldn't be added
            showErrorMessage('Failed to create account. Please try again.');
        }
    } catch (error) {
        // Handle any unexpected errors
        showErrorMessage('An error occurred. Please try again.');
        console.error('Signup error:', error);
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
