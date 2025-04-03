// Animation handling
const Animation = {
  isAnimating: false,
  animationStartTime: 0,
  startCameraPosition: { x: 0, y: 0, z: 0 },
  targetCameraPosition: { x: 0, y: 0, z: 0 },
  currentFocusPoint: { x: 0, y: 0, z: 0 },
  isStarSelected: false,
  
  // Camera orientation tracking
  cameraRotation: new THREE.Quaternion(),
  targetQuaternion: new THREE.Quaternion(),
  rotationMatrix: new THREE.Matrix4(),
  currentLookAtPoint: new THREE.Vector3(0, 0, 0),
  targetLookAtPoint: new THREE.Vector3(0, 0, 0),
  startLookAtPoint: new THREE.Vector3(0, 0, 0),
  currentUpVector: new THREE.Vector3(0, 1, 0),
  targetUpVector: new THREE.Vector3(0, 1, 0),
  currentCameraDirection: new THREE.Vector3(),
  
  // Zoom settings
  currentZoomRange: null,
  currentZoom: 0,
  
  // Two-phase animation
  transitionPhase: 0, // 0: not transitioning, 1: zoom phase, 2: rotate phase
  zoomProgress: 0,
  rotateDelayFactor: 0.7, // Increased to zoom out more before rotating (was 0.5)
  
  // Add rotation speed tracking
  maxRotationAngle: Math.PI * 2, // Maximum rotation in radians
  rotationSpeed: 0.03, // Reduced for smoother rotation
  minRotationSpeed: 0.005, // Minimum rotation speed to prevent stopping completely
  rotationDamping: 0.95, // Damping factor to prevent overshooting
  lastRotationDirection: new THREE.Quaternion(), // Track last rotation direction
  startQuaternion: new THREE.Quaternion(), // Store starting orientation
  finalQuaternion: new THREE.Quaternion(), // Initialize finalQuaternion
  
  // Initialize animation settings
  init() {
    this.currentZoomRange = { ...CONFIG.GALAXY_ZOOM_RANGE };
    this.currentZoom = CONFIG.GALAXY_ZOOM_RANGE.min;
  },
  
  // Helper function to animate camera
  animateCamera(startPos, endPos, progress, camera) {
    // Calculate interpolation progress
    const smoothProgress = Utils.easing.smoothstep(0, 1, progress);
    const easedProgress = Utils.easing.bezierInterpolation(
      0, CONFIG.TRANSITION.CURVE.START, CONFIG.TRANSITION.CURVE.END, 1,
      smoothProgress
    );
    
    // Calculate new camera position with arc
    const newPos = new THREE.Vector3();
    newPos.lerpVectors(
      new THREE.Vector3(startPos.x, startPos.y, startPos.z),
      new THREE.Vector3(endPos.x, endPos.y, endPos.z),
      easedProgress
    );
    
    // Add smooth arc to camera movement (smaller arc for star-to-star transitions)
    const arcHeight = this.isStarToStarTransition ? 10 : 25;
    const arc = Math.sin(easedProgress * Math.PI) * arcHeight;
    newPos.y += arc;
    
    // Calculate target look-at points for orientation
    let lookAtPoint = new THREE.Vector3();
    
    // For galaxy transition, handle the phased look-at
    if (this.transitionPhase > 0) {
      this.zoomProgress = easedProgress;
      
      // Begin looking at galaxy center immediately but with gradual influence
      // Use a custom curve that starts slow and accelerates
      // This creates a more natural "turning to look at galaxy" effect
      let lookAtProgress;
      
      if (this.transitionType === 'star-to-galaxy') {
        // Start blending immediately with subtle curve
        // Use easedProgress directly but with a curve that emphasizes 
        // star at beginning and galaxy center at end
        lookAtProgress = Math.pow(easedProgress, 2); // Square curve for slower start
      } else {
        // For other transitions, use the original delay approach
        if (this.zoomProgress > this.rotateDelayFactor) {
          lookAtProgress = (this.zoomProgress - this.rotateDelayFactor) / (1 - this.rotateDelayFactor);
          lookAtProgress = Math.min(1.0, lookAtProgress);
        } else {
          lookAtProgress = 0;
        }
      }
      
      // Interpolate between star focus point and galaxy center
      lookAtPoint.lerpVectors(
        this.startLookAtPoint, 
        this.targetLookAtPoint, 
        lookAtProgress
      );
      this.currentLookAtPoint.copy(lookAtPoint);
    } else {
      lookAtPoint.copy(this.targetLookAtPoint);
    }
    
    // Calculate desired orientation as quaternion
    const lookAtMatrix = new THREE.Matrix4();
    lookAtMatrix.lookAt(newPos, lookAtPoint, this.currentUpVector);
    const targetQuat = new THREE.Quaternion();
    targetQuat.setFromRotationMatrix(lookAtMatrix);
    
    // Apply linear rotation speed with damping
    const angle = camera.quaternion.angleTo(targetQuat);
    
    if (angle > 0.001) { // Only rotate if the angle is significant
      // Dynamically calculate rotation step based on context
      let rotationStep;
      
      if (this.transitionPhase > 0 && this.transitionType === 'star-to-galaxy') {
        // For star-to-galaxy, use variable rotation speed based on progress
        // Slower at start (staying oriented toward star) and faster as we zoom out
        rotationStep = 0.005 + (easedProgress * 0.02); // Gradually increase rotation speed
      } else {
        // For other transitions use the existing approach
        const progressFactor = 4 * progress * (1 - progress); // Peaks at 0.5
        rotationStep = this.rotationSpeed * progressFactor;
        rotationStep = Math.max(this.minRotationSpeed, rotationStep);
        rotationStep = Math.min(rotationStep, angle * 0.5);
      }
      
      // Apply rotation
      camera.quaternion.rotateTowards(targetQuat, rotationStep);
    }
    
    // Update camera position
    camera.position.copy(newPos);
  },
  
  // Update rotation center
  updateRotationCenter(position) {
    this.currentFocusPoint = position;
    this.targetLookAtPoint.copy(position);
  },
  
  // Set up transition to selected star
  setupStarTransition(starIndex, camera) {
    this.isStarSelected = true;
    this.transitionPhase = 0; // Reset transition phase
    
    const starWorldPosition = CharacterStars.getStarWorldPosition(starIndex);
    if (!starWorldPosition) return;
    
    this.currentZoomRange = CONFIG.STAR_ZOOM_RANGE;
    this.currentZoom = this.currentZoomRange.min;
    
    this.updateRotationCenter(starWorldPosition);
    
    this.isAnimating = true;
    this.animationStartTime = Date.now();
    this.startCameraPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    
    const distanceToStar = CONFIG.STAR_ZOOM_RANGE.min; 
    const zoomDirection = new THREE.Vector3().subVectors(this.currentFocusPoint, camera.position).normalize();

    this.targetCameraPosition = {
      x: starWorldPosition.x - distanceToStar * zoomDirection.x,
      y: starWorldPosition.y - distanceToStar * zoomDirection.y,
      z: starWorldPosition.z - distanceToStar * zoomDirection.z
    };
    
    // Store the initial camera quaternion for linear rotation
    this.startQuaternion.copy(camera.quaternion);
  },
  
  // Set up transition back to galaxy view
  setupGalaxyTransition(camera) {
    this.isStarSelected = false;
    this.transitionPhase = 1; // Use phased transition for star-to-galaxy
    this.transitionType = 'star-to-galaxy';
    
    this.currentZoomRange = CONFIG.GALAXY_ZOOM_RANGE;
    this.currentZoom = CONFIG.GALAXY_ZOOM_RANGE.max;
    
    // Keep track of the current star position for phased transition
    this.startLookAtPoint = this.currentLookAtPoint.clone();
    
    // Set target look-at to galaxy center, but don't change current look-at yet
    this.targetLookAtPoint = new THREE.Vector3(0, 0, 0);
    
    // Calculate direction from current star outward
    const directionFromStar = new THREE.Vector3()
      .subVectors(camera.position, this.currentLookAtPoint)
      .normalize();
    
    this.isAnimating = true;
    this.animationStartTime = Date.now();
    this.startCameraPosition = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z
    };
    
    // Store initial quaternion for smooth transition
    this.startQuaternion.copy(camera.quaternion);
    
    // Set target position by extending outward from the star in the FULL distance
    // This makes the camera back away from the star to the far side of the galaxy
    this.targetCameraPosition = {
      x: this.startLookAtPoint.x + directionFromStar.x * this.currentZoom,
      y: this.startLookAtPoint.y + directionFromStar.y * this.currentZoom,
      z: this.startLookAtPoint.z + directionFromStar.z * this.currentZoom
    };
    
    // Calculate the final orientation quaternion for galaxy view
    const lookAtMatrix = new THREE.Matrix4();
    lookAtMatrix.lookAt(
      new THREE.Vector3(this.targetCameraPosition.x, this.targetCameraPosition.y, this.targetCameraPosition.z),
      new THREE.Vector3(0, 0, 0),
      this.currentUpVector
    );
    this.finalQuaternion.setFromRotationMatrix(lookAtMatrix);
  },
  
  // Apply galaxy rotation
  applyGalaxyRotation(starfield, characterStars, camera) {
    if (!this.isAnimating && !UI.isDragging) {
      const rotationSpeed = CONFIG.ROTATION_SPEED;
      
      if (this.isStarSelected) {
        // Get vector from focus point to camera
        const cameraOffset = new THREE.Vector3().subVectors(camera.position, this.currentFocusPoint);
        
        // Apply rotation to camera position
        const rotationMatrix = new THREE.Matrix4().makeRotationY(rotationSpeed);
        cameraOffset.applyMatrix4(rotationMatrix);
        
        // Update camera position while maintaining offset
        camera.position.copy(this.currentFocusPoint).add(cameraOffset);
        
        // Calculate ideal look-at orientation using quaternions
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(camera.position, this.currentFocusPoint, this.currentUpVector);
        const targetQuat = new THREE.Quaternion();
        targetQuat.setFromRotationMatrix(lookAtMatrix);
        
        // Apply very gentle rotation to prevent jitter
        const angle = camera.quaternion.angleTo(targetQuat);
        if (angle > 0.001) {
          // Use an even smaller rotation step for regular rotation
          camera.quaternion.rotateTowards(targetQuat, 0.01);
        }
      } else {
        // Regular galaxy rotation
        starfield.rotation.y += rotationSpeed;
        characterStars.rotation.y += rotationSpeed;
        
        // Continue smooth look-at interpolation with linear speed
        this.currentLookAtPoint.lerp(this.targetLookAtPoint, 0.01); // Much gentler
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(camera.position, this.currentLookAtPoint, this.currentUpVector);
        const targetQuat = new THREE.Quaternion();
        targetQuat.setFromRotationMatrix(lookAtMatrix);
        
        // Apply very gentle rotation to avoid jitter
        const angle = camera.quaternion.angleTo(targetQuat);
        if (angle > 0.001) {
          camera.quaternion.rotateTowards(targetQuat, 0.01);
        }
      }
    }
  },
  
  // Helper method to update camera look-at with linear speed
  updateCameraLookAt(camera, interpolationFactor) {
    // Early return if target is same as current
    if (this.currentLookAtPoint.equals(this.targetLookAtPoint)) {
      return;
    }
    
    // Use a very gentle interpolation factor
    const gentleFactor = Math.min(0.01, interpolationFactor); // Even gentler
    
    // Interpolate look-at point
    this.currentLookAtPoint.lerp(this.targetLookAtPoint, gentleFactor);
    
    // Update camera orientation
    const lookAtMatrix = new THREE.Matrix4();
    lookAtMatrix.lookAt(camera.position, this.currentLookAtPoint, this.currentUpVector);
    const targetQuaternion = new THREE.Quaternion();
    targetQuaternion.setFromRotationMatrix(lookAtMatrix);
    
    // Apply rotation with very gentle linear speed
    const angle = camera.quaternion.angleTo(targetQuaternion);
    if (angle > 0.001) {
      camera.quaternion.rotateTowards(targetQuaternion, 0.01);
    }
  },
  
  // Update animation
  update(camera, starfield, characterStars) {
    // Handle camera animation
    if (this.isAnimating) {
      // Use consistent animation duration with adjustments for transition types
      let duration = CONFIG.CAMERA_ANIMATION_DURATION;
      
      // Adjust duration based on transition type
      if (this.transitionType === 'star-to-star') {
        // Faster for star-to-star
        duration *= 0.8;
      } else if (this.transitionType === 'star-to-galaxy') {
        // Slightly longer for star-to-galaxy
        duration *= 1.25;
      }
      
      const progress = Math.min(1, (Date.now() - this.animationStartTime) / duration);
      this.animateCamera(
        this.startCameraPosition,
        this.targetCameraPosition,
        progress,
        camera
      );
      
      if (progress === 1) {
        this.isAnimating = false;
        this.transitionPhase = 0;
        
        // Store final direction for smooth transitions
        camera.getWorldDirection(this.currentCameraDirection);
        
        // If we returned to galaxy view, make sure focus point is center
        if (!this.isStarSelected) {
          this.updateRotationCenter(new THREE.Vector3(0, 0, 0));
        }
        
        // Ensure we're settled into the target position
        const lookAtMatrix = new THREE.Matrix4();
        lookAtMatrix.lookAt(camera.position, this.targetLookAtPoint, this.currentUpVector);
        const finalQuat = new THREE.Quaternion();
        finalQuat.setFromRotationMatrix(lookAtMatrix);
        camera.quaternion.copy(finalQuat);
      }
    } else {
      this.applyGalaxyRotation(starfield, characterStars, camera);
    }
  }
};
