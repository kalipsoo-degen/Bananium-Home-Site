# Bananium Viewer - Character Data Guide

This document explains how to update the characters displayed in the Bananium Viewer application when embedding it in Squarespace.

## Updating Character Data

All character data is stored in the JSON file `data/characters.json`. This file contains an array of character objects.

### Editing the Character JSON File

To update the characters, edit the `characters.json` file. The file contains an array of character objects, each with the following properties:

```json
{
  "name": "Character Name",
  "image": "/path/to/image.jpg",
  "description": "Character description text goes here",
  "homepage": "https://example.com"
}
```

You can add as many or as few characters as you want to this array. The application will use all characters defined in this file.

#### Image Paths in Squarespace

When embedding in Squarespace, you have several options for image paths:

1. **Squarespace Asset URLs**: Upload images to Squarespace and use their full URLs
   ```
   "image": "https://yoursite.squarespace.com/s/character1.jpg"
   ```

2. **Relative Paths**: If you've added images to your Squarespace site in a specific location
   ```
   "image": "/s/character1.jpg"
   ```

3. **External URLs**: Host images elsewhere and link to them
   ```
   "image": "https://external-site.com/images/character1.jpg"
   ```

### Embedding in Squarespace

1. Upload all application files to Squarespace using the "Files" section:
   - All JavaScript files in the `js` folder
   - The CSS file in the `css` folder
   - Your `characters.json` file in a `data` folder

2. Create a new page and add a "Code" block

3. In the Code block, include references to all necessary files:

```html
<link rel="stylesheet" href="/s/styles.css">
<div class="bananium-container">
  <canvas id="canvas"></canvas>
  <div class="interface">
    <!-- Copy interface HTML from index.html -->
    <div class="search-container" id="searchContainer">
      <input type="text" id="searchInput" placeholder="Search characters...">
      <div class="button-row">
        <button class="btn" id="prevBtn">Prev</button>
        <button class="btn" id="nextBtn">Next</button>
        <button class="btn" id="randomBtn">Random</button>
      </div>
    </div>
    
    <div class="character-card" id="characterCard">
      <div class="card-header">
        <h2 class="card-title" id="characterName">Character Name</h2>
        <button class="close-btn" id="closeCard">&times;</button>
      </div>
      <div class="character-image" id="characterImage"></div>
      <p class="character-description" id="characterDescription"></p>
      <div class="button-row">
        <button class="nav-btn" id="cardPrevBtn">◀</button>
        <button class="nav-btn" id="cardRandomBtn">⟳</button>
        <button class="nav-btn" id="cardNextBtn">▶</button>
      </div>
      <a href="#" class="homepage-btn" id="homepageLink" target="_blank">Visit Homepage</a>
    </div>
    
    <div class="hover-info" id="hoverInfo"></div>
  </div>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="/s/js/config.js"></script>
<script src="/s/js/data.js"></script>
<script src="/s/js/utils.js"></script>
<script src="/s/js/starfield.js"></script>
<script src="/s/js/character-stars.js"></script>
<script src="/s/js/interactions.js"></script>
<script src="/s/js/animation.js"></script>
<script src="/s/js/app.js"></script>
```

Replace `/s/` with the appropriate path to your files in Squarespace.

## Troubleshooting

- If characters don't appear, check the browser console for errors
- Make sure the JSON file is correctly formatted - you can validate it at [jsonlint.com](https://jsonlint.com/)
- Verify that image paths are correct and accessible
- If using external images, ensure they allow cross-origin requests
