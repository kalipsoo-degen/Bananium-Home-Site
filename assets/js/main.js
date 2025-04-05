/**
 * BANANIUM MAXIMUS - Main Entry Point
 */

// DOM elements
const navbar = document.getElementById('main-navbar');
const enterArenaBtn = document.getElementById('enter-arena-btn');
const aboutSection = document.getElementById('about');
const muteButton = document.getElementById('mute-button');
// Get the audio element we added to the HTML
const backgroundMusic = document.getElementById('background-music');
let isMuted = true;

// Function to prevent scrolling before entering the arena
function preventScroll(e) {
  if (!document.body.classList.contains('scrolling-enabled')) {
    e.preventDefault();
    return false;
  }
}

// Add event listeners to prevent scrolling initially
document.addEventListener('wheel', preventScroll, { passive: false });
document.addEventListener('touchmove', preventScroll, { passive: false });

// Function to handle enter arena click
function handleEnterArena(e) {
  e.preventDefault();
  
  // Enable scrolling by adding the class to body
  document.body.classList.add('scrolling-enabled');
  
  // Also update these critical CSS properties directly
  document.body.style.overflow = 'auto';
  document.body.style.position = 'relative';
  document.body.style.height = 'auto';
  document.body.style.maxHeight = 'none';
  
  // Remove scroll prevention event listeners
  document.removeEventListener('wheel', preventScroll, { passive: false });
  document.removeEventListener('touchmove', preventScroll, { passive: false });
  document.removeEventListener('keydown', preventKeyboardScroll, false);
  
  // Show navbar with a simple fade-in
  if (navbar) {
    navbar.classList.add('visible');
  }
  
  // Make sure the mute button is visible
  if (muteButton) {
    muteButton.style.display = 'flex';
  }
  
  // Try to initialize audio on user interaction and play it unmuted
  if (backgroundMusic) {
    console.log("Attempting to play audio on Enter the Arena click");
    
    // Force reload the audio to ensure it's ready
    backgroundMusic.load();
    
    // Set audio properties
    backgroundMusic.loop = false;
    backgroundMusic.volume = 0.7;
    backgroundMusic.muted = false; // Set to unmuted
    isMuted = false; // Update muted state
    
    // Update the mute button to show volume icon
    if (muteButton) {
      muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    }
    
    // Give the audio a moment to initialize
    setTimeout(() => {
      // Try to play the audio
      const playPromise = backgroundMusic.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          console.log('Audio playing successfully!');
        }).catch(error => {
          console.log('Auto-play prevented:', error);
          // If autoplay is blocked, show message to click mute button
          backgroundMusic.muted = true;
          isMuted = true;
          if (muteButton) {
            muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
            
            // Make the button pulse to draw attention
            muteButton.style.animation = 'pulse-button 1s infinite';
          }
        });
      }
    }, 100); // Short delay to ensure audio is loaded
  } else {
    console.error("No audio element found with id 'background-music'");
  }
  
  // Scroll to the about section if it exists
  if (aboutSection) {
    aboutSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add history entry for proper back button behavior
    history.pushState(null, null, '#about');
  }
}

// Prevent keyboard scrolling (arrow keys, spacebar, page up/down)
function preventKeyboardScroll(e) {
  // If scrolling is not enabled yet
  if (!document.body.classList.contains('scrolling-enabled')) {
    const keys = [32, 33, 34, 35, 36, 37, 38, 39, 40]; // Space, PageUp, PageDown, End, Home, Left, Up, Right, Down
    if (keys.includes(e.keyCode)) {
      e.preventDefault();
      return false;
    }
  }
}

// Add keyboard scroll prevention
document.addEventListener('keydown', preventKeyboardScroll, false);

