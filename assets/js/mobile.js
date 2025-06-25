/**
 * Mobile-specific enhancements for Bananium website
 */

// Apply mobile fixes immediately when script loads
(function() {
    // Apply critical mobile fixes immediately
    function applyCriticalMobileFixes() {
        if (window.innerWidth <= 768) {
            // CRITICAL: Hide Bananium logo in hero section
            const bananiumLogoElements = document.querySelectorAll('.bananium-logo-container, .bananium-logo-outline, h1.bananium-logo');
            bananiumLogoElements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.height = '0';
                el.style.overflow = 'hidden';
                el.style.pointerEvents = 'none';
            });
            
            // CRITICAL: Fix navbar at top
            const navbar = document.querySelector('#main-navbar');
            if (navbar) {
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.left = '0';
                navbar.style.right = '0';
                navbar.style.zIndex = '2000';
                navbar.style.width = '100%';
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.7)';
                
                // Add padding to body
                document.body.style.paddingTop = (navbar.offsetHeight + 10) + 'px';
                
                // Ensure logo is perfectly centered
                const logo = navbar.querySelector('.logo');
                if (logo) {
                    logo.style.position = 'absolute';
                    logo.style.left = '50%';
                    logo.style.top = '50%';
                    logo.style.transform = 'translate(-50%, -50%)';
                    logo.style.padding = '0';
                    logo.style.margin = '0';
                    logo.style.width = 'auto';
                    logo.style.textAlign = 'center';
                }
            }
        }
    }
    
    // Run immediately
    applyCriticalMobileFixes();
})();

