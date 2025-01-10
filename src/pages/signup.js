// Import necessary functions from our service
import { checkUserExists, addUserToDatabase} from '../data/service.js';


document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault(); // prevent from instant redirection

    // get user data from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // store this data in the dictionary
    const userData = { username, email, password };

    // check if the user exists in the json file
    if (checkUserExists(username, email)) {
        // need to show a message that the user already exists in the html page
        showErrorMessage('User already exists');
        return;
    }else{

        // store this data in the json file
        addUserToDatabase(username, email, password);
        // redirect to the main page
        window.location.href = 'main.html'
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