// Function to toggle music
function toggleMusic() {
  if (!backgroundMusic) {
    console.log('Audio element not found');
    return;
  }
  
  try {
    // Toggle muted state
    isMuted = !isMuted;
    
    if (!isMuted) {
      // Ensure the audio is loaded
      backgroundMusic.load();
      
      // Unmute and try to play
      backgroundMusic.muted = false;
      
      // Try a few different approaches to play (for different browsers)
      try {
        // Try the standard method first
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            // Success - update icon
            muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            console.log('Audio playing successfully');
          }).catch(err => {
            // Try alternative method
            console.log('First play attempt failed, trying alternative:', err);
            // Create a user interaction to help with autoplay policies
            document.body.addEventListener('click', function playAudioOnce() {
              backgroundMusic.play().catch(e => console.error('Even with click, failed:', e));
              document.body.removeEventListener('click', playAudioOnce);
            }, { once: true });
            
            // Keep showing unmuted icon to indicate we're trying
            muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          });
        } else {
          // If promise is undefined (old browsers)
          muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
      } catch (playError) {
        console.error('Play error in try/catch:', playError);
        // Still show unmuted icon to not confuse user
        muteButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      }
    } else {
      // Mute but don't pause - just silence it
      backgroundMusic.muted = true;
      muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
  } catch (e) {
    console.error('Error toggling audio:', e);
  }
}

// Check if this is the first visit or a direct link to a section
function checkInitialState() {
  // If there's a hash in the URL (direct link to a section)
  if (window.location.hash) {
    // Show navbar immediately
    navbar.classList.add('visible');
    
    // Enable scrolling since we're bypassing the landing page
    document.body.classList.add('scrolling-enabled');
    
    // Remove scroll prevention event listeners
    document.removeEventListener('wheel', preventScroll, { passive: false });
    document.removeEventListener('touchmove', preventScroll, { passive: false });
    
    // Scroll to the target section after a slight delay
    setTimeout(() => {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        targetElement.scrollIntoView();
      }
    }, 100);
  }
  // Otherwise, this is the landing page view
}

