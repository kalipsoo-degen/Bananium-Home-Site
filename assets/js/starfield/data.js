// Character data processing module
let characterData = [];
let filteredCharacters = [];

// Load character data from embedded JavaScript variable
function loadCharacterData() {
  try {
    // Use the embedded data directly from character-data.js
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
        id: 0,
        name: "Default Agent",
        image: "assets/images/agents/placeholder.jpg",
        description: "Agent data could not be loaded. Please check the browser console for errors.",
        homepage: "#",
        type: "common",
        power: 50,
        stats: {
          strength: 50,
          intelligence: 50,
          speed: 50,
          stamina: 50
        }
      }
    ];
    filteredCharacters = [...characterData];
    
    // Still try to fire event
    const event = new CustomEvent('charactersLoaded');
    window.dispatchEvent(event);
    
    return characterData;
  }
}

// Filter characters by name match
function filterCharacters(query) {
  if (!query) {
    filteredCharacters = [...characterData];
    return filteredCharacters;
  }
  
  const lowerQuery = query.toLowerCase();
  filteredCharacters = characterData.filter(character => 
    character.name.toLowerCase().includes(lowerQuery) ||
    character.description.toLowerCase().includes(lowerQuery) ||
    character.type.toLowerCase().includes(lowerQuery)
  );
  
  return filteredCharacters;
}

// Get character by ID
function getCharacterById(id) {
  return characterData.find(character => character.id === id);
}

// Get character by index
function getCharacterByIndex(index) {
  if (index < 0 || index >= characterData.length) {
    return null;
  }
  return characterData[index];
}

// Get random character
function getRandomCharacter() {
  const randomIndex = Math.floor(Math.random() * characterData.length);
  return characterData[randomIndex];
}

// Get all characters
function getAllCharacters() {
  return [...characterData];
}

// Get filtered characters
function getFilteredCharacters() {
  return [...filteredCharacters];
}

// Initialize characters immediately
document.addEventListener('DOMContentLoaded', () => {
  loadCharacterData();
});

// Call loadCharacterData immediately to avoid delay
loadCharacterData(); 