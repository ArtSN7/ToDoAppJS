import { checkUserExists } from '../utils/checkUserExists.js';
import { writeJsonFile } from '../utils/writeJsonFile.js';


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
        return false;

    }

    // store this data in the json file
    writeJsonFile('src/data/users.json', userData);

    // redirect to the main page
    window.location.href = 'main.html'
});