// Initialize scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Directly create or update audio element for maximum compatibility
  if (backgroundMusic) {
    // Set specific source directly if needed
    if (!backgroundMusic.querySelector('source[src]')) {
      console.log("No source elements found, creating one");
      const source = document.createElement('source');
      source.src = 'assets/audio/bananas.mp3';
      source.type = 'audio/mpeg';
      backgroundMusic.appendChild(source);
    }
    
    console.log("Audio sources available:", 
      Array.from(backgroundMusic.querySelectorAll('source'))
        .map(s => s.src)
    );
    
    // Set to play only once (not loop)
    backgroundMusic.loop = false;
    
    // Preload audio
    backgroundMusic.load();
    
    // Add event listener for when audio ends
    backgroundMusic.addEventListener('ended', () => {
      console.log('Audio playback complete');
      // Reset button state when audio ends
      isMuted = true;
      if (muteButton) {
        muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      }
    });
    
    // Add event listeners for audio
    backgroundMusic.addEventListener('canplay', () => {
      console.log("Audio can play!");
    });
    
    // Log audio capabilities
    console.log('Audio formats supported:', {
      mp3: backgroundMusic.canPlayType('audio/mpeg') || 'no',
      wav: backgroundMusic.canPlayType('audio/wav') || 'no'
    });
    
    // Monitor audio load state
    backgroundMusic.addEventListener('canplaythrough', () => {
      console.log('Audio loaded and ready!');
    });
    
    // Handle errors
    backgroundMusic.addEventListener('error', (e) => {
      console.error("Audio error event:", e);
    });
  } else {
    console.error("Audio element not found!");
  }
  
  // Check initial state
  checkInitialState();
  
  // Init animations
  initScrollAnimations();
  
  // Set up the mute button with muted icon
  if (muteButton) {
    muteButton.style.display = 'flex';
    muteButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    muteButton.addEventListener('click', toggleMusic);
  } else {
    console.error('Mute button not found in the DOM');
  }
  
  // Add event listener for enter arena button
  if (enterArenaBtn) {
    enterArenaBtn.addEventListener('click', handleEnterArena);
  } else {
    console.error('Enter arena button not found in the DOM');
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
      
      // Toggle aria-expanded for accessibility
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      
      // Toggle icon between bars and times
      const icon = this.querySelector('i');
      if (icon) {
        if (icon.classList.contains('fa-bars')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          e.target !== mobileMenuToggle && 
          !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        
        // Reset icon
        const icon = mobileMenuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinkItems = navLinks.querySelectorAll('a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          mobileMenuToggle.classList.remove('active');
          
          // Reset icon
          const icon = mobileMenuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
          
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      // If this is not the enter-arena button and scrolling is not enabled, prevent navigation
      if (!document.body.classList.contains('scrolling-enabled') && this.id !== 'enter-arena-btn') {
        e.preventDefault();
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for header height
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll animations
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTop = window.scrollY;
    const windowBottom = windowTop + windowHeight;
    
    animateElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top + windowTop;
      const elementHeight = element.offsetHeight;
      const elementBottom = elementTop + elementHeight;
      
      // Check if element is in viewport
      if (elementBottom > windowTop && elementTop < windowBottom) {
        element.classList.add('visible');
      }
    });
  }
  
  // Check elements on load
  window.addEventListener('load', checkIfInView);
  // Check elements on scroll
  window.addEventListener('scroll', checkIfInView);
  
  // Prize podium animations
  function animatePrizePodium() {
    const podiumBars = document.querySelectorAll('.podium-bar');
    const podiumContents = document.querySelectorAll('.podium-content');
    
    // First make sure content is visible with proper positioning
    podiumContents.forEach(content => {
      content.style.opacity = '0';
      content.style.bottom = '140%'; // Updated to match CSS value
      
      // Fade in the content with a slight delay
      setTimeout(() => {
        content.style.transition = 'opacity 1s ease';
        content.style.opacity = '1';
      }, 300);
    });
    
    // Set up bar initial state - make sure they start with zero height
    podiumBars.forEach(bar => {
      bar.style.height = '0';
      bar.style.bottom = '0';
      bar.style.background = 'linear-gradient(to top, var(--primary-color), #FFC800)';
    });
    
    // Animate the bars after a short delay
    setTimeout(() => {
      podiumBars.forEach(bar => {
        bar.style.transition = 'height 1.5s ease-out';
        
        if (bar.parentElement.classList.contains('first-place')) {
          bar.style.height = '200px';
        } else if (bar.parentElement.classList.contains('second-place')) {
          bar.style.height = '150px';
        } else if (bar.parentElement.classList.contains('third-place')) {
          bar.style.height = '100px';
        }
      });
    }, 500);
  }
  
  // Prize cards animation
  function animatePrizeCards() {
    const prizeCards = document.querySelectorAll('.prize-card');
    
    // Initially hide all cards
    prizeCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
    });
    
    // Show cards one by one with staggered delay
    prizeCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 1000 + (index * 200)); // Staggered delay
    });
  }
  
  // Run animations when prize section becomes visible
  const prizePodiumContainer = document.querySelector('.prize-podium-container');
  const prizeCardsContainer = document.querySelector('.prize-cards-container');
  
  // Animation state tracking
  let prizeSectionAnimated = false;
  
  if (prizePodiumContainer && prizeCardsContainer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !prizeSectionAnimated) {
          // Set the flag to true to prevent future animations
          prizeSectionAnimated = true;
          
          if (entry.target === prizePodiumContainer) {
            console.log("Animating prize section (one-time only)");
            animatePrizePodium();
            
            // Start prize cards animation after podium animation
            setTimeout(animatePrizeCards, 1500);
            
            // Stop observing after animation is triggered
            observer.unobserve(prizePodiumContainer);
          }
        }
      });
    }, { threshold: 0.3 }); // Increased threshold to make sure element is well in view
    
    observer.observe(prizePodiumContainer);
  }
  
  // Animate prize meter on load
  const prizeMeterFill = document.querySelector('.prize-meter-fill');
  if (prizeMeterFill) {
    // Flag to track if prize meter has been animated
    let prizeMeterAnimated = false;
    
    // Create observer for prize meter
    const prizeMeterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !prizeMeterAnimated) {
          console.log('Prize meter is visible, starting animation');
          prizeMeterAnimated = true;
          
          // Force layout reflow before setting the width to ensure animation works
          void prizeMeterFill.offsetWidth;
          
          // Set width after a short delay
          setTimeout(() => {
            prizeMeterFill.style.width = '100%';
            
            // Add glow animation after fill animation completes
            setTimeout(() => {
              prizeMeterFill.style.animation = 'pulse-glow-purple 2s infinite';
              prizeMeterFill.style.borderRadius = '25px';
            }, 2000);
          }, 100);
          
          prizeMeterObserver.unobserve(prizeMeterFill);
        }
      });
    }, { threshold: 0.2 });
    
    // Observe the prize meter's parent for better detection
    const prizeMeter = document.querySelector('.prize-meter');
    if (prizeMeter) {
      prizeMeterObserver.observe(prizeMeter);
    } else {
      prizeMeterObserver.observe(prizeMeterFill);
    }
    
    // Fallback: Add a scroll event listener in case intersection observer doesn't trigger
    window.addEventListener('scroll', function scrollHandler() {
      if (!prizeMeterAnimated) {
        const rect = prizeMeterFill.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          console.log('Prize meter visible via scroll event');
          prizeMeterAnimated = true;
          void prizeMeterFill.offsetWidth;
          prizeMeterFill.style.width = '100%';
          
          // Add glow animation after fill animation completes
          setTimeout(() => {
            prizeMeterFill.style.animation = 'pulse-glow-purple 2s infinite';
            prizeMeterFill.style.borderRadius = '25px';
          }, 2000);
          
          window.removeEventListener('scroll', scrollHandler);
        }
      }
    });
    
    // Ultimate fallback: trigger after a certain amount of time anyway
    setTimeout(() => {
      if (!prizeMeterAnimated) {
        console.log('Prize meter animation fallback triggered');
        prizeMeterAnimated = true;
        void prizeMeterFill.offsetWidth;
        prizeMeterFill.style.width = '100%';
        
        // Add glow animation after fill animation completes
        setTimeout(() => {
          prizeMeterFill.style.animation = 'pulse-glow-purple 2s infinite';
          prizeMeterFill.style.borderRadius = '25px';
        }, 2000);
      }
    }, 5000);
  }
}); 

