// Main application module
// Initializes and runs the starfield application

const App = {
  // Three.js components
  scene: null,
  camera: null,
  renderer: null,
  
  // Objects in the scene
  starfield: null,
  characterStars: null,
  
  // Initialize the 3D scene
  init() {
    // --- Add check for canvas element --- 
    const canvas = document.getElementById('canvas');
    if (!canvas) {
        console.warn('Starfield canvas element with id "canvas" not found. Skipping starfield initialization.');
        // Optionally check for alternative ID if needed, e.g., 'starfield-canvas'
        // const alternativeCanvas = document.getElementById('starfield-canvas');
        // if (!alternativeCanvas) return; 
        // canvas = alternativeCanvas; // Use the alternative if found
        return; // Stop initialization if no canvas found
    }
    // --- End check --- 
    
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Add fog to the scene for depth
    const fogColor = 0x000000;
    this.scene.fog = new THREE.FogExp2(fogColor, 0.00025);
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      1, 
      5000 // Far plane for good distance rendering
    );
    this.camera.position.z = CONFIG.INITIAL_CAMERA_POSITION.z;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas, // Use the canvas variable we found
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
    
    // Create the galaxy and stars
    this.createScene();
    
    // Initialize UI and Animation systems
    UI.init();
    Animation.init();
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Start animation loop
    this.animate();
  },
  
  // Create scene elements
  createScene() {
    // Create galaxy starfield
    this.starfield = Starfield.createGalaxyStarfield();
    this.scene.add(this.starfield);
    
    // Create character stars
    this.characterStars = CharacterStars.createCharacterStars();
    this.scene.add(this.characterStars);
  },
  
  // Animation loop
  animate(timestamp) {
    // Keep the animation loop running
    requestAnimationFrame(this.animate.bind(this));
    
    // Update animation systems
    Animation.update(this.camera, this.starfield, this.characterStars);
    
    // Update star sizes with pulsing effect
    const time = timestamp * 0.001; // Convert to seconds
    CharacterStars.updateStarSizes(time);
    
    // Render the scene
    this.renderer.render(this.scene, this.camera);
  },
  
  // Handle window resize
  onWindowResize() {
    // Update camera aspect ratio
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    
    // Update renderer size
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
};

// Start the application when characters are loaded
window.addEventListener('charactersLoaded', () => {
  App.init();
});

// Fallback if the load event doesn't fire within 5 seconds
setTimeout(() => {
  if (!App.scene) {
    console.warn('Characters loading event not fired, initializing app anyway');
    App.init();
  }
}, 5000); 