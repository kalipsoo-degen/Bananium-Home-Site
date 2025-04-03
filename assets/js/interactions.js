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