/**
 * BANANIUM MAXIMUS - Data Management
 */
import CONFIG from './config.js';

/**
 * Load prize pool data and populate the table
 * @returns {Promise} Promise that resolves with the prize data
 */
export function loadPrizeData() {
    return fetch(CONFIG.api.prizeData)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load prize data');
            }
            return response.json();
        })
        .then(data => {
            populatePrizeTable(data);
            animatePrizeMeter();
            return data;
        })
        .catch(error => {
            console.error('Failed to load prize data:', error);
            loadFallbackPrizeData();
            animatePrizeMeter();
            return null;
        });
}

/**
 * Populate the prize table with the provided data
 * @param {Object} data - The prize pool data object
 */
function populatePrizeTable(data) {
    const tableBody = document.getElementById('prize-table-body');
    if (!tableBody) return;
    
    // Clear any existing content
    tableBody.innerHTML = '';
    
    // Calculate total SOL to show percentage distribution
    const totalSol = data.prizePool.totalSol;
    
    data.prizePool.prizes.forEach((prize, index) => {
        const row = document.createElement('tr');
        
        // Calculate percentage of the total prize pool
        const percentage = ((prize.sol / totalSol) * 100).toFixed(1);
        
        row.innerHTML = `
            <td>${prize.rank}</td>
            <td>${prize.pot.toLocaleString()}</td>
            <td><span class="prize-sol">${prize.sol}</span> <span class="prize-percentage">(${percentage}%)</span></td>
        `;
        
        // Add animation delay based on index
        row.style.animation = `fadeIn 0.5s ease forwards ${0.1 + index * 0.1}s`;
        row.style.opacity = "0";
        
        tableBody.appendChild(row);
    });
}

/**
 * Animate the prize meter to show full amount
 */
function animatePrizeMeter() {
    const prizeMeterFill = document.querySelector('.prize-meter-fill');
    if (!prizeMeterFill) return;
    
    // Wait a bit before starting animation for better UX
    setTimeout(() => {
        const targetWidth = prizeMeterFill.getAttribute('data-target') || 100;
        prizeMeterFill.style.width = `${targetWidth}%`;
    }, 500);
}

/**
 * Load fallback prize data if API request fails
 */
function loadFallbackPrizeData() {
    const tableBody = document.getElementById('prize-table-body');
    if (!tableBody) return;
    
    const totalSol = CONFIG.prizes.totalSol;
    const fallbackData = [
        { rank: 1, pot: 125000, sol: 609 },
        { rank: 2, pot: 125000, sol: 171 },
        { rank: 3, pot: 125000, sol: 89 },
        { rank: 4, pot: 125000, sol: 54 },
        { rank: 5, pot: 125000, sol: 37 },
        { rank: 6, pot: 125000, sol: 27 },
        { rank: 7, pot: 125000, sol: 21 }
    ];
    
    tableBody.innerHTML = '';
    
    fallbackData.forEach((prize, index) => {
        const percentage = ((prize.sol / totalSol) * 100).toFixed(1);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${prize.rank}</td>
            <td>${prize.pot.toLocaleString()}</td>
            <td><span class="prize-sol">${prize.sol}</span> <span class="prize-percentage">(${percentage}%)</span></td>
        `;
        
        // Add animation delay based on index
        row.style.animation = `fadeIn 0.5s ease forwards ${0.1 + index * 0.1}s`;
        row.style.opacity = "0";
        
        tableBody.appendChild(row);
    });
}

/**
 * Load roadmap data
 * In a real-world scenario, this could be loaded from an API endpoint
 * @returns {Array} Array of roadmap objects
 */
export function loadRoadmapData() {
    // This would typically be loaded from an external source
    return [
        {
            title: "SPOT DROP",
            description: "Initial mint phase begins. Secure your warriors for the battle."
        },
        {
            title: "THE GREAT REVEAL",
            description: "Warriors are revealed with their unique traits and abilities."
        },
        {
            title: "WELCOME TO BANANIUM MAXIMUS",
            description: "The arena opens and the battle commences."
        },
        {
            title: "WINNERS PLUNDER",
            description: "Prize distribution to the victorious warriors."
        },
        {
            title: "FINALE LIVE",
            description: "Live streamed final battle with real-time commentary."
        }
    ];
} 