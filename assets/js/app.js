/**
 * BANANIUM MAXIMUS - Main Application
 */
import { initAnimations, addPulseEffect } from './animations.js';
import { initInteractions, initRoadmapInteractions } from './interactions.js';
import { loadPrizeData, loadRoadmapData } from './data.js';
import CONFIG from './config.js';

/**
 * Application class to manage the entire app
 */
class BananiumApp {
    constructor() {
        this.initialized = false;
    }
    
    /**
     * Initialize the application
     */
    init() {
        if (this.initialized) return;
        
        console.log('Initializing BANANIUM MAXIMUS application...');
        
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });
        
        this.initialized = true;
    }
    
    /**
     * Initialize all application components
     */
    initializeComponents() {
        // Load data first
        this.loadData();
        
        // Initialize user interactions
        initInteractions();
        
        // Initialize animations
        initAnimations();
        
        // Initialize roadmap interactions
        initRoadmapInteractions();
        
        // Add pulse effect to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            addPulseEffect(heroTitle);
        }
        
        // Initialize external app loader if present
        this.initExternalAppLoader();
        
        console.log('BANANIUM MAXIMUS application initialized successfully');
    }
    
    /**
     * Load all required data
     */
    loadData() {
        // Load prize pool data
        loadPrizeData();
    }
    
    /**
     * Initialize external app loader
     */
    initExternalAppLoader() {
        window.loadExternalApp = function(appUrl, containerId) {
            const script = document.createElement('script');
            script.src = appUrl;
            script.async = true;
            script.onload = function() {
                console.log(`External app loaded successfully: ${appUrl}`);
            };
            document.body.appendChild(script);
        };
    }
}

// Create and export app instance
export const app = new BananiumApp(); 