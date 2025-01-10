const fs = require('fs');

// Function to read JSON data from a file
export function readJsonFile(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf-8'); // Read file content
        return JSON.parse(data); // Parse and return JSON data
    } catch (error) {
        console.error('Error reading the JSON file:', error);
        return []; // Return empty array in case of an error
    }
}

// Function to write JSON data to a file
export function writeJsonFile(filePath, jsonData) {
    try {
        // Read the current data from the file
        let data = readJsonFile(filePath);
        // Add the new user to the data
        data.push(jsonData);
        // Convert the updated data back to a JSON string
        const jsonString = JSON.stringify(data, null, 4); // Convert JSON data to string with indentation
        // Write the updated string to the file
        fs.writeFileSync(filePath, jsonString, 'utf-8'); // Write string to file
        console.log('JSON data successfully written to', filePath);
    } catch (error) {
        console.error('Error writing to the JSON file:', error);
    }
}

// Function to check if a user already exists
// true if there is a user with the same username or email
export function checkUserExists(username, email) {
    const filePath = 'src/data/users.json';
    const users = readJsonFile(filePath);
    if (!users) return false;
    // check if the username or email already exists in the json file
    return users.some(user => user.username === username) || users.some(user => user.email === email);
}

// Function to add a new user to the database
export function addUserToDatabase(username, email, password) { // returns true if the user was added, false if the user already exists
    // Path to the JSON file
    const filePath = 'src/data/users.json';
    // Read the JSON file
    const users = readJsonFile(filePath);
    // check if the username or email already exists in the json file
    if (checkUserExists(username, email)) {
        console.log('User already exists');
        return false;
    }
    // Add a new user and write back to the file
    const newUser = {
        username: username,
        email: email,
        password: password
    };
    users.push(newUser);
    writeJsonFile(filePath, users);
    return true;
}  

// Function to check user password
// returns true if the password is correct
export function checkUserPassword(username, password) {
    try {
        const filePath = 'src/data/users.json';
        const users = readJsonFile(filePath);
        if (!users) return false;
        
        const user = users.find(user => user.username === username);
        if (!user) {
            console.log('User not found');
            return false;
        }
        
        console.log('Password check:', user.password === password);
        return user.password === password;
    } catch (error) {
        console.error('Error checking password:', error);
        return false;
    }
}