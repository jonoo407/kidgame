// Simple name-based authentication system
class Auth {
    constructor() {
        this.storageKey = 'creatureGame_users';
        this.currentUserKey = 'creatureGame_currentUser';
    }

    // Get all registered users
    getUsers() {
        const usersJson = localStorage.getItem(this.storageKey);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    // Save user list
    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // Add a new user
    addUser(username) {
        const users = this.getUsers();
        if (!users.includes(username)) {
            users.push(username);
            this.saveUsers(users);
        }
        this.setCurrentUser(username);
        this.initializeUserData(username);
    }

    // Set current user
    setCurrentUser(username) {
        localStorage.setItem(this.currentUserKey, username);
    }

    // Get current user
    getCurrentUser() {
        return localStorage.getItem(this.currentUserKey);
    }

    // Initialize user data structure
    initializeUserData(username) {
        const userDataKey = `creatureGame_user_${username}`;
        const existingData = localStorage.getItem(userDataKey);
        if (!existingData) {
            const initialData = {
                creatures: [],
                progress: {},
                unlockedParts: [],
                achievements: []
            };
            localStorage.setItem(userDataKey, JSON.stringify(initialData));
        }
    }

    // Get user data
    getUserData(username) {
        const userDataKey = `creatureGame_user_${username}`;
        const dataJson = localStorage.getItem(userDataKey);
        if (dataJson) {
            return JSON.parse(dataJson);
        }
        this.initializeUserData(username);
        return {
            creatures: [],
            progress: {},
            unlockedParts: [],
            achievements: []
        };
    }

    // Save user data
    saveUserData(username, data) {
        const userDataKey = `creatureGame_user_${username}`;
        localStorage.setItem(userDataKey, JSON.stringify(data));
    }

    // Check if user exists
    userExists(username) {
        const users = this.getUsers();
        return users.includes(username);
    }

    // Login (set as current user)
    login(username) {
        if (!this.userExists(username)) {
            this.addUser(username);
        } else {
            this.setCurrentUser(username);
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}

