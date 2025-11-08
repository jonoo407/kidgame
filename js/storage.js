// User-specific storage system
class Storage {
    constructor() {
        this.auth = new Auth();
    }

    // Get current user's data
    getCurrentUserData() {
        const username = this.auth.getCurrentUser();
        if (!username) return null;
        return this.auth.getUserData(username);
    }

    // Save current user's data
    saveCurrentUserData(data) {
        const username = this.auth.getCurrentUser();
        if (!username) return false;
        this.auth.saveUserData(username, data);
        return true;
    }

    // Save a creature
    saveCreature(creature) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;

        // Add creation date if not present
        if (!creature.createdAt) {
            creature.createdAt = new Date().toISOString();
        }

        // Update if exists, otherwise add
        const index = userData.creatures.findIndex(c => c.id === creature.id);
        if (index >= 0) {
            userData.creatures[index] = creature;
        } else {
            if (!creature.id) {
                creature.id = Date.now().toString();
            }
            userData.creatures.push(creature);
        }

        this.saveCurrentUserData(userData);
        return true;
    }

    // Get all creatures for current user
    getCreatures() {
        const userData = this.getCurrentUserData();
        return userData ? userData.creatures : [];
    }

    // Get a specific creature by ID
    getCreature(id) {
        const creatures = this.getCreatures();
        return creatures.find(c => c.id === id);
    }

    // Delete a creature
    deleteCreature(id) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;

        userData.creatures = userData.creatures.filter(c => c.id !== id);
        this.saveCurrentUserData(userData);
        return true;
    }

    // Update progress
    updateProgress(activity, progress) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;

        userData.progress[activity] = progress;
        this.saveCurrentUserData(userData);
        return true;
    }

    // Get progress
    getProgress(activity) {
        const userData = this.getCurrentUserData();
        return userData ? (userData.progress[activity] || {}) : {};
    }

    // Unlock a part
    unlockPart(partId) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;

        if (!userData.unlockedParts.includes(partId)) {
            userData.unlockedParts.push(partId);
            this.saveCurrentUserData(userData);
        }
        return true;
    }

    // Check if part is unlocked
    isPartUnlocked(partId) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;
        return userData.unlockedParts.includes(partId);
    }

    // Add achievement
    addAchievement(achievementId, achievementData) {
        const userData = this.getCurrentUserData();
        if (!userData) return false;

        const exists = userData.achievements.find(a => a.id === achievementId);
        if (!exists) {
            userData.achievements.push({
                id: achievementId,
                ...achievementData,
                unlockedAt: new Date().toISOString()
            });
            this.saveCurrentUserData(userData);
        }
        return true;
    }

    // Get achievements
    getAchievements() {
        const userData = this.getCurrentUserData();
        return userData ? userData.achievements : [];
    }
}

