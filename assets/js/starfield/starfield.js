// Starfield module - Handles the creation of the galaxy background

const Starfield = {
  // Create the starfield galaxy with spiral arms
  createGalaxyStarfield() {
    const particles = CONFIG.GALAXY_PARTICLES;
    const radius = CONFIG.GALAXY_RADIUS;
    const branches = CONFIG.GALAXY_BRANCHES;
    const spin = CONFIG.GALAXY_SPIN;
    const randomness = CONFIG.GALAXY_RANDOMNESS;
    
    // Create geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles * 3);
    const colors = new Float32Array(particles * 3);
    const sizes = new Float32Array(particles);
    
    // Create material with custom parameters
    const material = new THREE.PointsMaterial({
      size: 2.5,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });
    
    // Distribution parameters
    const innerRadius = radius * 0.1;
    const outerRadius = radius * 1.2;
    
    // Create star particles with positions, colors, and sizes
    for (let i = 0; i < particles; i++) {
      const i3 = i * 3;
      
      // Position
      // Get random radius between inner and outer
      const r = Math.pow(Math.random(), 2) * (outerRadius - innerRadius) + innerRadius;
      
      // Get random angle for spiral arm positioning
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      
      // Apply spin based on distance from center
      const spinAngle = r * spin;
      const totalAngle = branchAngle + spinAngle;
      
      // Add randomness to position
      const randomX = Math.pow(Math.random(), 3) * r * randomness * (Math.random() < 0.5 ? 1 : -1);
      const randomY = Math.pow(Math.random(), 3) * r * randomness * 0.5 * (Math.random() < 0.5 ? 1 : -1);
      const randomZ = Math.pow(Math.random(), 3) * r * randomness * (Math.random() < 0.5 ? 1 : -1);
      
      // Calculate final position
      positions[i3] = Math.cos(totalAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(totalAngle) * r + randomZ;
      
      // Color - use galaxy color palettes
      const galaxyColorIndex = Math.floor(Math.random() * CONFIG.GALAXY_COLORS.length);
      const colorConfig = CONFIG.GALAXY_COLORS[galaxyColorIndex];
      
      const color = new THREE.Color(colorConfig.color);
      
      // Mix colors based on distance from center for better gradient effect
      const mixFactor = r / outerRadius;
      color.lerp(new THREE.Color(0xffffff), mixFactor * 0.2);
      
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Size - make center stars slightly bigger
      const sizeModifier = Math.max(0.6, 1 - r / outerRadius) * colorConfig.size;
      sizes[i] = (0.5 + Math.random() * 1.5) * sizeModifier;
    }
    
    // Set attributes to geometry
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Create the final particle system
    const particleSystem = new THREE.Points(geometry, material);
    
    // Set name for reference
    particleSystem.name = 'galaxyStarfield';
    
    return particleSystem;
  }
}; 