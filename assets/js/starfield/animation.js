// Animation Module
// Handles camera movements and animations in the 3D scene

const Animation = {
  // State variables
  targetCameraPosition: null,
  targetLookAt: null,
  isAnimating: false,
  autoRotate: true,
  cameraDistance: CONFIG.INITIAL_CAMERA_POSITION.z,
  rotationAngle: 0,
  
  // Initialize animation system
  init() {
    // Set initial camera position
    this.targetCameraPosition = new THREE.Vector3(
      CONFIG.INITIAL_CAMERA_POSITION.x,
      CONFIG.INITIAL_CAMERA_POSITION.y,
      CONFIG.INITIAL_CAMERA_POSITION.z
    );
    
    // Set initial look at position (origin)
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    
    // Start with auto-rotation enabled
    this.autoRotate = true;
  },
  
  // Update camera position and rotation each frame
  update(camera, starfield, characterStars) {
    // Auto-rotation when no specific target
    if (this.autoRotate) {
      this._updateAutoRotation(camera);
      return;
    }
    
    // Skip if no target position
    if (!this.targetCameraPosition || !this.targetLookAt) return;
    
    // Smoothly move camera to target position
    camera.position.lerp(this.targetCameraPosition, CONFIG.CAMERA_LERP_FACTOR);
    
    // Create a temporary vector for look at interpolation
    const currentLookAt = new THREE.Vector3();
    currentLookAt.copy(this.targetLookAt);
    
    // Make camera look at the target position
    camera.lookAt(currentLookAt);
    
    // Check if camera has reached the target
    if (camera.position.distanceTo(this.targetCameraPosition) < 0.1) {
      this.isAnimating = false;
    }
  },
  
  // Focus camera on a specific star
  focusOnStar(star) {
    if (!star) return;
    
    // Disable auto-rotation
    this.autoRotate = false;
    
    // Get star position
    const starPosition = new THREE.Vector3();
    star.getWorldPosition(starPosition);
    
    // Create a position slightly offset from the star
    const distance = CONFIG.CHARACTER_STAR_HOVER_DISTANCE;
    const direction = new THREE.Vector3().subVectors(starPosition, new THREE.Vector3(0, 0, 0)).normalize();
    
    this.targetCameraPosition = new THREE.Vector3()
      .copy(starPosition)
      .add(direction.multiplyScalar(distance));
    
    // Set look at position to the star
    this.targetLookAt = starPosition;
    
    // Mark as animating
    this.isAnimating = true;
  },
  
  // Reset camera to default overview position
  resetCamera() {
    // Calculate default position
    const defaultPosition = new THREE.Vector3(
      Math.sin(this.rotationAngle) * this.cameraDistance,
      CONFIG.INITIAL_CAMERA_POSITION.y,
      Math.cos(this.rotationAngle) * this.cameraDistance
    );
    
    // Set target position and look at
    this.targetCameraPosition = defaultPosition;
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    
    // Enable auto-rotation again
    this.autoRotate = true;
    
    // Mark as animating
    this.isAnimating = true;
  },
  
  // Handle zooming with mouse wheel
  handleZoom(deltaY) {
    // Skip if focusing on a star
    if (this.isAnimating && !this.autoRotate) return;
    
    // Calculate new distance
    const zoomSpeed = CONFIG.CAMERA_ZOOM_SPEED;
    const direction = deltaY > 0 ? 1 : -1;
    
    // Update camera distance
    this.cameraDistance += direction * zoomSpeed;
    
    // Clamp to min/max zoom
    this.cameraDistance = Math.max(CONFIG.MIN_ZOOM, Math.min(CONFIG.MAX_ZOOM, this.cameraDistance));
    
    // Calculate new position
    const newPosition = new THREE.Vector3(
      Math.sin(this.rotationAngle) * this.cameraDistance,
      CONFIG.INITIAL_CAMERA_POSITION.y,
      Math.cos(this.rotationAngle) * this.cameraDistance
    );
    
    // Update target position
    this.targetCameraPosition = newPosition;
  },
  
  // Update auto-rotation animation
  _updateAutoRotation(camera) {
    // Update rotation angle
    this.rotationAngle += CONFIG.AUTO_ROTATION_SPEED;
    
    // Calculate new position
    const x = Math.sin(this.rotationAngle) * this.cameraDistance;
    const z = Math.cos(this.rotationAngle) * this.cameraDistance;
    const y = camera.position.y;
    
    // Update camera position
    camera.position.set(x, y, z);
    
    // Make camera look at the center
    camera.lookAt(0, 0, 0);
  }
}; 