// Make sure the prize meter animation works even if the document is already loaded
function initPrizeMeterAnimation() {
  const prizeMeterFill = document.querySelector('.prize-meter-fill');
  if (prizeMeterFill && prizeMeterFill.style.width !== '100%') {
    console.log('Initializing prize meter animation separately');
    const animatePrizeMeter = () => {
      void prizeMeterFill.offsetWidth;
      prizeMeterFill.style.width = '100%';
      
      // Add glow animation after fill animation completes
      setTimeout(() => {
        prizeMeterFill.style.animation = 'pulse-glow-purple 2s infinite';
        prizeMeterFill.style.borderRadius = '25px';
      }, 2000);
    };
    
    // Check if element is in viewport
    const rect = prizeMeterFill.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      animatePrizeMeter();
    } else {
      // If not in viewport, set up a scroll listener
      const scrollHandler = () => {
        const newRect = prizeMeterFill.getBoundingClientRect();
        if (newRect.top < window.innerHeight && newRect.bottom > 0) {
          animatePrizeMeter();
          window.removeEventListener('scroll', scrollHandler);
        }
      };
      
      window.addEventListener('scroll', scrollHandler);
      
      // Fallback in case scroll event never triggers
      setTimeout(() => {
        if (prizeMeterFill.style.width !== '100%') {
          animatePrizeMeter();
          window.removeEventListener('scroll', scrollHandler);
        }
      }, 5000);
    }
  }
}

// Run right away and also on DOMContentLoaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initPrizeMeterAnimation, 1000);
} else {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initPrizeMeterAnimation, 1000);
  });
}

// Also run on window load to be extra safe
window.addEventListener('load', () => {
  setTimeout(initPrizeMeterAnimation, 1000);
}); 