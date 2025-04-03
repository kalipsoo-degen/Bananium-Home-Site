// Starfield generation and management
const Starfield = {
  starfield: null,
  
  // Create galaxy-shaped starfield with circular particles
  createGalaxyStarfield() {
    // Create circular texture for stars
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    
    // Draw circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 3;
    
    // Clear background to transparent
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw gradient circle with true transparency
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    const starTexture = new THREE.CanvasTexture(canvas);
    
    // Create geometry and material
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(CONFIG.STAR_COUNT * 3);
    const starColors = new Float32Array(CONFIG.STAR_COUNT * 3);
    const starSizes = new Float32Array(CONFIG.STAR_COUNT);
    
    // Spiral galaxy parameters
    const arms = 3;
    const armWidth = 0.5;
    const revolutions = 3;
    const randomness = 0.15;
    const verticalThickness = 0.1;
    
    for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
      const i3 = i * 3;
      
      // Calculate position in galaxy
      let radius, theta;
      
      // Central bulge (20% of stars)
      if (i < CONFIG.STAR_COUNT * 0.2) {
        // Central bulge with gaussian distribution
        radius = Math.random() * Math.random() * 200;
        theta = Math.random() * Math.PI * 2;
      } 
      // Spiral arms (80% of stars)
      else {
        radius = 200 + Math.random() * 600;
        
        // Choose which arm
        const arm = Math.floor(Math.random() * arms);
        
        // Base angle from arm
        const armAngle = (arm / arms) * Math.PI * 2;
        
        // Distance along arm
        const radiusRatio = radius / 800;
        
        // Angle based on logarithmic spiral
        theta = armAngle + (radiusRatio * revolutions * Math.PI * 2);
        
        // Add randomness to the angle
        theta += (Math.random() * armWidth - armWidth/2) * (1 - Math.pow(radiusRatio, 2));
      }
      
      // Convert polar to cartesian coordinates
      starPositions[i3] = radius * Math.cos(theta);
      starPositions[i3 + 1] = (Math.random() * 2 - 1) * verticalThickness * radius;
      starPositions[i3 + 2] = radius * Math.sin(theta);
      
      // Add random offset
      starPositions[i3] += (Math.random() * 2 - 1) * randomness * radius;
      starPositions[i3 + 1] += (Math.random() * 2 - 1) * randomness * radius;
      starPositions[i3 + 2] += (Math.random() * 2 - 1) * randomness * radius;
      
      // Assign star colors - hotter in center, cooler in outer regions
      const distanceFromCenter = Math.sqrt(
        starPositions[i3] * starPositions[i3] + 
        starPositions[i3 + 2] * starPositions[i3 + 2]
      );
      
      // Calculate angle from center for color variation
      const angle = Math.atan2(starPositions[i3 + 2], starPositions[i3]);
      
      // Use angle and distance to create varied colors
      const hue = (angle / (Math.PI * 2) + Math.random() * 0.2) % 1.0;
      const saturation = 0.5 + Math.random() * 0.5;
      // Increase base brightness by 20%, clamping to max 1.0
      const baseBrightness = 0.7 + Math.random() * 0.3;
      const increasedBrightness = Math.min(1.0, baseBrightness * 1.2);
      
      // Convert HSL to RGB with varied temperature based on region, but keep overall brightness higher
      const color = Utils.hslToRgb(
        hue,
        saturation * (1 - distanceFromCenter / 1000),
        // Apply the distance dimming to the already brighter value
        increasedBrightness * (1 - distanceFromCenter / 1500)
      );
      
      starColors[i3] = color.r;
      starColors[i3 + 1] = color.g;
      starColors[i3 + 2] = color.b;
      
      // Star size varies with distance and random factor
      starSizes[i] = (1 - distanceFromCenter / 800) * 3 + Math.random() * 2;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.PointsMaterial({
      size: 5,
      map: starTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    this.starfield = new THREE.Points(starGeometry, starMaterial);
    
    return this.starfield;
  }
};
