// Utility functions for the starfield application

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function to limit function calls to once per wait period
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Get a random value between min and max
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Get a random integer between min and max (inclusive)
function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Calculate distance between two 3D points
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  const dz = (point1.z || 0) - (point2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

// Linear interpolation between two values
function lerp(start, end, amt) {
  return (1 - amt) * start + amt * end;
}

// Get color based on character type
function getColorByType(type) {
  switch(type.toLowerCase()) {
    case 'legendary':
      return 0xFFD700; // Gold
    case 'epic':
      return 0xDA70D6; // Orchid
    case 'rare':
      return 0xE0FFFF; // Light cyan
    case 'uncommon':
      return 0x32CD32; // Lime green
    case 'special':
      return 0xFF6347; // Tomato
    case 'common':
    default:
      return 0x00BFFF; // Deep sky blue
  }
}

// Create image placeholder for character without image
function createPlaceholderImage(character) {
  // Create a canvas
  const canvas = document.createElement('canvas');
  const size = 200;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Get color based on character type
  const color = getColorByType(character.type);
  const colorHex = '#' + color.toString(16).padStart(6, '0');
  
  // Fill background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, size, size);
  
  // Draw glow
  const gradient = ctx.createRadialGradient(size/2, size/2, 10, size/2, size/2, size/2);
  gradient.addColorStop(0, colorHex);
  gradient.addColorStop(1, 'transparent');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  
  // Draw character initial
  ctx.font = 'bold 80px Orbitron';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(character.name.charAt(0), size/2, size/2);
  
  // Add power level
  ctx.font = 'bold 24px Exo 2';
  ctx.fillText(`POW ${character.power}`, size/2, size/2 + 50);
  
  return canvas.toDataURL();
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Object to export
const Utils = {
  debounce,
  throttle,
  getRandomInRange,
  getRandomIntInRange,
  getDistance,
  lerp,
  getColorByType,
  createPlaceholderImage,
  formatNumber
}; 