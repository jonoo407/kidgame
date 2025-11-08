# Creature Builder Game 🐾

A fun, interactive web-based creature builder game designed for kids around 8 years old. Create unique creatures, take care of them, play games, go on adventures, and showcase your creations!

## Features

- **Simple Login**: Name-based login system (no passwords needed)
- **Creature Building**: Drag-and-drop interface to create unique creatures
- **Creature Care**: Feed, play, pet, and tickle your creatures to keep them happy
- **Mini-Games**: Fun games to play with your creatures
- **Adventure Mode**: Go on quests and make choices with your creatures
- **Showcase**: View all your creatures in a gallery or watch them parade
- **Rewards System**: Unlock new parts by completing activities

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Enter your name to start playing!

### GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to your repository settings
3. Navigate to "Pages" section
4. Select the branch (usually `main`) and folder (`/` root)
5. Your game will be available at `https://yourusername.github.io/kidgame/`

## File Structure

```
kidgame/
├── index.html              # Login/name entry page
├── hub.html                # Main hub/home page
├── pages/
│   ├── builder.html       # Creature building page
│   ├── care.html          # Creature care activity
│   ├── games.html         # Mini-games hub
│   ├── adventure.html     # Adventure/quest mode
│   └── showcase.html      # Showcase and parade
├── css/
│   └── style.css          # Game styles and animations
├── js/
│   ├── auth.js            # User authentication
│   ├── storage.js         # LocalStorage management
│   ├── parts.js           # Creature parts system
│   ├── creature.js        # Creature class and rendering
│   ├── rewards.js         # Unlock and reward system
│   └── activities/
│       ├── minigames.js   # Mini-games logic
│       └── adventure.js   # Adventure mode logic
└── assets/                # Images and other assets
```

## How to Play

1. **Start**: Enter your name on the login page
2. **Build**: Create creatures by dragging parts and choosing colors
3. **Care**: Keep your creatures happy by feeding and playing with them
4. **Play**: Try mini-games with your creatures
5. **Adventure**: Go on quests and make choices
6. **Showcase**: View all your creations

## Technical Details

- **Pure JavaScript**: No frameworks required, works everywhere
- **LocalStorage**: All data saved locally in the browser
- **SVG Rendering**: Creatures rendered as scalable vector graphics
- **Responsive Design**: Works on tablets and computers
- **No Backend**: Fully client-side, perfect for GitHub Pages

## Browser Compatibility

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

Free to use and modify for educational purposes.

## Credits

Created as a fun project for kids to explore creativity and have fun building creatures!

