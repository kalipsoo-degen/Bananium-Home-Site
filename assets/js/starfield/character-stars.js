// Character Stars module
// Handles the creation and management of agent stars in the 3D space

const CharacterStars = {
  // Store all character star objects for reference
  stars: [],
  // Store character data alongside stars
  characterData: [],
  
  // Create all character stars from data
  createCharacterStars() {
    // Reset arrays
    this.stars = [];
    this.characterData = [];
    
    // Create group to hold all stars
    const starGroup = new THREE.Group();
    starGroup.name = 'characterStars';
    
    // Get characters from data module
    const characters = getAllCharacters();
    
    // Create stars for each character
    characters.forEach((character, index) => {
      // Create star object
      const { star, position } = this._createCharacterStar(character, index);
      
      // Add to group
      starGroup.add(star);
      
      // Store reference
      this.stars.push(star);
      this.characterData.push({
        character,
        position
      });
    });
    
    return starGroup;
  },
  
  // Create a single character star with geometry and material
  _createCharacterStar(character, index) {
    // Set position
    const angle = Math.random() * Math.PI * 2;
    const radius = getRandomInRange(
      CONFIG.CHARACTER_STAR_MIN_DISTANCE, 
      CONFIG.CHARACTER_STAR_MAX_DISTANCE
    );
    const y = getRandomInRange(-CONFIG.CHARACTER_STAR_Y_SPREAD, CONFIG.CHARACTER_STAR_Y_SPREAD);
    
    const position = {
      x: Math.cos(angle) * radius,
      y,
      z: Math.sin(angle) * radius
    };
    
    // Set star size based on character power level
    const powerFactor = character.power / 100 || 0.8;
    const starSize = CONFIG.CHARACTER_STAR_SIZE * (0.8 + powerFactor * 0.4);
    
    // Create star geometry
    const geometry = new THREE.SphereGeometry(
      starSize, 
      CONFIG.CHARACTER_STAR_SEGMENTS, 
      CONFIG.CHARACTER_STAR_SEGMENTS
    );
    
    // Create material with glow effect
    const color = new THREE.Color(Utils.getColorByType(character.type));
    
    // Create material with custom attributes
    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    
    // Create mesh
    const star = new THREE.Mesh(geometry, material);
    
    // Position the star
    star.position.set(position.x, position.y, position.z);
    
    // Add user data for interaction
    star.userData = {
      characterId: character.id,
      characterIndex: index,
      originalSize: starSize,
      pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
      pulseSpeed: 1 + Math.random() * 0.5,     // Random pulse speed
      originalPosition: {...position},          // Store original position for animations
      originalScale: 1,                        // Original scale for animations
      hovered: false                           // Track hover state
    };
    
    // Name the star for debugging
    star.name = `character-star-${character.id}`;
    
    return { star, position };
  },
  
  // Update star sizes with a pulsing effect
  updateStarSizes(time) {
    this.stars.forEach((star) => {
      // Skip if star is being hovered
      if (star.userData.hovered) return;
      
      // Calculate pulse factor
      const phase = star.userData.pulsePhase;
      const speed = star.userData.pulseSpeed;
      const pulseFactor = Math.sin(time * speed + phase) * 0.1 + 1;
      
      // Apply scale
      star.scale.set(pulseFactor, pulseFactor, pulseFactor);
    });
  },
  
  // Find the star mesh by character ID
  findStarById(characterId) {
    return this.stars.find(star => star.userData.characterId === characterId);
  },
  
  // Find the star mesh by index
  findStarByIndex(index) {
    return this.stars[index];
  },
  
  // Handle star hover effect
  setStarHover(star, isHovered) {
    if (!star) return;
    
    // Set the hover state
    star.userData.hovered = isHovered;
    
    // Apply hover effect
    if (isHovered) {
      // Increase size
      star.scale.set(1.3, 1.3, 1.3);
      
      // Increase glow/brightness
      star.material.emissive = star.material.color.clone();
      star.material.emissiveIntensity = 0.5;
      
    } else {
      // Reset to default
      star.scale.set(1, 1, 1);
      
      // Remove glow
      star.material.emissiveIntensity = 0;
    }
  },
  
  // Get all characters data with positions
  getCharactersWithPositions() {
    return this.characterData;
  }
}; 