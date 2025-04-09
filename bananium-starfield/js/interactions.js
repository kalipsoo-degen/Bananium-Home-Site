// User interactions handling
const UI = {
  // DOM elements - updated to reflect current HTML structure
  elements: {
    navigationContainer: document.getElementById('navigationContainer'),
    searchInput: document.getElementById('searchInput'),
    searchDropdown: document.getElementById('searchDropdown'),
    characterCard: document.getElementById('characterCard'),
    characterName: document.getElementById('characterName'),
    characterImage: document.getElementById('characterImage'),
    characterDescription: document.getElementById('characterDescription'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    randomBtn: document.getElementById('randomBtn'),
    closeCardBtn: document.getElementById('closeCard'),
    cardPrevBtn: document.getElementById('cardPrevBtn'),
    cardNextBtn: document.getElementById('cardNextBtn'),
    cardRandomBtn: document.getElementById('cardRandomBtn'),
    hoverInfo: document.getElementById('hoverInfo'),
    homepageLink: document.getElementById('homepageLink')
  },
  
  // Mouse and dragging variables
  isDragging: false,
  dragStartTime: 0,
  dragDistance: 0,
  previousMousePosition: { x: 0, y: 0 },
  mouse: null,
  raycaster: null,
  currentCharacterIndex: null,
  
  // Touch interaction variables
  isTouchDragging: false,
  touchStartTime: 0,
  touchStartPos: { x: 0, y: 0 },
  lastTouchPos: { x: 0, y: 0 },
  touchDistance: 0,
  isPinching: false,
  previousPinchDistance: 0,
  
  // Initialize UI interactions
  init() {
    // Set up raycaster and mouse
    this.raycaster = new THREE.Raycaster();
    this.raycaster.params.Points.threshold = 20; // Increase clickable area
    this.mouse = new THREE.Vector2();
    
    // Initialize filteredCharacters if not already done
    if (!window.filteredCharacters && window.characterData) {
      window.filteredCharacters = [...window.characterData];
    }
    
    // Add event listeners
    this.setupEventListeners();
  },
  
  // Set up event listeners
  setupEventListeners() {
    // Window events
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
    window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });
    window.addEventListener('keydown', this.onKeyDown.bind(this)); // Add keyboard event listener
    
    // Touch events for mobile interactions
    window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    window.addEventListener('touchend', this.onTouchEnd.bind(this));
    
    // Define global mouse up handler as a bound function to ensure proper 'this' context
    this.onGlobalMouseUp = this.onGlobalMouseUp.bind(this);
    
    // UI event listeners - only add listeners for elements that exist
    if (this.elements.searchInput) {
      this.elements.searchInput.addEventListener('input', this.onSearchInput.bind(this));
      this.elements.searchInput.addEventListener('focus', this.onSearchFocus.bind(this));
    }
    
    // Re-add dropdown scroll wheel handler
    if (this.elements.searchDropdown) {
      this.elements.searchDropdown.addEventListener('wheel', this.onDropdownWheel.bind(this), { passive: false });
    }
    
    // Add character description scroll wheel handler
    if (this.elements.characterDescription) {
      this.elements.characterDescription.addEventListener('wheel', this.onDescriptionWheel.bind(this), { passive: false });
    }
    
    // Add character card scroll wheel handler for the entire card
    if (this.elements.characterCard) {
      this.elements.characterCard.addEventListener('wheel', this.onCardWheel.bind(this), { passive: false });
    }
    
    // Add document click listener to close dropdown when clicking outside
    document.addEventListener('click', this.onDocumentClick.bind(this));
    
    // Previous and Next buttons have been removed - only keep Random button
    if (this.elements.randomBtn) {
      this.elements.randomBtn.addEventListener('click', this.selectRandomCharacter.bind(this));
    }
    
    if (this.elements.closeCardBtn) {
      this.elements.closeCardBtn.addEventListener('click', this.closeCharacterCard.bind(this));
    }
    if (this.elements.cardPrevBtn) {
      this.elements.cardPrevBtn.addEventListener('click', () => this.navigateCharacters(-1));
    }
    if (this.elements.cardNextBtn) {
      this.elements.cardNextBtn.addEventListener('click', () => this.navigateCharacters(1));
    }
    if (this.elements.cardRandomBtn) {
      this.elements.cardRandomBtn.addEventListener('click', this.selectRandomCharacter.bind(this));
    }
  },
  
  // Handle window resize
  onWindowResize() {
    App.camera.aspect = window.innerWidth / window.innerHeight;
    App.camera.updateProjectionMatrix();
    App.renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Adjust character card position if it's open
    if (this.currentCharacterIndex !== null && this.elements.characterCard.style.display === 'flex') {
      const characterCard = this.elements.characterCard;
      
      if (window.innerWidth < 600) {
        // For mobile devices, position at the bottom
        characterCard.style.bottom = '0';
        characterCard.style.top = 'auto';
        characterCard.style.left = '0';
        characterCard.style.right = '0';
        characterCard.style.width = '100%';
        characterCard.style.height = '80vh'; 
        characterCard.style.maxWidth = 'none';
        characterCard.style.transform = 'none';
      } else {
        // For larger screens, position on the left side
        characterCard.style.top = '50%';
        characterCard.style.left = '30px';
        characterCard.style.transform = 'translateY(-50%)';
        characterCard.style.height = 'calc(100vh - 100px)';
        characterCard.style.width = '90%';
        characterCard.style.maxWidth = '600px';
      }
      
      // Check if description is scrollable and apply indicator if needed
      const description = this.elements.characterDescription;
      if (description.scrollHeight > description.clientHeight) {
        description.classList.add('scrollable');
      } else {
        description.classList.remove('scrollable');
      }
      
      // Also adjust image size based on current viewport
      const characterImage = document.getElementById('characterImage');
      if (characterImage) {
        if (window.innerWidth < 480) {
          characterImage.style.maxHeight = '30vh';
        } else if (window.innerWidth < 768) {
          characterImage.style.maxHeight = '35vh';
        } else {
          // Use the dynamic sizing based on description length
          const character = characterData[this.currentCharacterIndex];
          if (character && character.description) {
            const descriptionLength = character.description.length;
            let idealMaxHeight;
            
            if (descriptionLength > 500) {
              idealMaxHeight = '35vh';
            } else if (descriptionLength > 300) {
              idealMaxHeight = '40vh';
            } else {
              idealMaxHeight = '45vh';
            }
            
            characterImage.style.maxHeight = idealMaxHeight;
          }
        }
      }
    }
  },
  
  // Track mouse position for raycasting
  onMouseMove(event) {
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Only allow dragging if we're not in a transition animation
    if (this.isDragging && !Animation.isAnimating) {
      const deltaX = (event.clientX - this.previousMousePosition.x) * CONFIG.DRAG_ROTATION_SPEED;
      const deltaY = (event.clientY - this.previousMousePosition.y) * CONFIG.DRAG_ROTATION_SPEED;
      
      // Get camera's right and up vectors
      const cameraRight = new THREE.Vector3(1, 0, 0);
      const cameraUp = new THREE.Vector3(0, 1, 0);
      
      // Transform vectors to be relative to camera orientation
      cameraRight.applyQuaternion(App.camera.quaternion);
      cameraUp.applyQuaternion(App.camera.quaternion);
      
      // Create rotations using camera-relative axes
      const rotationX = new THREE.Quaternion().setFromAxisAngle(cameraUp, -deltaX);
      const rotationY = new THREE.Quaternion().setFromAxisAngle(cameraRight, -deltaY);
      
      // Combine rotations
      const combinedRotation = rotationX.multiply(rotationY);
      
      // Get vector from focus point to camera
      const cameraOffset = new THREE.Vector3().subVectors(App.camera.position, Animation.currentFocusPoint);
      
      // Apply rotation to offset
      cameraOffset.applyQuaternion(combinedRotation);
      
      // Update camera position
      App.camera.position.copy(Animation.currentFocusPoint).add(cameraOffset);
      App.camera.lookAt(Animation.currentFocusPoint.x, Animation.currentFocusPoint.y, Animation.currentFocusPoint.z);
      
      this.dragDistance += Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      this.previousMousePosition = { x: event.clientX, y: event.clientY };
    } else if (!Animation.isAnimating) {
      // Only perform hover checks if not animating
      document.body.style.cursor = 'default';
      this.raycaster.setFromCamera(this.mouse, App.camera);
      const intersects = this.raycaster.intersectObject(CharacterStars.characterStars);
      
      if (intersects.length > 0) {
        const index = intersects[0].index;
        if (filteredCharacters.includes(characterData[index])) {
          // Skip hover effects for currently selected star
          if (index === CharacterStars.selectedStarIndex) {
            this.elements.hoverInfo.style.display = 'none';
            return;
          }

          document.body.style.cursor = 'pointer';
          CharacterStars.hoveredStarIndex = index;
          
          // Update hover info
          const character = characterData[index];
          this.elements.hoverInfo.textContent = character.name;
          
          // Position hover info
          const padding = 15;
          let x = event.clientX + padding;
          let y = event.clientY + padding;
          
          const rect = this.elements.hoverInfo.getBoundingClientRect();
          if (x + rect.width > window.innerWidth) {
            x = event.clientX - rect.width - padding;
          }
          if (y + rect.height > window.innerHeight) {
            y = event.clientY - rect.height - padding;
          }
          
          this.elements.hoverInfo.style.left = `${x}px`;
          this.elements.hoverInfo.style.top = `${y}px`;
          this.elements.hoverInfo.style.display = 'block';
          
          // Only enlarge star if not already selected
          if (index !== CharacterStars.selectedStarIndex) {
            const sizes = CharacterStars.characterStars.geometry.attributes.size.array;
            sizes[index] = CharacterStars.characterStars.geometry.userData.originalSizes[index] * CONFIG.HOVER_MULTIPLIER;
            CharacterStars.characterStars.geometry.attributes.size.needsUpdate = true;
          }
        }
      } else {
        this.elements.hoverInfo.style.display = 'none';
        
        // Reset previously hovered star only if not selected
        if (CharacterStars.hoveredStarIndex !== -1 && CharacterStars.hoveredStarIndex !== CharacterStars.selectedStarIndex) {
          const sizes = CharacterStars.characterStars.geometry.attributes.size.array;
          sizes[CharacterStars.hoveredStarIndex] = CharacterStars.characterStars.geometry.userData.originalSizes[CharacterStars.hoveredStarIndex];
          CharacterStars.characterStars.geometry.attributes.size.needsUpdate = true;
          CharacterStars.hoveredStarIndex = -1;
        }
      }
    }
  },
  
  // Start dragging
  onMouseDown(event) {
    // Only allow starting a drag if we're not in a transition animation
    if (event.button === 0 && !Animation.isAnimating) { // Left mouse button
      this.isDragging = true;
      this.dragStartTime = Date.now();
      this.dragDistance = 0;
      this.previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      this.elements.hoverInfo.style.display = 'none';
      
      // Add global event listeners to handle mouse up even outside the canvas
      document.addEventListener('mouseup', this.onGlobalMouseUp);
      document.addEventListener('mouseleave', this.onGlobalMouseUp);
    }
  },
  
  // Global mouse up handler to ensure drag state is always reset
  onGlobalMouseUp: function(event) {
    UI.onMouseUp(event);
    document.removeEventListener('mouseup', UI.onGlobalMouseUp);
    document.removeEventListener('mouseleave', UI.onGlobalMouseUp);
  },
  
  // Stop dragging and handle click
  onMouseUp(event) {
    // Only handle clicks if we're not in a transition animation
    if (this.isDragging && !Animation.isAnimating) { 
      const dragDuration = Date.now() - this.dragStartTime;
      
      // If it was a short drag with minimal movement, treat as a click
      if (dragDuration < 300 && this.dragDistance < 10) {
        this.handleStarClick();
      }
    }
    
    // Always reset the dragging state
    this.isDragging = false;
  },
  
  // Handle star clicks
  handleStarClick() {
    // Only allow star clicks if we're not in a transition animation
    if (Animation.isAnimating) return;
    
    this.raycaster.setFromCamera(this.mouse, App.camera);
    const intersects = this.raycaster.intersectObject(CharacterStars.characterStars);
    
    if (intersects.length > 0) {
      const index = intersects[0].index;
      // Only proceed if the star is in filtered characters and isn't already selected
      if (filteredCharacters.includes(characterData[index]) && index !== CharacterStars.selectedStarIndex) {
        this.displayCharacterCard(characterData[index]);
      }
    }
  },
  
  // Zoom with mouse wheel
  onWheel(event) {
    // Prevent zooming during transitions
    if (Animation.isAnimating) return;
    
    event.preventDefault();
    
    // Calculate zoom factor
    const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9;
    
    // Calculate new zoom value
    const newZoom = Animation.currentZoom * zoomFactor;
    
    // Clamp to current range
    Animation.currentZoom = Math.max(
      Animation.currentZoomRange.min,
      Math.min(Animation.currentZoomRange.max, newZoom)
    );
    
    // Get direction vector from focus point to camera
    const direction = new THREE.Vector3()
      .subVectors(App.camera.position, Animation.currentFocusPoint)
      .normalize();
    
    // Set new camera position
    App.camera.position.copy(Animation.currentFocusPoint)
      .add(direction.multiplyScalar(Animation.currentZoom));
    
    // Ensure camera is looking at focus point
    App.camera.lookAt(Animation.currentFocusPoint.x, Animation.currentFocusPoint.y, Animation.currentFocusPoint.z);
  },
  
  // Handle wheel events in dropdown with improved behavior
  onDropdownWheel(event) {
    // Prevent the event from propagating to the global handler
    event.stopPropagation();
    
    // Prevent the default scroll behavior to implement custom scrolling
    event.preventDefault();
    
    // Get the dropdown element
    const dropdown = this.elements.searchDropdown;
    
    // Calculate optimal scroll amount - adjust based on content and wheel sensitivity
    const scrollAmount = event.deltaY * 0.8;
    
    // Current scroll position
    const currentScroll = dropdown.scrollTop;
    
    // Max scroll position (scrollHeight minus client height)
    const maxScroll = dropdown.scrollHeight - dropdown.clientHeight;
    
    // Apply the scroll with bounds checking
    if ((currentScroll <= 0 && scrollAmount < 0) || 
        (currentScroll >= maxScroll && scrollAmount > 0)) {
      // At the edges, reduce scroll amount to create a "bounce" effect
      dropdown.scrollTop += scrollAmount * 0.3;
    } else {
      // Normal scrolling
      dropdown.scrollTop += scrollAmount;
    }
  },
  
  // Handle wheel events in character description to prevent starfield zoom
  onDescriptionWheel(event) {
    // Prevent the event from propagating to the global handler
    event.stopPropagation();
    
    // Don't prevent default here - allow normal scrolling behavior within the description
    // The stopPropagation is enough to prevent the starfield zoom
    
    // Get the description element
    const description = this.elements.characterDescription;
    
    // Calculate current and max scroll positions
    const currentScroll = description.scrollTop;
    const maxScroll = description.scrollHeight - description.clientHeight;
    
    // Only prevent default if we're at the boundaries to prevent page scrolling
    if ((currentScroll <= 0 && event.deltaY < 0) || 
        (currentScroll >= maxScroll && event.deltaY > 0)) {
      event.preventDefault();
    }
  },
  
  // Handle wheel events for the entire character card to prevent starfield zoom
  onCardWheel(event) {
    // Prevent the event from propagating to the global handler
    event.stopPropagation();
    
    // We want to allow scrolling within scrollable elements inside the card
    // The description element already has its own handler that will be triggered first
    // For other elements or general card scrolling events, we need to determine if
    // the event should be allowed to continue (for scrollable elements) or be prevented
    
    // Check if the event target is the description or within it (this check is usually redundant
    // because the description handler would catch it first, but added for completeness)
    if (this.elements.characterDescription.contains(event.target) || 
        event.target === this.elements.characterDescription) {
      // Let the description handler handle it
      return;
    }
    
    // If it's within a scrollable element other than the description
    // we should let the native scrolling behavior work
    let isWithinScrollable = false;
    let scrollableParent = null;
    let element = event.target;
    
    // Traverse up to find if we're in a scrollable element
    while (element && element !== this.elements.characterCard) {
      const overflowY = window.getComputedStyle(element).overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        isWithinScrollable = true;
        scrollableParent = element;
        break;
      }
      element = element.parentElement;
    }
    
    // If within a scrollable element, only prevent default at boundaries
    if (isWithinScrollable && scrollableParent) {
      const currentScroll = scrollableParent.scrollTop;
      const maxScroll = scrollableParent.scrollHeight - scrollableParent.clientHeight;
      
      if ((currentScroll <= 0 && event.deltaY < 0) || 
          (currentScroll >= maxScroll && event.deltaY > 0)) {
        event.preventDefault();
      }
    } else {
      // Not in a scrollable element, prevent default to avoid unwanted scrolling
      event.preventDefault();
    }
  },
  
  // Handle keyboard events
  onKeyDown(event) {
    // Close character card and deselect star when Escape key is pressed
    if (event.key === 'Escape' && CharacterStars.selectedStarIndex !== -1) {
      this.closeCharacterCard();
    }
  },
  
  // Handle search input
  onSearchInput(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.filterCharacters(searchTerm);
    this.updateSearchDropdown(searchTerm);
  },
  
  // Handle search focus
  onSearchFocus(event) {
    const searchTerm = event.target.value.toLowerCase();
    this.updateSearchDropdown(searchTerm);
  },
  
  // Handle document clicks to close dropdown when clicking outside
  onDocumentClick(event) {
    if (!this.elements.searchInput || !this.elements.searchDropdown) return;
    
    const isSearchInput = event.target === this.elements.searchInput;
    const isDropdown = this.elements.searchDropdown.contains(event.target);
    
    if (!isSearchInput && !isDropdown) {
      this.elements.searchDropdown.style.display = 'none';
    }
  },
  
  // Update dropdown with matching characters
  updateSearchDropdown(searchTerm) {
    if (!this.elements.searchDropdown) return;
    
    const dropdown = this.elements.searchDropdown;
    dropdown.innerHTML = '';
    
    // Reset the dropdown position to default
    dropdown.classList.remove('search-dropdown-flipped');
    
    // If search is empty, show all characters - not limited to 6
    let matchingCharacters = [];
    
    if (!searchTerm) {
      if (document.activeElement === this.elements.searchInput) {
        // Show all characters on empty search when input is focused
        matchingCharacters = characterData; // Show all characters, not just 6
      } else {
        // Hide dropdown on empty search when input is not focused
        dropdown.style.display = 'none';
        return;
      }
    } else {
      // Find matching characters that start with search term
      matchingCharacters = characterData.filter(character => 
        character.name.toLowerCase().startsWith(searchTerm)
      );
      
      // Remove the 6-character limit to allow scrolling through all matches
      // (removed the slicing code that was here)
    }
    
    // Populate dropdown with matches
    if (matchingCharacters.length > 0) {
      // Force block display with important flag
      dropdown.style.cssText = 'display: block !important; opacity: 1 !important;';
      
      matchingCharacters.forEach(character => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        
        // Create image container
        const imgContainer = document.createElement('div');
        imgContainer.className = 'dropdown-img';
        
        // Create image element with fallback
        const img = document.createElement('img');
        img.alt = character.name;
        
        Utils.loadImageWithFallback(character.image, character.name, (imageUrl) => {
          img.src = imageUrl;
        });
        
        imgContainer.appendChild(img);
        
        // Create text container
        const textContainer = document.createElement('div');
        textContainer.className = 'dropdown-text';
        textContainer.textContent = character.name;
        
        // Add elements to item
        item.appendChild(imgContainer);
        item.appendChild(textContainer);
        
        // Add click event to navigate to character
        item.addEventListener('click', () => {
          this.displayCharacterCard(character);
          this.elements.searchDropdown.style.display = 'none';
        });
        
        dropdown.appendChild(item);
      });
      
      // Force recalculation of layout
      setTimeout(() => {
        dropdown.style.opacity = '0.99';
        setTimeout(() => dropdown.style.opacity = '1', 10);
        
        // Check if dropdown would extend beyond the viewport and adjust if needed
        const rect = dropdown.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        console.log("Dropdown height:", rect.height, "Bottom position:", rect.bottom, "Viewport height:", viewportHeight);
        
        // If the dropdown extends beyond the viewport, adjust max-height instead of flipping
        if (rect.bottom > viewportHeight - 20) {
          const newMaxHeight = viewportHeight - rect.top - 30; // 30px buffer
          dropdown.style.maxHeight = `${newMaxHeight}px`;
          console.log("Adjusted dropdown height to:", newMaxHeight);
        }
      }, 0);
    } else if (searchTerm) {
      // Show "no results" message
      dropdown.style.display = 'block';
      dropdown.innerHTML = '<div class="dropdown-no-results">No characters found</div>';
    } else {
      dropdown.style.display = 'none';
    }
  },
  
  // Filter characters based on search input - MODIFIED to match starting characters only
  filterCharacters(searchTerm) {
    if (searchTerm === '') {
      filteredCharacters = [...characterData];
    } else {
      filteredCharacters = characterData.filter(character => 
        character.name.toLowerCase().startsWith(searchTerm)  // Changed from includes() to startsWith()
      );
    }
    
    if (CharacterStars && CharacterStars.updateCharacterStarVisibility) {
      CharacterStars.updateCharacterStarVisibility();
    }
  },
  
  // Navigate to prev/next character
  navigateCharacters(direction) {
    if (filteredCharacters.length === 0) return;
    
    let newIndex;
    
    if (this.currentCharacterIndex === null) {
      newIndex = direction > 0 ? 0 : filteredCharacters.length - 1;
    } else {
      const currentFilteredIndex = filteredCharacters.indexOf(characterData[this.currentCharacterIndex]);
      newIndex = (currentFilteredIndex + direction + filteredCharacters.length) % filteredCharacters.length;
    }
    
    // Get current star position if we have one
    const currentStarPos = this.currentCharacterIndex !== null ? 
      CharacterStars.getStarWorldPosition(this.currentCharacterIndex) : null;
    
    // Get new star position
    const nextCharacter = filteredCharacters[newIndex];
    const nextIndex = characterData.indexOf(nextCharacter);
    const nextStarPos = CharacterStars.getStarWorldPosition(nextIndex);
    
    // Display the character card (this will also set up the transition)
    this.displayCharacterCard(nextCharacter);
  },
  
  // Select a random character
  selectRandomCharacter() {
    if (filteredCharacters.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * filteredCharacters.length);
    this.displayCharacterCard(filteredCharacters[randomIndex]);
  },
  
  // Display character card function
  displayCharacterCard(character) {
    // Add class to body for mobile CSS rule
    document.body.classList.add('character-card-visible');

    // Safety check
    if (!character) return;
    
    // Get the correct index from the full character data
    const index = characterData.indexOf(character);
    
    // Set up camera transition to selected star
    Animation.setupStarTransition(index, App.camera);
    
    // Update selected star
    CharacterStars.setSelectedStar(index);
    
    // Update UI
    this.currentCharacterIndex = index;
    this.elements.characterName.textContent = character.name;
    
    // Fix for description text - use a span with direct styling
    this.elements.characterDescription.innerHTML = '';
    
    // Split the description by double newlines to handle paragraphs
    const paragraphs = character.description.split('\n\n');
    
    // Create paragraph elements for each section
    paragraphs.forEach(paragraphText => {
        if (paragraphText.trim()) {
            const paragraph = document.createElement('p');
            paragraph.textContent = paragraphText.trim();
            
            // Apply styles directly to the paragraph element
            paragraph.style.color = '#ffffff';
            paragraph.style.opacity = '1';
            paragraph.style.fontWeight = '400';
            paragraph.style.textShadow = 'none';
            paragraph.style.marginBottom = '1em';
            
            this.elements.characterDescription.appendChild(paragraph);
        }
    });
    
    this.elements.homepageLink.href = character.homepage;
    
    // Load image with fallback - using the new img element
    const characterImg = document.getElementById('characterImg');
    if (characterImg) {
      Utils.loadImageWithFallback(character.image, character.name, (imageUrl) => {
        characterImg.src = imageUrl;
        characterImg.alt = character.name;
        
        // Check image dimensions after loading to optimize the layout
        characterImg.onload = () => {
          // If image is wider than it is tall, add a class to adjust styling
          if (characterImg.naturalWidth > characterImg.naturalHeight) {
            characterImg.classList.add('landscape');
          } else {
            characterImg.classList.remove('landscape');
          }
          
          // Calculate ideal image height based on description length
          const descriptionLength = character.description.length;
          let idealMaxHeight;
          
          if (descriptionLength > 500) {
            // For very long descriptions, use less space for image
            idealMaxHeight = '35vh';
          } else if (descriptionLength > 300) {
            // For medium descriptions
            idealMaxHeight = '40vh';
          } else {
            // For short descriptions
            idealMaxHeight = '45vh';
          }
          
          // Set the max-height of the image container dynamically
          const characterImage = document.getElementById('characterImage');
          if (characterImage) {
            characterImage.style.maxHeight = idealMaxHeight;
          }
          
          // Ensure description is properly scrollable
          setTimeout(() => {
            const description = this.elements.characterDescription;
            if (description.scrollHeight > description.clientHeight) {
              // If there's overflow, add a fade indicator
              description.classList.add('scrollable');
            } else {
              description.classList.remove('scrollable');
            }
          }, 50);
        };
      });
    }
    
    // Use navigationContainer instead of searchContainer
    this.elements.navigationContainer.style.display = 'none';
    this.elements.characterCard.style.display = 'flex';
    this.elements.hoverInfo.style.display = 'none';
    
    // Position the card appropriately based on viewport size
    const characterCard = this.elements.characterCard;
    if (window.innerWidth < 600) {
      // For mobile devices, position at the bottom
      characterCard.style.bottom = '0';
      characterCard.style.top = 'auto';
      characterCard.style.left = '0';
      characterCard.style.right = '0';
      characterCard.style.width = '100%';
      characterCard.style.height = '80vh';
      characterCard.style.maxWidth = 'none';
      characterCard.style.transform = 'none';
    } else {
      // For larger screens, position on the left side
      characterCard.style.top = '50%';
      characterCard.style.left = '30px';
      characterCard.style.transform = 'translateY(-50%)';
      characterCard.style.height = 'calc(100vh - 100px)';
      characterCard.style.width = '90%';
      characterCard.style.maxWidth = '600px';
    }
  },
  
  // Close character card function
  closeCharacterCard() {
    // Remove class from body
    document.body.classList.remove('character-card-visible');

    // Set up camera transition back to galaxy view
    Animation.setupGalaxyTransition(App.camera);
    
    // Reset selected star
    CharacterStars.setSelectedStar(-1);
    
    // Reset character image styles
    const characterImg = document.getElementById('characterImg');
    if (characterImg) {
      characterImg.classList.remove('landscape');
      characterImg.src = '';
    }
    
    // Reset the character image container
    const characterImage = document.getElementById('characterImage');
    if (characterImage) {
      characterImage.style.maxHeight = '';
    }
    
    // Reset description
    if (this.elements.characterDescription) {
      this.elements.characterDescription.classList.remove('scrollable');
      this.elements.characterDescription.textContent = '';
    }
    
    // Use navigationContainer instead of searchContainer
    this.elements.navigationContainer.style.display = 'flex';
    this.elements.characterCard.style.display = 'none';
    
    // Reset character card position for next time
    const characterCard = this.elements.characterCard;
    characterCard.style = ''; // Clear all inline styles
    
    this.currentCharacterIndex = null;
  },

  // Add a public method to debug dropdown visibility issues
  debugDropdown() {
    const dropdown = this.elements.searchDropdown;
    if (dropdown) {
      console.log("Dropdown element:", dropdown);
      console.log("Display style:", dropdown.style.display);
      console.log("Computed style:", window.getComputedStyle(dropdown).display);
      console.log("Z-index:", window.getComputedStyle(dropdown).zIndex);
      console.log("Position:", window.getComputedStyle(dropdown).position);
      console.log("Max height:", window.getComputedStyle(dropdown).maxHeight);
      
      // Force display
      dropdown.style.cssText = 'display: block !important; background-color: rgba(255,0,0,0.3) !important; z-index: 9999 !important;';
      
      // Add test content
      dropdown.innerHTML = '<div style="padding: 20px; font-weight: bold; color: white;">Dropdown Debug Content</div>';
      
      // Check if it's visible now
      setTimeout(() => {
        console.log("After force: Display style:", dropdown.style.display);
        console.log("After force: Computed style:", window.getComputedStyle(dropdown).display);
        const rect = dropdown.getBoundingClientRect();
        console.log("Dropdown rect:", rect);
      }, 100);
    }
  },

  // --- Touch Event Handlers ---

  onTouchStart(event) {
    // Allow default behavior if touch starts within the main navbar (menu toggle, logo link)
    const navbar = document.getElementById('main-navbar');
    if (navbar && navbar.contains(event.target)) {
      return; 
    }
    // Allow default behavior if touch starts within the navigation container (search/random)
    if (this.elements.navigationContainer && this.elements.navigationContainer.style.display !== 'none' && this.elements.navigationContainer.contains(event.target)) {
      return; 
    }
    // Prevent interfering with card interactions if the card is visible
    if (this.elements.characterCard && this.elements.characterCard.style.display !== 'none' && this.elements.characterCard.contains(event.target)) {
      return; 
    }
    
    // If touch is not on UI elements, prevent default page scroll/zoom for starfield interaction
    event.preventDefault(); 

    this.touchStartTime = Date.now();
    this.touchDistance = 0;

    if (event.touches.length === 1) {
      this.isTouchDragging = true;
      this.isPinching = false;
      this.touchStartPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      this.lastTouchPos = { ...this.touchStartPos };
      this.elements.hoverInfo.style.display = 'none'; // Hide hover info on touch
    } else if (event.touches.length === 2) {
      this.isTouchDragging = false;
      this.isPinching = true;
      this.previousPinchDistance = this.getPinchDistance(event.touches);
    }
  },

  onTouchMove(event) {
    // Allow default if touch moves over the main navbar
    const navbar = document.getElementById('main-navbar');
    if (navbar && navbar.contains(event.target)) {
       return;
    }
    // Allow default scroll/interaction if touch moves over the navigation container elements
    if (this.elements.navigationContainer && this.elements.navigationContainer.style.display !== 'none' && this.elements.navigationContainer.contains(event.target)) {
       return;
    }
    // Prevent interfering with card interactions if the card is visible
    if (this.elements.characterCard && this.elements.characterCard.style.display !== 'none' && this.elements.characterCard.contains(event.target)) {
        return;
    }
    
    // If touch move is not over UI elements, prevent default page scroll/zoom
    event.preventDefault();

    if (this.isPinching && event.touches.length === 2) {
      // Handle Pinch Zoom
      const currentPinchDistance = this.getPinchDistance(event.touches);
      const zoomFactor = currentPinchDistance / this.previousPinchDistance;
      const newZoom = Animation.currentZoom / zoomFactor; 
      Animation.currentZoom = Math.max(Animation.currentZoomRange.min, Math.min(Animation.currentZoomRange.max, newZoom));
      const direction = new THREE.Vector3().subVectors(App.camera.position, Animation.currentFocusPoint).normalize();
      App.camera.position.copy(Animation.currentFocusPoint).add(direction.multiplyScalar(Animation.currentZoom));
      App.camera.lookAt(Animation.currentFocusPoint.x, Animation.currentFocusPoint.y, Animation.currentFocusPoint.z);
      this.previousPinchDistance = currentPinchDistance;

    } else if (this.isTouchDragging && event.touches.length === 1) {
      // Handle Touch Drag
      const currentTouchPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      const deltaX = (currentTouchPos.x - this.lastTouchPos.x) * CONFIG.DRAG_ROTATION_SPEED;
      const deltaY = (currentTouchPos.y - this.lastTouchPos.y) * CONFIG.DRAG_ROTATION_SPEED;
      const cameraRight = new THREE.Vector3(1, 0, 0);
      const cameraUp = new THREE.Vector3(0, 1, 0);
      cameraRight.applyQuaternion(App.camera.quaternion);
      cameraUp.applyQuaternion(App.camera.quaternion);
      const rotationX = new THREE.Quaternion().setFromAxisAngle(cameraUp, -deltaX);
      const rotationY = new THREE.Quaternion().setFromAxisAngle(cameraRight, -deltaY);
      const combinedRotation = rotationX.multiply(rotationY);
      const cameraOffset = new THREE.Vector3().subVectors(App.camera.position, Animation.currentFocusPoint);
      cameraOffset.applyQuaternion(combinedRotation);
      App.camera.position.copy(Animation.currentFocusPoint).add(cameraOffset);
      App.camera.lookAt(Animation.currentFocusPoint.x, Animation.currentFocusPoint.y, Animation.currentFocusPoint.z);
      this.touchDistance += Math.sqrt(Math.pow(currentTouchPos.x - this.lastTouchPos.x, 2) + Math.pow(currentTouchPos.y - this.lastTouchPos.y, 2));
      this.lastTouchPos = currentTouchPos;
    }
  },

  onTouchEnd(event) {
      // Allow default if touch ends within the main navbar
      const navbar = document.getElementById('main-navbar');
      if (navbar && navbar.contains(event.target)) {
          return; 
      }
      // Allow default behavior if touch ends within the navigation container
      if (this.elements.navigationContainer && this.elements.navigationContainer.style.display !== 'none' && this.elements.navigationContainer.contains(event.target)) {
          return; 
      }
      // Prevent interfering with card interactions - check target of the ended touch
      if (event.changedTouches.length > 0 && this.elements.characterCard && this.elements.characterCard.style.display !== 'none' && this.elements.characterCard.contains(event.changedTouches[0].target)) {
          return;
      }
      
      const touchDuration = Date.now() - this.touchStartTime;

      // Check for Tap on starfield: only if not pinching, drag was short, and only one touch ended
      if (!this.isPinching && this.isTouchDragging && touchDuration < 300 && this.touchDistance < 10 && event.changedTouches.length === 1) {
          // Ensure the tap wasn't on a UI element that slipped through the start check 
          const target = event.changedTouches[0].target;
          const isNavbarTarget = navbar && navbar.contains(target);
          const isNavContainerTarget = this.elements.navigationContainer && this.elements.navigationContainer.style.display !== 'none' && this.elements.navigationContainer.contains(target);
          if (!isNavbarTarget && !isNavContainerTarget) {
              this.handleTap(event.changedTouches[0]);
          }
      }

      // Reset flags when touches end
      if (event.touches.length === 0) {
          this.isTouchDragging = false;
          this.isPinching = false;
          this.previousPinchDistance = 0;
      } else if (event.touches.length === 1) {
          this.isTouchDragging = true;
          this.isPinching = false;
          this.lastTouchPos = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }
  },

  // Helper function to calculate distance between two touches
  getPinchDistance(touches) {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
  },

  // Handle tap on star
  handleTap(touch) {
      // Only allow taps if not animating
      if (Animation.isAnimating) return;

      // Calculate normalized device coordinates from touch
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

      // Perform raycast
      this.raycaster.setFromCamera(this.mouse, App.camera);
      const intersects = this.raycaster.intersectObject(CharacterStars.characterStars);

      if (intersects.length > 0) {
          const index = intersects[0].index;
          // Only proceed if the star is in filtered characters and isn't already selected
          if (filteredCharacters.includes(characterData[index]) && index !== CharacterStars.selectedStarIndex) {
              this.displayCharacterCard(characterData[index]);
          }
      }
  },

  // --- End Touch Event Handlers ---
};