document.addEventListener('DOMContentLoaded', function() {
    // Detect if device is touch-enabled
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }

    // Fix mobile layout issues with inline styles
    function fixMobileLayout() {
        if (window.innerWidth <= 768) {
            // CRITICAL: Hide Bananium logo in hero section
            const bananiumLogoElements = document.querySelectorAll('.bananium-logo-container, .bananium-logo-outline, h1.bananium-logo');
            bananiumLogoElements.forEach(el => {
                el.style.display = 'none';
                el.style.visibility = 'hidden';
                el.style.opacity = '0';
                el.style.height = '0';
                el.style.overflow = 'hidden';
                el.style.pointerEvents = 'none';
            });
            
            // CRITICAL: Fix navbar at top
            const navbar = document.querySelector('#main-navbar');
            if (navbar) {
                navbar.style.position = 'fixed';
                navbar.style.top = '0';
                navbar.style.left = '0';
                navbar.style.right = '0';
                navbar.style.zIndex = '2000';
                navbar.style.width = '100%';
                navbar.style.background = 'rgba(0, 0, 0, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.7)';
                
                // Add padding to body
                document.body.style.paddingTop = (navbar.offsetHeight + 10) + 'px';
                
                // Ensure logo is perfectly centered
                const logo = navbar.querySelector('.logo');
                if (logo) {
                    logo.style.position = 'absolute';
                    logo.style.left = '50%';
                    logo.style.top = '50%';
                    logo.style.transform = 'translate(-50%, -50%)';
                    logo.style.padding = '0';
                    logo.style.margin = '0';
                    logo.style.width = 'auto';
                    logo.style.textAlign = 'center';
                }
            }
            
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
            
            // Add enlarge indicator below the roadmap video on mobile
            const roadmapVideoContainer = document.querySelector('.roadmap-video-container');
            const roadmapVideoParent = roadmapVideoContainer ? roadmapVideoContainer.parentElement : null;
            
            if (roadmapVideoContainer && roadmapVideoParent) {
                // Remove any existing tap hint if present
                const existingTapHint = document.querySelector('.roadmap-tap-hint');
                if (existingTapHint) {
                    existingTapHint.remove();
                }
                
                // Remove any existing indicator if present (for page refreshes)
                const existingIndicator = document.querySelector('.roadmap-enlarge-indicator');
                if (existingIndicator) {
                    existingIndicator.remove();
                }
                
                // Create enlarge indicator with magnify glass icon and text
                const enlargeIndicator = document.createElement('div');
                enlargeIndicator.className = 'roadmap-enlarge-indicator';
                
                // Add Font Awesome magnify glass icon
                const magnifyIcon = document.createElement('i');
                magnifyIcon.className = 'fas fa-search-plus';
                enlargeIndicator.appendChild(magnifyIcon);
                
                // Add text
                const textNode = document.createTextNode('Tap roadmap to enlarge');
                enlargeIndicator.appendChild(textNode);
                
                // Insert after the video container
                roadmapVideoParent.insertBefore(enlargeIndicator, roadmapVideoContainer.nextSibling);
                
                // Add touch feedback effect for the video
                if (roadmapVideo) {
                    // Add visual touch feedback
                    roadmapVideo.addEventListener('touchstart', function() {
                        roadmapVideoContainer.style.opacity = '0.8';
                        roadmapVideoContainer.style.transition = 'opacity 0.2s ease';
                    });
                    
                    roadmapVideo.addEventListener('touchend', function() {
                        roadmapVideoContainer.style.opacity = '1';
                    });
                    
                    roadmapVideo.addEventListener('touchcancel', function() {
                        roadmapVideoContainer.style.opacity = '1';
                    });
                }
                
                // Make the indicator also clickable to trigger the modal
                enlargeIndicator.addEventListener('click', function() {
                    // Simulate click on the video container to trigger the modal
                    console.log('Enlarge indicator clicked');
                    
                    // Create and dispatch a custom event to open the modal
                    const openModalEvent = new CustomEvent('openRoadmapModal');
                    document.dispatchEvent(openModalEvent);
                    
                    // As a fallback, also simulate click on the roadmap video container
                    setTimeout(() => {
                        if (roadmapVideoContainer) {
                            console.log('Simulating click on roadmap video container');
                            roadmapVideoContainer.click();
                        }
                    }, 100);
                    
                    // Remove any existing test buttons
                    const testButtons = document.querySelectorAll('[data-testing-only="true"]');
                    testButtons.forEach(button => {
                        if (button.parentNode) {
                            button.parentNode.removeChild(button);
                        }
                    });
                });
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
        } else {
            // Reset for desktop view
            const navbar = document.querySelector('#main-navbar');
            if (navbar) {
                navbar.style.position = '';
                navbar.style.top = '';
                navbar.style.left = '';
                navbar.style.right = '';
                navbar.style.zIndex = '';
                navbar.style.boxShadow = '';
                document.body.style.paddingTop = '';
            }
            
            // Show bananium logo on desktop
            const bananiumLogoElements = document.querySelectorAll('.bananium-logo-container, .bananium-logo-outline, h1.bananium-logo');
            bananiumLogoElements.forEach(el => {
                el.style.display = '';
                el.style.visibility = '';
                el.style.opacity = '';
                el.style.height = '';
                el.style.overflow = '';
                el.style.pointerEvents = '';
            });
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
    
    // Mobile menu toggle functionality
    function initMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        const navbar = document.querySelector('#main-navbar');

        if (mobileMenuToggle && navLinks && navbar) {
            // Toggle menu visibility on button click
            mobileMenuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const isActive = navLinks.classList.contains('active');
                
                if (isActive) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    // Change icon back to hamburger
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                } else {
                    navLinks.classList.add('active');
                    mobileMenuToggle.classList.add('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'true');
                    // Change icon to X
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-times';
                    }
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (navLinks.classList.contains('active') && 
                    !navbar.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });

            // Close menu when clicking on a nav link
            const navLinkItems = document.querySelectorAll('.nav-links a:not(.mobile-social-bar a)');
            navLinkItems.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        mobileMenuToggle.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                        const icon = mobileMenuToggle.querySelector('i');
                        if (icon) {
                            icon.className = 'fas fa-bars';
                        }
                    }
                });
            });

            // Handle escape key to close menu
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuToggle.querySelector('i');
                    if (icon) {
                        icon.className = 'fas fa-bars';
                    }
                }
            });

        } else {
            console.error('Mobile menu elements not found:', {
                mobileMenuToggle: !!mobileMenuToggle,
                navLinks: !!navLinks,
                navbar: !!navbar
            });
        }
    }
    
    // Enhance tap targets for touch devices
    function enhanceTapTargets() {
        // Add active state to button elements on touch
        const touchTargets = document.querySelectorAll('.flip-tile, .cta-btn, .nav-link');
        
        touchTargets.forEach(target => {
            target.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, {passive: true});
            
            target.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
            
            target.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            }, {passive: true});
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
    
    // Initialize mobile menu functionality
    initMobileMenu();
});

// Fix on window load too, in case the DOM is slow to load
window.addEventListener('load', function() {
    // CRITICAL: Hide Bananium logo in hero section for mobile
    if (window.innerWidth <= 768) {
        const bananiumLogoElements = document.querySelectorAll('.bananium-logo-container, .bananium-logo-outline, h1.bananium-logo');
        bananiumLogoElements.forEach(el => {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
            el.style.height = '0';
            el.style.overflow = 'hidden';
            el.style.pointerEvents = 'none';
        });
        
        // CRITICAL: Fix navbar at top
        const navbar = document.querySelector('#main-navbar');
        if (navbar) {
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.left = '0';
            navbar.style.right = '0';
            navbar.style.zIndex = '2000';
            navbar.style.width = '100%';
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.7)';
            
            // Add padding to body
            document.body.style.paddingTop = (navbar.offsetHeight + 10) + 'px';
            
            // Ensure logo is perfectly centered
            const logo = navbar.querySelector('.logo');
            if (logo) {
                logo.style.position = 'absolute';
                logo.style.left = '50%';
                logo.style.top = '50%';
                logo.style.transform = 'translate(-50%, -50%)';
                logo.style.padding = '0';
                logo.style.margin = '0';
                logo.style.width = 'auto';
                logo.style.textAlign = 'center';
            }
        }
    }
}); 