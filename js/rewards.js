// Reward and unlock system
class Rewards {
    constructor(storage) {
        this.storage = storage;
    }

    // Unlock a part when achievement is earned
    unlockPart(partId) {
        return this.storage.unlockPart(partId);
    }

    // Check if user can unlock parts based on achievements
    checkUnlocks() {
        const achievements = this.storage.getAchievements();
        const progress = this.storage.getProgress('care');
        
        // Unlock parts based on achievements
        achievements.forEach(achievement => {
            if (achievement.id === 'snack_quest') {
                this.unlockPart('head3'); // Unlock triangle head
            }
        });

        // Unlock parts based on care activities
        if (progress.totalFeeds >= 10) {
            this.unlockPart('body3'); // Unlock square body
        }
        if (progress.totalPlays >= 5) {
            this.unlockPart('arm3'); // Unlock strong arms
        }
    }

    // Award points for activities
    awardPoints(activity, points) {
        const progress = this.storage.getProgress(activity);
        if (!progress.totalPoints) {
            progress.totalPoints = 0;
        }
        progress.totalPoints += points;
        this.storage.updateProgress(activity, progress);
        return progress.totalPoints;
    }

    // Get user's total points
    getTotalPoints() {
        const activities = ['care', 'games', 'adventure'];
        let total = 0;
        activities.forEach(activity => {
            const progress = this.storage.getProgress(activity);
            total += progress.totalPoints || 0;
        });
        return total;
    }
}

