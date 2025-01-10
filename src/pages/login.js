// Import the password checking function from our service
import { checkUserPassword } from '../data/service.js';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // Always prevent default form submission first
    e.preventDefault(); 

    // get user data from the form
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate inputs
    if (!username || !password) {
        showErrorMessage('Please fill in all fields');
        return;
    }

    try {
        console.log('Attempting login with:', { username });
        
        if (checkUserPassword(username, password)) {
            console.log('Login successful');
            window.location.href = 'main.html';
        } else {
            console.log('Login failed');
            showErrorMessage('Invalid username or password');
        }
    } catch (error) {
        console.error('Login error:', error);
        showErrorMessage('An error occurred during login');
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