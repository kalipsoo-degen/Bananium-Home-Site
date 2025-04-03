// Color and animation utils
const Utils = {
  // Convert HSL to RGB for star colors
  hslToRgb(h, s, l) {
    let r, g, b;
    
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return { r, g, b };
  },

  // Easing functions
  easing: {
    // Bezier curve interpolation
    bezierInterpolation(p0, p1, p2, p3, t) {
      const oneMinusT = 1 - t;
      return (
        p0 * oneMinusT * oneMinusT * oneMinusT +
        p1 * 3 * oneMinusT * oneMinusT * t +
        p2 * 3 * oneMinusT * t * t +
        p3 * t * t * t
      );
    },

    // Smoothstep interpolation
    smoothstep(min, max, value) {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    },

    // Cubic easing for animations
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
  },

  // Generate a SVG data URI for placeholder images
  generatePlaceholderSVG(name) {
    // Extract initials
    const initials = name.split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
    
    // Generate a deterministic hue based on the character name
    const hue = this.hashString(name) % 360;
    const bgColor = `hsl(${hue}, 60%, 40%)`;
    
    // Create SVG with 1:1 aspect ratio (square)
    const size = 300; // Square dimensions
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <rect width="${size}" height="${size}" fill="${bgColor}"/>
      <text x="${size/2}" y="${size/2}" font-family="Arial" font-size="60" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
    </svg>`;
    
    return 'data:image/svg+xml;base64,' + btoa(svg);
  },
  
  // Hash a string to a number (for deterministic color generation)
  hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  },
  
  // Load an image with fallback to placeholder
  loadImageWithFallback(imageUrl, name, callback) {
    const img = new Image();
    
    // Try to load the specified image
    img.onload = function() {
      callback(imageUrl);
    };
    
    // If image fails, use placeholder
    img.onerror = function() {
      // Generate SVG placeholder with character's initials
      const placeholder = Utils.generatePlaceholderSVG(name);
      callback(placeholder);
    };
    
    // Start loading image
    img.src = imageUrl;
  }
};
