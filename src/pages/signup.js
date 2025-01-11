// Import necessary functions from our service
import { checkUserExists, addUserToDatabase } from '../data/service.js';

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    // Always prevent default form submission first
    e.preventDefault();

    // Get user data from the form and trim whitespace
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    console.log('Attempting signup with:', { username, email });

    try {
        // Validate all fields are filled
        if (!username || !email || !password || !confirmPassword) {
            showErrorMessage('Please fill in all fields');
            return;
        }

        // Validate username length
        if (username.length < 3) {
            showErrorMessage('Username must be at least 3 characters long');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showErrorMessage('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            showErrorMessage('Password must be at least 6 characters long');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            showErrorMessage('Passwords do not match');
            return;
        }

        // Check if user already exists
        console.log('Checking if user exists...');
        if (checkUserExists(username, email)) {
            console.log('User already exists');
            showErrorMessage('Username or email already exists');
            return;
        }

        // Attempt to add the new user
        console.log('Adding new user...');
        if (addUserToDatabase(username, email, password)) {
            console.log('Signup successful');

            // TASK : NEED TO STORE SOMEWHERE his name for the future use
            localStorage.setItem('currentUser', username);

            // Redirect to main.html
            window.location.href = 'main.html';
        } else {
            console.log('Failed to add user');
            showErrorMessage('Failed to create account. Please try again.');
        }
    } catch (error) {
        console.error('Signup error:', error);
        showErrorMessage('An error occurred during signup');
    }
});

// Function to display error messages to the user
function showErrorMessage(message) {
    console.log('Showing error:', message);
    const errorElement = document.getElementById('error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    } else {
        console.error('Error element not found');
        alert(message);
    }
}
