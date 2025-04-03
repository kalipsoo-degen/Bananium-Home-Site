# BANANIUM MAXIMUS Website

A futuristic website for the BANANIUM MAXIMUS AI Battle Royale event.

## Project Structure

```
.
├── index.html               # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css       # Main CSS styles
│   ├── js/
│   │   ├── main.js          # Main entry point
│   │   ├── app.js           # Core application logic
│   │   ├── config.js        # Configuration settings
│   │   ├── data.js          # Data management
│   │   ├── interactions.js  # User interactions
│   │   ├── animations.js    # Animation effects
│   │   └── prize-data.json  # Prize pool data in JSON format
│   ├── images/              # Image assets (not included)
│   └── videos/              # Video assets (not included)
└── README.md                # This file
```

## Features

- Responsive design for all screen sizes
- Modular JavaScript architecture for maintainability
- Dynamic loading of prize data from JSON
- Smooth scrolling and animations
- Support for loading external JavaScript applications
- Modern UI with animations and interactive elements

## Required Assets

Before running the website, you'll need to add the following assets:

1. `assets/videos/hero-bg.mp4` - Hero section background video
2. `assets/images/battle-scene.jpg` - Battle scene image for the About section
3. `assets/images/prize-bg.jpg` - Background image for the Prize Pool section

## Getting Started

To run the website locally:

1. Clone this repository
2. Add the required assets mentioned above
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`

For production deployment, use:
```
npm start
```

## External Dependencies

- Google Fonts (Orbitron, Teko)
- Font Awesome 6.5.1 for icons
- Express.js for the development server

## Browser Compatibility

This website is compatible with modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest) 