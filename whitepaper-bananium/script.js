// This file is ready for your JavaScript code.
// You can add interactivity or dynamic content loading here. 

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page-content');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    // Function to show a specific page
    function showPage(pageId) {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });

        // Show the selected page
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
        } else {
            // Fallback to home if pageId is invalid or not found
            const homePage = document.getElementById('home');
            if (homePage) homePage.classList.add('active');
            pageId = 'home'; // Set pageId to home for nav link update
            console.warn(`Page with ID '${pageId}' not found. Showing home page.`);
        }

        // Update active state in navigation
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // If on mobile, close the sidebar after navigation
        if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Set up navigation link click handlers (both sidebar and page navigation)
    document.body.addEventListener('click', function(e) {
        // Check if the clicked element or its parent is a navigation link
        const navLink = e.target.closest('a[data-page]');
        if (navLink) {
            e.preventDefault();
            const pageId = navLink.getAttribute('data-page');
            showPage(pageId);

            // Update URL hash for bookmarking/history
            // Use replaceState to avoid cluttering history for simple page switches
            // Use pushState if you want browser back/forward to work between pages
            history.pushState({ page: pageId }, ``, `#${pageId}`);
        }
    });

    // Toggle sidebar on mobile
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.page) {
            showPage(e.state.page);
        } else {
            // Handle initial load or cases where state is missing
            const hash = window.location.hash.substring(1);
            showPage(hash || 'home'); // Default to home if no hash
        }
    });

    // Check URL hash on initial page load
    const initialHash = window.location.hash.substring(1);
    showPage(initialHash || 'home');
    // Set initial state for history
    history.replaceState({ page: initialHash || 'home' }, ``, `#${initialHash || 'home'}`);

    // Handle window resize: Ensure sidebar is hidden if screen becomes large
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
}); 