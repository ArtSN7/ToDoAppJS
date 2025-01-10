// Initialize the users array in localStorage if it doesn't exist yet
// This ensures we always have a valid array to work with
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
}

// Helper function to get all users from localStorage
// Returns an array of user objects or empty array if no users exist
export function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Helper function to save users array back to localStorage
// Takes the entire users array and overwrites the existing data
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if a user with the given username or email already exists
// Returns true if either username or email is already taken
export function checkUserExists(username, email) {
    const users = getUsers();
    return users.some(user => 
        user.username === username || user.email === email
    );
}

// Add a new user to the system
// Returns true if user was added successfully, false if user already exists
export function addUser(username, email, password) {
    // First check if user already exists
    if (checkUserExists(username, email)) {
        return false;
    }
    
    // Get current users array
    const users = getUsers();
    
    // Add new user to array
    users.push({
        username,
        email,
        password // Note: In a real app, password should be hashed
    });
    
    // Save updated users array
    saveUsers(users);
    return true;
}

// Verify user's password
// Returns true if username exists and password matches
export function checkUserPassword(username, password) {
    // Get all users and find the one with matching username
    const users = getUsers();
    const user = users.find(u => u.username === username);
    
    // If no user found with this username, return false
    if (!user) {
        return false;
    }
    
    // Compare passwords (in real app, would compare hashed passwords)
    return user.password === password;
}