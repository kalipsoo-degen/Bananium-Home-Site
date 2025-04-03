// Character data processing
let characterData = [];
let filteredCharacters = [];

// Load character data from embedded JavaScript variable
function loadCharacterData() {
  try {
    // Use the embedded data directly
    characterData = CHARACTERS_DATA || [];
    filteredCharacters = [...characterData];
    
    // Signal that characters are loaded and ready
    console.log("Character data loaded successfully, firing charactersLoaded event...");
    const event = new CustomEvent('charactersLoaded');
    window.dispatchEvent(event);
    
    return characterData;
  } catch (error) {
    console.error('Error loading character data:', error);
    // Provide fallback data if loading fails
    characterData = [
      {
        name: "Default Character",
        image: "/api/placeholder/350/200",
        description: "Character data could not be loaded. Please check your console for errors.",
        homepage: "#"
      }
    ];
    filteredCharacters = [...characterData];
    
    // Still try to fire event
    const event = new CustomEvent('charactersLoaded');
    window.dispatchEvent(event);
    
    return characterData;
  }
}

// Initialize characters immediately
document.addEventListener('DOMContentLoaded', () => {
  loadCharacterData();
});

// Call loadCharacterData immediately to avoid delay
loadCharacterData();
