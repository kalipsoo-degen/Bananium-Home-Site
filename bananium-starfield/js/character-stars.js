// Character stars creation and management
const CharacterStars = {
  characterStars: null,
  hoveredStarIndex: -1,
  selectedStarIndex: -1,
  
  // Deterministic random number generator
  seededRandom: function(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  },
  
  // Create character stars
  createCharacterStars() {
    // Create circular texture for character stars
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    // Clear background to transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw circle with glow
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 4;
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, canvas.width / 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(220, 220, 255, 0.8)');
    gradient.addColorStop(0.7, 'rgba(180, 180, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(180, 180, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, canvas.width / 2, 0, Math.PI * 2);
    ctx.fill();
    
    const charStarTexture = new THREE.CanvasTexture(canvas);
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(characterData.length * 3);
    const sizes = new Float32Array(characterData.length);
    const colors = new Float32Array(characterData.length * 3);
    const originalSizes = new Float32Array(characterData.length);  // Store original sizes
    
    // Galaxy distribution parameters
    const maxRadius = 750;         // Maximum radius of galaxy
    const minRadius = 150;         // Increased minimum radius to push stars away from center (was 100)
    const verticalScale = 0.075;   // Controls the thickness of the galaxy disk
    const baseSizeRange = [15, 25]; // Base size range for character stars
    
    // Density control parameters
    const centerBias = 0.10;      // Reduced center bias for more evenness
    const centerCluster = 0.10;   // Fewer stars in central cluster
    const centerRadius = 400;     // Larger central region size for better spread (was 350)
    const minNonCentralDistance = 300; // Increased minimum distance for non-central stars (was 250)
    
    // Minimum distance between any two stars
    const MIN_STAR_DISTANCE = 50; // New parameter for minimum star separation
    
    // Create a deterministic sector-based distribution system
    const sectorCount = 10;  // Increased sectors for better distribution (was 8)
    const layerCount = 5;   // Increased layers for better radial distribution (was 4)
    
    // Keep track of placed stars for distance checking
    const placedStars = [];
    
    for (let i = 0; i < characterData.length; i++) {
      const i3 = i * 3;
      const character = characterData[i];
      
      // Generate deterministic values based on character name and index
      const nameSeed = this.hashString(character.name);
      const seed1 = nameSeed + (i * 0.1);
      const seed2 = nameSeed + (i * 0.3);
      const seed3 = nameSeed + (i * 0.7);
      const seed4 = nameSeed + (i * 1.1);
      
      // Try multiple positions until we find one with sufficient distance
      let positionFound = false;
      let attempts = 0;
      let position;
      
      while (!positionFound && attempts < 10) { // Limit attempts to prevent infinite loops
        // Deterministically assign stars to sectors and layers for even distribution
        // Add a slight variation based on attempt number to get different positions
        const sectorOffset = attempts * 0.05;
        const layerOffset = attempts * 0.03;
        const sector = Math.floor(this.seededRandom(seed1 + sectorOffset) * sectorCount);
        const layer = Math.floor(this.seededRandom(seed2 + layerOffset) * layerCount);
        
        let radius, angle;
        
        // Determine the radius based on the layer (more evenly spaced)
        // Use different layer boundaries based on attempt number
        const layerMin = minRadius + (layer * (maxRadius - minRadius) / layerCount) + attempts * 5;
        const layerMax = minRadius + ((layer + 1) * (maxRadius - minRadius) / layerCount) + attempts * 5;
        const layerRandom = this.seededRandom(seed3 + attempts * 0.02);
        
        // Use square root distribution within each layer for uniform density
        radius = layerMin + (layerMax - layerMin) * Math.sqrt(layerRandom);
        
        // Calculate angle within the assigned sector with increasing variation
        const sectorAngle = (sector / sectorCount) * Math.PI * 2;
        const sectorWidth = (Math.PI * 2) / sectorCount;
        angle = sectorAngle + sectorWidth * (this.seededRandom(seed4 + attempts * 0.1));
        
        // Add jitter that increases with attempts
        radius += (this.seededRandom(seed1 + 0.42 + attempts * 0.01) * 2 - 1) * (maxRadius - minRadius) * (0.05 + attempts * 0.01);
        angle += (this.seededRandom(seed2 + 0.42 + attempts * 0.01) * 2 - 1) * (0.1 + attempts * 0.02);
        
        // Calculate 3D position
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const verticalThickness = verticalScale * (maxRadius - radius) / maxRadius * maxRadius;
        const y = (this.seededRandom(seed4 + attempts * 0.03) * 2 - 1) * verticalThickness;
        
        position = { x, y, z };
        
        // Check if this position is far enough from all previously placed stars
        positionFound = true;
        for (let j = 0; j < placedStars.length; j++) {
          const otherStar = placedStars[j];
          const distanceSquared = 
            Math.pow(position.x - otherStar.x, 2) + 
            Math.pow(position.y - otherStar.y, 2) + 
            Math.pow(position.z - otherStar.z, 2);
          
          if (distanceSquared < MIN_STAR_DISTANCE * MIN_STAR_DISTANCE) {
            positionFound = false;
            break;
          }
        }
        
        attempts++;
      }
      
      // Use the position we found, or the last attempt if we couldn't find a good one
      positions[i3] = position.x;
      positions[i3 + 1] = position.y;
      positions[i3 + 2] = position.z;
      
      // Keep track of this star's position for future distance checks
      placedStars.push(position);
      
      // Size varies with distance but in a deterministic way
      const distanceRatio = 1 - (Math.sqrt(position.x*position.x + position.z*position.z) / maxRadius);
      const sizeVariation = this.seededRandom(seed3 + 0.5) * (baseSizeRange[1] - baseSizeRange[0]);
      const baseSize = baseSizeRange[0] + sizeVariation + (distanceRatio * 3);
      
      // Store sizes
      sizes[i] = baseSize;
      originalSizes[i] = baseSize;
      
      // Calculate color based on position and character's unique properties
      const distanceFromCenter = Math.sqrt(
        positions[i3] * positions[i3] + 
        positions[i3 + 2] * positions[i3 + 2]
      );
      
      // Create unique colors based on character name
      const nameCode = character.name.charCodeAt(0) || 65;
      
      // Generate unique hue based on index and name - deterministic
      const hue = ((i / characterData.length) + (nameCode / 255)) % 1.0;
      const saturation = 0.7 + (Math.sin(nameCode) * 0.3);
      // Increase brightness by 20%, clamping to max 1.0
      const baseBrightness = 0.6 + this.seededRandom(seed4 + 0.5) * 0.4;
      const brightness = Math.min(1.0, baseBrightness * 1.2);
      
      const color = Utils.hslToRgb(hue, saturation, brightness);
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.userData.originalSizes = originalSizes;  // Store for reference
    
    const material = new THREE.PointsMaterial({
      size: 20,
      map: charStarTexture,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    });
    
    this.characterStars = new THREE.Points(geometry, material);
    
    return this.characterStars;
  },
  
  // Hash a string to a number (for deterministic positioning)
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash) / 2147483647; // Normalize between 0 and 1
  },
  
  // Update character stars visibility based on search
  updateCharacterStarVisibility() {
    const geometry = this.characterStars.geometry;
    const sizes = geometry.attributes.size.array;
    const originalSizes = geometry.userData.originalSizes;
    
    for (let i = 0; i < characterData.length; i++) {
      const isVisible = filteredCharacters.includes(characterData[i]);
      sizes[i] = isVisible ? originalSizes[i] : 0.0; // Hide by setting size to 0
    }
    
    geometry.attributes.size.needsUpdate = true;
  },
  
  // Update star sizes (for hovering, selection, and pulsing)
  updateStarSizes(time) {
    const geometry = this.characterStars.geometry;
    const sizes = geometry.attributes.size.array;
    const originalSizes = geometry.userData.originalSizes;
    
    for (let i = 0; i < characterData.length; i++) {
      const isVisible = filteredCharacters.includes(characterData[i]);
      if (isVisible) {
        const isSelected = i === this.selectedStarIndex;
        const isHovered = i === this.hoveredStarIndex;
        let multiplier = 1;
        
        if (isSelected) {
          multiplier = CONFIG.SELECT_MULTIPLIER;
        } else if (isHovered) {
          multiplier = CONFIG.HOVER_MULTIPLIER;
        }
        
        const pulse = Math.sin(time + i) * 0.2 + 1;
        sizes[i] = originalSizes[i] * multiplier * pulse;
      } else {
        sizes[i] = 0;
      }
    }
    
    geometry.attributes.size.needsUpdate = true;
  },
  
  // Get world position of a specific star
  getStarWorldPosition(index) {
    if (!this.characterStars || index < 0 || index >= characterData.length) {
      return null;
    }
    
    const positions = this.characterStars.geometry.attributes.position;
    const starPosition = new THREE.Vector3(
      positions.array[index * 3],
      positions.array[index * 3 + 1],
      positions.array[index * 3 + 2]
    );
    
    // Transform position to world space
    starPosition.applyMatrix4(this.characterStars.matrixWorld);
    
    return starPosition;
  },
  
  // Reset star size
  resetStarSize(index) {
    if (index !== -1) {
      const sizes = this.characterStars.geometry.attributes.size.array;
      sizes[index] = this.characterStars.geometry.userData.originalSizes[index];
      this.characterStars.geometry.attributes.size.needsUpdate = true;
    }
  },
  
  // Set star as selected
  setSelectedStar(index) {
    // Reset previous selected star
    if (this.selectedStarIndex !== -1) {
      this.resetStarSize(this.selectedStarIndex);
    }
    
    this.selectedStarIndex = index;
    
    // Highlight newly selected star
    if (index !== -1) {
      const sizes = this.characterStars.geometry.attributes.size.array;
      sizes[index] = this.characterStars.geometry.userData.originalSizes[index] * CONFIG.SELECT_MULTIPLIER;
      this.characterStars.geometry.attributes.size.needsUpdate = true;
    }
  }
};