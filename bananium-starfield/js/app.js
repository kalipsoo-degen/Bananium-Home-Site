// Main application
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
    // Don't disable scrolling on the main page
    if (window.location.pathname.includes('agents-of-chaos')) {
        document.body.style.overflow = 'hidden';
    } else {
        // Ensure scrolling is enabled for main page
        document.body.style.overflow = 'auto';
    }
    
    // Initialize THREE.js components
    this.initThree();
    
    // Only continue if initialization was successful
    if (!this.renderer) return;
    
    // Initialize the stars
    this.initStars();
  },
  
  // Initialize THREE.js components
  initThree() {
    // Scene setup
    this.scene = new THREE.Scene();
    
    // Add fog to the scene
    const fogColor = 0x000000;
    this.scene.fog = new THREE.FogExp2(fogColor, 0.00025);
    
    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      1, // Increased near plane
      5000 // Increased far plane for better distance rendering
    );
    this.camera.position.z = CONFIG.INITIAL_CAMERA_POSITION.z;
    
    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: document.getElementById('canvas'), 
      antialias: true,
      alpha: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0x000000, 1);
  },
  
  // Initialize the stars
  initStars() {
    // Create stars
    this.createScene();
    
    // Initialize UI and Animation systems
    UI.init();
    Animation.init();
    
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
