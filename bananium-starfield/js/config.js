const CONFIG = {
  // Animation and movement
  ROTATION_SPEED: 0.000095,           // Speed of galaxy rotation
  DRAG_ROTATION_SPEED: 0.001,         // Speed when manually dragging
  CAMERA_ANIMATION_DURATION: 1200,
  INITIAL_CAMERA_POSITION: { x: 0, y: 800, z: 1200 },
  
  // Star appearance
  BASE_STAR_SIZE: 20,
  HOVER_MULTIPLIER: 2,
  SELECT_MULTIPLIER: 2.5,
  STAR_COUNT: 5000, // Background stars count
  
  // Camera zoom ranges - adjusted for consistency
  GALAXY_ZOOM_RANGE: { min: 400, max: 1600 },
  STAR_ZOOM_RANGE: { min: 80, max: 500 },
  
  // Transition settings
  TRANSITION: {
    DURATION: 1000,
    CURVE: {
      START: 0.3,
      END: 0.7
    }
  }
};
