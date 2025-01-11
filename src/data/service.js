// Initialize the users array in localStorage if it doesn't exist
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Function to read data from localStorage
function readData() {
    try {
        return JSON.parse(localStorage.getItem('users')) || [];
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return [];
    }
}

// Function to write data to localStorage
function writeData(data) {
    try {
        localStorage.setItem('users', JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
    }
}

// Function to check if a user already exists
export function checkUserExists(username, email) {
    const users = readData();
    return users.some(user => user.username === username || user.email === email);
}

// Function to add a new user
export function addUserToDatabase(username, email, password) {
    try {
        const users = readData();
        const newUser = { username, email, password };
        users.push(newUser);
        writeData(users);
        return { success: true };
    } catch (error) {
        console.error('Error adding user:', error);
        return { success: false, error: error.message };
    }
}

// Function to check user password
export function checkUserPassword(username, password) {
    const users = readData();
    const user = users.find(u => u.username === username);
    return user && user.password === password;
}