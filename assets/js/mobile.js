/**
 * Mobile-specific enhancements for Bananium website
 */
document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }

    // Fix mobile layout issues with inline styles
    function fixMobileLayout() {
        if (window.innerWidth <= 768) {
            // Fix width issues on elements with inline styles using calc(100vw - 4cm)
            document.querySelectorAll('[style*="width: calc(100vw - 4cm)"]').forEach(el => {
                el.style.width = '92%';
                el.style.maxWidth = '92%';
                el.style.marginLeft = 'auto';
                el.style.marginRight = 'auto';
            });
            
            // Fix container width with calc width
            document.querySelectorAll('[style*="width: calc(((100vw - 4cm)"]').forEach(el => {
                el.style.width = '92%';
                el.style.maxWidth = '92%';
                el.style.marginLeft = 'auto';
                el.style.marginRight = 'auto';
                el.style.left = '0';
                el.style.right = '0';
            });
            
            // Make sure elements fill width properly
            const fullWidthElements = [
                '.about-content',
                '.app-integration',
                '.section-title.bananium-logo',
                '.starfield-container',
                '.steps-container',
                '.roadmap-video-container',
                '.prize-podium-container',
                '.prize-cards-container',
                '.prize-info',
                '.about-text',
                '.galaxy-section > div',
                '#app-container',
                '#starfield-container'
            ];
            
            fullWidthElements.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => {
                    // Ensure width and centered positioning
                    el.style.width = '92%';
                    el.style.maxWidth = '92%';
                    el.style.marginLeft = 'auto';
                    el.style.marginRight = 'auto';
                    el.style.left = '';
                    el.style.right = '';
                });
            });
            
            // Fix colusseum image size
            const colusseumImage = document.querySelector('.colusseum-image');
            if (colusseumImage) {
                colusseumImage.style.width = '100%';
                colusseumImage.style.maxWidth = '100%';
            }
            
            // Fix banner animations
            const bananaLeft = document.querySelector('.banana-treadmill.left');
            const bananaRight = document.querySelector('.banana-treadmill.right');
            if (bananaLeft) bananaLeft.style.display = 'none';
            if (bananaRight) bananaRight.style.display = 'none';
            
            // Fix roadmap
            const roadmapSection = document.querySelector('#about-roadmap');
            if (roadmapSection) {
                roadmapSection.style.width = '100%';
                roadmapSection.style.maxWidth = '100%';
                roadmapSection.style.padding = '0';
            }
            
            // Fix roadmap video
            const roadmapVideo = document.querySelector('.roadmap-video');
            if (roadmapVideo) {
                roadmapVideo.style.width = '100%';
            }
            
            // Fix prize pool section
            const prizePool = document.querySelector('.prize-pool');
            if (prizePool) {
                prizePool.style.padding = '3rem 0.5rem';
            }
            
            // Fix whitepaper section
            const whitepaper = document.querySelector('#whitepaper');
            if (whitepaper) {
                whitepaper.style.width = '100%';
                whitepaper.style.paddingLeft = '1rem';
                whitepaper.style.paddingRight = '1rem';
            }
            
            // Fix starfield containment
            const galaxyStarfield = document.querySelector('#galaxy-starfield');
            if (galaxyStarfield) {
                galaxyStarfield.style.width = '100%';
                galaxyStarfield.style.maxWidth = '100%';
                galaxyStarfield.style.marginLeft = '0';
                galaxyStarfield.style.marginRight = '0';
                galaxyStarfield.style.paddingLeft = '1rem';
                galaxyStarfield.style.paddingRight = '1rem';
            }
            
            // Adjust prize podium
            const podiumWrapper = document.querySelector('.podium-wrapper');
            if (podiumWrapper) {
                podiumWrapper.style.width = '100%';
            }
            
            // Fix prize cards
            const prizeCardsWrapper = document.querySelector('.prize-cards-wrapper');
            if (prizeCardsWrapper) {
                prizeCardsWrapper.style.width = '100%';
                prizeCardsWrapper.style.display = 'flex';
                prizeCardsWrapper.style.flexWrap = 'wrap';
                prizeCardsWrapper.style.justifyContent = 'center';
                prizeCardsWrapper.style.gap = '15px';
            }
        }
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
    
    // Fix layout immediately and on resize
    fixMobileLayout();
    window.addEventListener('resize', fixMobileLayout);
}); 