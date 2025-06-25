/**
 * BANANIUM MAXIMUS - Configuration Settings
 */

const CONFIG = {
    // API endpoints
    api: {
        prizeData: 'assets/js/prize-data.json'
    },
    
    // Animation settings
    animations: {
        scrollOffset: 80,
        pulseSpeed: 2, // seconds
        floatSpeed: 3  // seconds
    },
    
    // Social media links
    social: {
        twitter: 'https://twitter.com/bananium',
        website: 'https://bananium.io'
    },
    
    // Prize pool constants
    prizes: {
        totalSei: 1024,
        totalPrizes: 7
    }
};

// Prevent modification of configuration
Object.freeze(CONFIG);

// Export configuration
export default CONFIG; 