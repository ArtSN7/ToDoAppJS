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
        alert('Wrong credentials')
    }


    // else need to show a message that the user already exists in the html page
    
    
    
});