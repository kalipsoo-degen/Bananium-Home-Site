// Interactions Module
// Handles user interactions with the 3D scene

const UI = {
  // DOM elements
  searchInput: null,
  searchDropdown: null,
  randomBtn: null,
  characterCard: null,
  hoverInfo: null,
  
  // State variables
  raycaster: null,
  mouse: null,
  hoveredStar: null,
  selectedCharacterId: null,
  dropdownVisible: false,
  
  // Initialize UI elements and event listeners
  init() {
    // Get DOM elements
    this.searchInput = document.getElementById('searchInput');
    this.searchDropdown = document.getElementById('searchDropdown');
    this.randomBtn = document.getElementById('randomBtn');
    this.characterCard = document.getElementById('characterCard');
    this.characterName = document.getElementById('characterName');
    this.characterImg = document.getElementById('characterImg');
    this.characterDescription = document.getElementById('characterDescription');
    this.closeCardBtn = document.getElementById('closeCard');
    this.homepageLink = document.getElementById('homepageLink');
    this.cardPrevBtn = document.getElementById('cardPrevBtn');
    this.cardNextBtn = document.getElementById('cardNextBtn');
    this.cardRandomBtn = document.getElementById('cardRandomBtn');
    this.hoverInfo = document.getElementById('hoverInfo');
    
    // Set up raycaster for 3D interactions
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold = 20;
    this.mouse = new THREE.Vector2();
    
    // Set up event listeners
    this._setupEventListeners();
  },
  
  // Set up all event listeners
  _setupEventListeners() {
    // Mouse move for hovering objects
    document.addEventListener('mousemove', this._onMouseMove.bind(this));
    
    // Mouse click for selecting objects
    document.addEventListener('click', this._onMouseClick.bind(this));
    
    // Search input and dropdown
    this.searchInput.addEventListener('input', this._onSearchInput.bind(this));
    this.searchInput.addEventListener('focus', this._onSearchFocus.bind(this));
    document.addEventListener('click', this._onDocumentClick.bind(this));
    
    // Random character button
    this.randomBtn.addEventListener('click', this._onRandomButtonClick.bind(this));
    
    // Character card close button
    this.closeCardBtn.addEventListener('click', this._closeCharacterCard.bind(this));
    
    // Character card navigation buttons
    this.cardPrevBtn.addEventListener('click', this._onPrevCharacterClick.bind(this));
    this.cardNextBtn.addEventListener('click', this._onNextCharacterClick.bind(this));
    this.cardRandomBtn.addEventListener('click', this._onRandomButtonClick.bind(this));
    
    // Mouse wheel for zooming
    document.addEventListener('wheel', this._onMouseWheel.bind(this));
  },
  
  // Handle mouse move for raycasting and hovering
  _onMouseMove(event) {
    // Update mouse position
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Update raycaster
    this.raycaster.setFromCamera(this.mouse, App.camera);
    
    // Get intersections with character stars
    const intersects = this.raycaster.intersectObjects(CharacterStars.stars);
    
    // Handle hover
    if (intersects.length > 0) {
      const hoveredStar = intersects[0].object;
      
      // If hovering a new star
      if (this.hoveredStar !== hoveredStar) {
        // Remove hover effect from previous star
        if (this.hoveredStar) {
          CharacterStars.setStarHover(this.hoveredStar, false);
        }
        
        // Add hover effect to new star
        CharacterStars.setStarHover(hoveredStar, true);
        
        // Update reference
        this.hoveredStar = hoveredStar;
        
        // Show hover info
        this._showHoverInfo(hoveredStar, event);
      } else {
        // Update hover info position
        this._updateHoverInfoPosition(event);
      }
    } else {
      // If no star is hovered, remove effect from previous star
      if (this.hoveredStar) {
        CharacterStars.setStarHover(this.hoveredStar, false);
        this.hoveredStar = null;
        
        // Hide hover info
        this._hideHoverInfo();
      }
    }
  },
  
  // Handle mouse click for selecting a star
  _onMouseClick(event) {
    // If dropdown is visible, handle it separately
    if (this.dropdownVisible && !event.target.closest('.search-dropdown')) {
      this._hideSearchDropdown();
      return;
    }
    
    // If hovering a star, show the character card
    if (this.hoveredStar) {
      const characterId = this.hoveredStar.userData.characterId;
      this._showCharacterCard(characterId);
      
      // Animate camera to look at the selected star
      Animation.focusOnStar(this.hoveredStar);
    }
  },
  
  // Handle search input
  _onSearchInput(event) {
    const query = event.target.value.trim();
    
    // Filter characters
    const characters = filterCharacters(query);
    
    // Update dropdown
    this._updateSearchDropdown(characters, query);
  },
  
  // Handle search focus
  _onSearchFocus(event) {
    // Show all characters in dropdown when focusing empty search
    if (event.target.value.trim() === '') {
      const characters = getAllCharacters();
      this._updateSearchDropdown(characters, '');
    }
  },
  
  // Handle document click for closing dropdown
  _onDocumentClick(event) {
    if (!event.target.closest('.search-wrapper') && this.dropdownVisible) {
      this._hideSearchDropdown();
    }
  },
  
  // Show search dropdown with filtered results
  _updateSearchDropdown(characters, query) {
    // Clear previous results
    this.searchDropdown.innerHTML = '';
    
    if (characters.length === 0) {
      // No results found
      this.searchDropdown.innerHTML = `<div class="dropdown-no-results">No agents found matching "${query}"</div>`;
    } else {
      // Create dropdown items for each character
      characters.slice(0, 10).forEach(character => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        
        // Create HTML content
        item.innerHTML = `
          <div class="dropdown-img">
            <img src="${character.image}" onerror="this.src=Utils.createPlaceholderImage(${JSON.stringify(character).replace(/"/g, '\'')});" alt="${character.name}">
          </div>
          <div class="dropdown-text">${character.name}</div>
        `;
        
        // Add click handler
        item.addEventListener('click', () => {
          this._showCharacterCard(character.id);
          this._hideSearchDropdown();
          this.searchInput.value = '';
          
          // Find and focus on the star
          const star = CharacterStars.findStarById(character.id);
          if (star) {
            Animation.focusOnStar(star);
          }
        });
        
        this.searchDropdown.appendChild(item);
      });
      
      // Show count if there are more results
      if (characters.length > 10) {
        const moreCount = document.createElement('div');
        moreCount.className = 'dropdown-item';
        moreCount.textContent = `And ${characters.length - 10} more results...`;
        this.searchDropdown.appendChild(moreCount);
      }
    }
    
    // Show dropdown
    this.searchDropdown.style.display = 'block';
    this.dropdownVisible = true;
  },
  
  // Hide search dropdown
  _hideSearchDropdown() {
    this.searchDropdown.style.display = 'none';
    this.dropdownVisible = false;
  },
  
  // Handle random button click
  _onRandomButtonClick() {
    // Get a random character
    const randomCharacter = getRandomCharacter();
    
    // Show character card
    this._showCharacterCard(randomCharacter.id);
    
    // Find and focus on the star
    const star = CharacterStars.findStarById(randomCharacter.id);
    if (star) {
      Animation.focusOnStar(star);
    }
  },
  
  // Show character card
  _showCharacterCard(characterId) {
    // Get character data
    const character = getCharacterById(characterId);
    
    if (!character) return;
    
    // Update selected character
    this.selectedCharacterId = characterId;
    
    // Update card content
    this.characterName.textContent = character.name;
    this.characterImg.src = character.image;
    this.characterImg.onerror = () => {
      this.characterImg.src = Utils.createPlaceholderImage(character);
    };
    this.characterDescription.textContent = character.description;
    this.homepageLink.href = character.homepage;
    
    // Show the card
    this.characterCard.style.display = 'flex';
    
    // Hide hover info
    this._hideHoverInfo();
  },
  
  // Close character card
  _closeCharacterCard() {
    this.characterCard.style.display = 'none';
    this.selectedCharacterId = null;
    
    // Reset camera to default view
    Animation.resetCamera();
  },
  
  // Handle previous character button
  _onPrevCharacterClick() {
    if (this.selectedCharacterId === null) return;
    
    // Find current character index
    const characters = getAllCharacters();
    const currentIndex = characters.findIndex(c => c.id === this.selectedCharacterId);
    
    // Calculate previous index with wrap-around
    const prevIndex = (currentIndex - 1 + characters.length) % characters.length;
    
    // Show previous character
    this._showCharacterCard(characters[prevIndex].id);
    
    // Find and focus on the star
    const star = CharacterStars.findStarByIndex(prevIndex);
    if (star) {
      Animation.focusOnStar(star);
    }
  },
  
  // Handle next character button
  _onNextCharacterClick() {
    if (this.selectedCharacterId === null) return;
    
    // Find current character index
    const characters = getAllCharacters();
    const currentIndex = characters.findIndex(c => c.id === this.selectedCharacterId);
    
    // Calculate next index with wrap-around
    const nextIndex = (currentIndex + 1) % characters.length;
    
    // Show next character
    this._showCharacterCard(characters[nextIndex].id);
    
    // Find and focus on the star
    const star = CharacterStars.findStarByIndex(nextIndex);
    if (star) {
      Animation.focusOnStar(star);
    }
  },
  
  // Handle mouse wheel for zooming
  _onMouseWheel(event) {
    Animation.handleZoom(event.deltaY);
  },
  
  // Show hover info tooltip
  _showHoverInfo(star, event) {
    // Get character data
    const characterId = star.userData.characterId;
    const character = getCharacterById(characterId);
    
    if (!character) return;
    
    // Update content
    this.hoverInfo.innerHTML = `<strong>${character.name}</strong><br><small>Type: ${character.type}</small>`;
    
    // Position tooltip
    this._updateHoverInfoPosition(event);
    
    // Show tooltip
    this.hoverInfo.style.display = 'block';
  },
  
  // Update hover info position
  _updateHoverInfoPosition(event) {
    // Position tooltip slightly above cursor
    this.hoverInfo.style.left = `${event.clientX}px`;
    this.hoverInfo.style.top = `${event.clientY - 40}px`;
  },
  
  // Hide hover info tooltip
  _hideHoverInfo() {
    this.hoverInfo.style.display = 'none';
  }
}; 