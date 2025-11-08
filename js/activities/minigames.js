// Mini-games logic
class MiniGames {
    constructor() {
        this.currentGame = null;
    }

    // Dance game
    startDanceGame(creature, container) {
        this.currentGame = 'dance';
        // Simple dance game implementation
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>💃 Creature Dance-Off 💃</h2>
                <div id="danceCreature" style="width: 200px; height: 200px; margin: 20px auto;"></div>
                <p>Click the button when the music plays!</p>
                <button id="danceButton" class="btn-primary" style="margin: 20px;">Dance!</button>
                <p>Score: <span id="danceScore">0</span></p>
            </div>
        `;

        const danceButton = document.getElementById('danceButton');
        let score = 0;
        let isDancing = false;

        danceButton.addEventListener('click', () => {
            if (!isDancing) {
                isDancing = true;
                score++;
                document.getElementById('danceScore').textContent = score;
                danceButton.textContent = 'Dancing! 💃';
                setTimeout(() => {
                    isDancing = false;
                    danceButton.textContent = 'Dance!';
                }, 500);
            }
        });
    }

    // Memory game
    startMemoryGame(partsManager, container) {
        this.currentGame = 'memory';
        // Simple memory game implementation
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h2>🧠 Memory Match 🧠</h2>
                <p>Find matching creature parts!</p>
                <div id="memoryGrid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; max-width: 500px; margin: 20px auto;"></div>
                <p>Score: <span id="memoryScore">0</span></p>
            </div>
        `;

        // Create memory cards
        const parts = ['head1', 'head2', 'body1', 'body2'];
        const cards = [...parts, ...parts].sort(() => Math.random() - 0.5);
        
        const grid = document.getElementById('memoryGrid');
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.dataset.cardId = card;
            cardElement.dataset.index = index;
            cardElement.style.cssText = 'width: 100px; height: 100px; background: #667eea; border-radius: 10px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: white; font-size: 2em;';
            cardElement.textContent = '?';
            cardElement.addEventListener('click', () => flipCard(cardElement));
            grid.appendChild(cardElement);
        });

        let flippedCards = [];
        let score = 0;

        function flipCard(cardElement) {
            if (flippedCards.length >= 2) return;
            if (cardElement.classList.contains('flipped')) return;

            cardElement.classList.add('flipped');
            cardElement.textContent = '🎨';
            flippedCards.push(cardElement);

            if (flippedCards.length === 2) {
                setTimeout(() => {
                    if (flippedCards[0].dataset.cardId === flippedCards[1].dataset.cardId) {
                        score++;
                        document.getElementById('memoryScore').textContent = score;
                        flippedCards.forEach(c => c.style.opacity = '0.5');
                    } else {
                        flippedCards.forEach(c => {
                            c.classList.remove('flipped');
                            c.textContent = '?';
                        });
                    }
                    flippedCards = [];
                }, 1000);
            }
        }
    }
}

