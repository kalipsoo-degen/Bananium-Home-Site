/**
 * BANANIUM MAXIMUS - User Interactions
 */
import CONFIG from './config.js';

/**
 * Initialize all user interactions
 */
export function initInteractions() {
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize mobile navigation menu
    initMobileMenu();
    
    // Initialize CTA button hover effects
    initButtonEffects();
    
    // Initialize roadmap video click-to-enlarge (mobile only)
    initRoadmapVideoEnlarge();
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - CONFIG.animations.scrollOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
}

/**
 * Initialize button hover effects and interactions
 */
function initButtonEffects() {
    const ctaButtons = document.querySelectorAll('.cta-btn');
    
    ctaButtons.forEach(button => {
        // Add sound effect on click (optional)
        button.addEventListener('click', () => {
            // Haptic feedback or sound could be triggered here
            button.classList.add('clicked');
            
            // Remove class after animation completes
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300);
        });
    });
}

/**
 * Add event listeners for roadmap interactions
 */
export function initRoadmapInteractions() {
    const roadmapItems = document.querySelectorAll('.roadmap-item');
    
    roadmapItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('highlight');
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('highlight');
        });
        
        item.addEventListener('click', () => {
            // Toggle expanded state for more details
            item.classList.toggle('expanded');
        });
    });
}

/**
 * Initialize click-to-enlarge functionality for roadmap video (mobile only)
 */
export function initRoadmapVideoEnlarge() {
    const roadmapVideoContainer = document.querySelector('.roadmap-video-container');
    const roadmapVideo = document.querySelector('.roadmap-video');
    
    if (roadmapVideoContainer && roadmapVideo) {
        console.log('Initializing roadmap video enlarge functionality');
        
        // Check if modal already exists to avoid duplicates
        let modal = document.querySelector('.roadmap-video-modal');
        
        // Create modal elements for enlarged video if it doesn't exist
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'roadmap-video-modal';
            modal.style.display = 'none';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'roadmap-video-modal-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'roadmap-video-modal-close';
            closeBtn.innerHTML = '&times;';
            
            // Clone the video to use in the modal
            const modalVideo = roadmapVideo.cloneNode(true);
            modalVideo.className = 'roadmap-video-enlarged';
            
            // Append elements to DOM
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalVideo);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            // Close modal when X is clicked
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                modal.style.display = 'none';
                console.log('Modal closed via close button');
            });
            
            // Close modal when clicking outside the content
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.style.display = 'none';
                    console.log('Modal closed via outside click');
                }
            });
        }
        
        // Function to handle modal opening
        const openModal = function(e) {
            console.log('Roadmap video container clicked, window width:', window.innerWidth);
            // Mobile-only check
            if (window.innerWidth <= 768) {
                console.log('Opening roadmap video modal');
                
                // Prevent default behavior if this is an event
                if (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                
                // Show the modal - positioning is now handled by CSS
                modal.style.display = 'block';
                
                // Get the modal video and ensure it plays
                const modalVideo = modal.querySelector('.roadmap-video-enlarged');
                if (modalVideo) {
                    // Play the video
                    modalVideo.play();
                    console.log('Playing modal video');
                }
            }
        };
        
        // Listen for orientation changes to keep video playing
        window.addEventListener('orientationchange', function() {
            console.log('Orientation change detected');
            
            // Wait for the orientation change to complete
            setTimeout(function() {
                const modal = document.querySelector('.roadmap-video-modal');
                const modalVideo = modal ? modal.querySelector('.roadmap-video-enlarged') : null;
                const modalContent = modal ? modal.querySelector('.roadmap-video-modal-content') : null;
                
                if (modal && modal.style.display === 'block' && modalVideo) {
                    console.log('Orientation changed while modal is open');
                    
                    // Force modal to flex display for better centering in landscape
                    if (window.innerWidth > window.innerHeight) {
                        // We're in landscape mode
                        modal.style.display = 'flex';
                        modal.style.alignItems = 'center';
                        modal.style.justifyContent = 'center';
                        
                        if (modalContent) {
                            // Ensure modal content is properly sized
                            modalContent.style.width = '95%';
                            modalContent.style.maxWidth = '95%';
                            modalContent.style.maxHeight = '95vh';
                            
                            // Force a repaint by temporarily changing a property
                            modalContent.style.opacity = '0.99';
                            setTimeout(() => {
                                modalContent.style.opacity = '1';
                            }, 50);
                        }
                        
                        // Ensure video fills the space correctly
                        modalVideo.style.maxHeight = '85vh';
                    }
                    
                    // Ensure video plays
                    modalVideo.play();
                }
            }, 300); // Short delay to allow rotation to complete
        });
        
        // Listen for resize events (simplified)
        window.addEventListener('resize', function() {
            const modal = document.querySelector('.roadmap-video-modal');
            const modalVideo = modal ? modal.querySelector('.roadmap-video-enlarged') : null;
            
            if (modal && modal.style.display === 'block' && modalVideo) {
                console.log('Window resized while modal is open');
                // Simply ensure video plays after resize
                modalVideo.play();
            }
        });
        
        // Remove any existing click handlers to avoid duplicates
        roadmapVideoContainer.removeEventListener('click', openModal);
        
        // Add the click handler to the container
        roadmapVideoContainer.addEventListener('click', openModal);
        
        // Also add click handler directly to the video element for better mobile touch capture
        roadmapVideo.removeEventListener('click', openModal);
        roadmapVideo.addEventListener('click', openModal);
        
        // Add a touchend handler for iOS devices where click might not fire properly
        roadmapVideoContainer.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
                console.log('Touch event on roadmap container');
                e.preventDefault();
                openModal(e);
            }
        });
        
        roadmapVideo.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
                console.log('Touch event on roadmap video');
                e.preventDefault();
                openModal(e);
            }
        });
        
        // Also add click handler to the enlarge indicator (which is added in mobile.js)
        setTimeout(() => {
            const enlargeIndicator = document.querySelector('.roadmap-enlarge-indicator');
            if (enlargeIndicator) {
                console.log('Adding click handler to enlarge indicator');
                enlargeIndicator.addEventListener('click', openModal);
            }
        }, 500); // Short delay to ensure indicator has been added
        
        // Listen for the custom openRoadmapModal event
        document.addEventListener('openRoadmapModal', function() {
            console.log('Custom openRoadmapModal event received');
            openModal();
        });
        
        console.log('Roadmap video enlarge functionality initialized');
    } else {
        console.warn('Could not initialize roadmap video enlarge - elements not found');
    }
    
    // Make function available globally for debugging
    window.initRoadmapVideoEnlarge = initRoadmapVideoEnlarge;
} 