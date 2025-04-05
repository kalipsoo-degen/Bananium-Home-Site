/**
 * Mobile-specific enhancements for Bananium website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }

    // Improve scrolling behavior on mobile
    function preventRubberBandEffect(event) {
        // Only prevent default if the scroll has reached its limits
        const element = event.currentTarget;
        const isAtTop = element.scrollTop <= 0;
        const isAtBottom = element.scrollTop + element.clientHeight >= element.scrollHeight;
        
        if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
            event.preventDefault();
        }
    }

    // Apply to elements that might need scrolling on touch devices
    const scrollableElements = document.querySelectorAll('.flip-tile-back, .character-description, .nav-links.active');
    scrollableElements.forEach(element => {
        element.addEventListener('wheel', preventRubberBandEffect, { passive: false });
    });

    // Add swipe functionality for interactive elements
    let touchStartX = 0;
    let touchEndX = 0;
    
    function handleSwipe(element, leftCallback, rightCallback) {
        element.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        element.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipeGesture();
        }, { passive: true });
        
        function handleSwipeGesture() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                if (leftCallback) leftCallback();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Swipe right
                if (rightCallback) rightCallback();
            }
        }
    }
    
    // Add swipe for flip tiles
    const flipTiles = document.querySelectorAll('.flip-tile');
    flipTiles.forEach(tile => {
        handleSwipe(
            tile,
            () => {
                // Swipe left to flip card (if not already flipped)
                if (!tile.classList.contains('flipped')) {
                    tile.classList.add('flipped');
                }
            },
            () => {
                // Swipe right to flip back (if flipped)
                if (tile.classList.contains('flipped')) {
                    tile.classList.remove('flipped');
                }
            }
        );
    });
    
    // Add tap functionality enhancements
    function enhanceTapTargets() {
        // 1. Buttons - make touch targets larger
        const smallButtons = document.querySelectorAll('.nav-btn, .homepage-btn, .cta-btn, .mobile-menu-toggle');
        smallButtons.forEach(button => {
            // Only add padding if it's not already large enough (min size should be 44x44px)
            if (button.offsetWidth < 44 || button.offsetHeight < 44) {
                button.style.minWidth = '44px';
                button.style.minHeight = '44px';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'center';
            }
        });
        
        // 2. Add active tap state for better feedback
        const allTappableElements = document.querySelectorAll('a, button, .flip-tile');
        allTappableElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('touch-active');
            }, { passive: true });
            
            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('touch-active');
                }, 150); // Short delay for visual feedback
            }, { passive: true });
        });
    }
    
    // Execute enhancements if it's a touch device
    if (isTouchDevice) {
        enhanceTapTargets();
        
        // Additional touch-specific adjustments
        
        // Fix for iOS 100vh issue
        function setVhProperty() {
            // Set CSS variable for viewport height
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        // Set on load and resize
        window.addEventListener('resize', setVhProperty);
        window.addEventListener('orientationchange', setVhProperty);
        setVhProperty();
        
        // Force repaint on orientation change for better rendering
        window.addEventListener('orientationchange', () => {
            document.body.style.display = 'none';
            setTimeout(() => {
                document.body.style.display = '';
            }, 50);
        });
    }
}); 