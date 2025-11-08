// Adventure mode logic
class Adventure {
    constructor() {
        this.currentQuest = null;
        this.currentScene = 0;
    }

    startQuest(creature, container, storage) {
        this.currentQuest = 'snack';
        this.currentScene = 0;
        this.showScene(container, storage);
    }

    showScene(container, storage) {
        const scenes = [
            {
                text: `Your creature ${creature.name} is feeling hungry! They want to find their favorite snack.`,
                choices: [
                    { text: 'Go to the forest', next: 1 },
                    { text: 'Go to the kitchen', next: 2 }
                ]
            },
            {
                text: `In the forest, ${creature.name} finds some berries! But there's a friendly squirrel nearby.`,
                choices: [
                    { text: 'Share the berries', next: 3 },
                    { text: 'Eat them all', next: 4 }
                ]
            },
            {
                text: `In the kitchen, ${creature.name} finds cookies! But they belong to someone.`,
                choices: [
                    { text: 'Ask politely', next: 3 },
                    { text: 'Take one quickly', next: 4 }
                ]
            },
            {
                text: `Great choice! ${creature.name} made a friend and got a snack! 🎉`,
                choices: [
                    { text: 'Go on another adventure', action: 'restart' }
                ]
            },
            {
                text: `Hmm, ${creature.name} feels a bit guilty. Maybe next time they'll make a better choice.`,
                choices: [
                    { text: 'Try again', action: 'restart' }
                ]
            }
        ];

        const scene = scenes[this.currentScene];
        if (!scene) return;

        container.innerHTML = `
            <div class="story-text">${scene.text}</div>
            <div class="choices"></div>
        `;

        const choicesDiv = container.querySelector('.choices');
        scene.choices.forEach(choice => {
            const button = document.createElement('button');
            button.className = 'choice-button';
            button.textContent = choice.text;
            button.addEventListener('click', () => {
                if (choice.action === 'restart') {
                    this.currentScene = 0;
                    this.showScene(container, storage);
                } else if (choice.next !== undefined) {
                    this.currentScene = choice.next;
                    this.showScene(container, storage);
                    
                    // Award achievement for completing quest
                    if (choice.next === 3) {
                        storage.addAchievement('snack_quest', {
                            name: 'Snack Finder',
                            description: 'Found a snack and made a friend!'
                        });
                    }
                }
            });
            choicesDiv.appendChild(button);
        });
    }
}

