/**
 * GitHub Explorer Framework - Main Script
 * 
 * Handles:
 * - Navigation between content sections
 * - Search functionality across all content
 * - Submenu toggle functionality
 */

document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const navLinks = document.querySelectorAll('.heb-menu a');
    const contentSections = document.querySelectorAll('.conteudo-lateral');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const submenuToggles = document.querySelectorAll('.toggle-submenu');

    /**
     * Initialize the page with default active section
     */
    function initializePage() {
        // Activate first nav link and content section by default
        navLinks[0].classList.add('active');
        contentSections[0].classList.add('active');
    }

    /**
     * Handle navigation between content sections
     */
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                
                // Remove active class from all links and sections
                navLinks.forEach(l => l.classList.remove('active'));
                contentSections.forEach(c => c.classList.remove('active'));

                // Add active class to clicked link and target section
                this.classList.add('active');
                const targetId = this.getAttribute('data-target');
                document.getElementById(targetId).classList.add('active');
            });
        });
    }

    /**
     * Search functionality that searches through all visible content
     */
    function setupSearch() {
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Remove previous messages
        const existingMessage = document.querySelector('.no-results');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (searchTerm === '') {
            // If empty, show everything
            contentSections.forEach(section => {
                section.style.display = 'block';
            });
            return;
        }

        const words = searchTerm.split(' ');
        const pageText = document.body.textContent.toLowerCase();

        const allWordsFound = words.every(word => pageText.includes(word));

        // Hide all content first
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        if (allWordsFound) {
            // If something was found, show all sections (or customize this)
            contentSections.forEach(section => {
                section.style.display = 'block';
            });
        } else {
            // Display "no results" message
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found for: ' + searchTerm;
            document.querySelector('.container').prepend(noResults);
        }
    }

    // Events
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}


    /**
     * Handle submenu toggle functionality
     */
    function setupSubmenus() {
        submenuToggles.forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const parent = this.closest('.submenu');
                parent.classList.toggle('active');
                
                // Rotate chevron icon
                const chevron = this.querySelector('.chevron-icon');
                if (chevron) {
                    chevron.classList.toggle('rotate');
                }
            });
        });
    }

    // Initialize all functionality
    initializePage();
    setupNavigation();
    setupSearch();
    setupSubmenus();
});
