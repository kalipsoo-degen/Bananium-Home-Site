// Configuration constants for Bananium Agents of Chaos
const CONFIG = {
  // Camera settings
  INITIAL_CAMERA_POSITION: { x: 0, y: 0, z: 1000 },
  
  // Galaxy settings
  GALAXY_SIZE: 1000,
  GALAXY_PARTICLES: 10000,
  GALAXY_RADIUS: 800,
  GALAXY_BRANCHES: 5,
  GALAXY_SPIN: 0.8,
  GALAXY_RANDOMNESS: 0.2,
  
  // Character star settings
  CHARACTER_STAR_SIZE: 20,
  CHARACTER_STAR_SEGMENTS: 24,
  CHARACTER_STAR_MIN_DISTANCE: 100,
  CHARACTER_STAR_MAX_DISTANCE: 600,
  CHARACTER_STAR_Y_SPREAD: 100,
  CHARACTER_HOVER_DISTANCE: 30,
  
  // Animation settings
  ROTATION_SPEED: 0.05,
  AUTO_ROTATION_SPEED: 0.001,
  CAMERA_LERP_FACTOR: 0.05,
  CAMERA_ZOOM_SPEED: 100,
  MIN_ZOOM: 300,
  MAX_ZOOM: 1500,
  
  // Colors
  CHARACTER_STAR_COLORS: [
    0xFFD700, // Gold - Legendary
    0xE0FFFF, // Light cyan - Rare
    0xDA70D6, // Orchid - Epic
    0x00BFFF, // Deep sky blue - Common
    0xFF6347, // Tomato - Special
    0x32CD32  // Lime green - Uncommon
  ],
  
  // Interaction parameters
  HOVER_DELAY: 200,
  CLICK_THROTTLE: 300,
  DOUBLE_CLICK_THRESHOLD: 300,
  
  // Galaxy background star colors
  GALAXY_COLORS: [
    { color: 0x9932CC, size: 1.0, ratio: 0.15 }, // Purple
    { color: 0xFFD700, size: 1.0, ratio: 0.1 }, // Gold
    { color: 0x4169E1, size: 1.0, ratio: 0.2 }, // Royal Blue
    { color: 0xFFFFFF, size: 0.8, ratio: 0.3 }, // White
    { color: 0xADD8E6, size: 0.7, ratio: 0.25 }  // Light Blue
  ]
}; 