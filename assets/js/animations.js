/**
 * BANANIUM MAXIMUS - Animations
 */
import CONFIG from './config.js';

/**
 * Initialize all animations on the page
 */
export function initAnimations() {
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize any scroll-triggered animations
    initScrollAnimations();
}

/**
 * Apply floating animation to elements with the 'float' class
 */
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.float');
    
    floatingElements.forEach((element, index) => {
        // Add slight delay variation to each element
        const delay = index * 0.2;
        
        element.style.animation = `float ${CONFIG.animations.floatSpeed}s ease-in-out ${delay}s infinite`;
    });
}

/**
 * Initialize animations triggered by scrolling
 */
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    
    // Function to check if an element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    };
    
    // Function to handle scroll event
    const handleScroll = () => {
        elementsToAnimate.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('animated')) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Trigger once on page load
    handleScroll();
}

/**
 * Add a pulsing effect to an element
 * @param {HTMLElement} element - Element to apply pulse effect to
 */
export function addPulseEffect(element) {
    if (!element) return;
    
    element.style.animation = `pulse ${CONFIG.animations.pulseSpeed}s infinite`;
} 