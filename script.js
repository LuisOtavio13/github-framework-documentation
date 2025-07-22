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
    const sidebar = document.querySelector('.heb-bar'); // Elemento da sidebar

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
 * Implements the search functionality by displaying only the first matching content section.
 */
function setupSearch() {
    // Stores the originally visible section before any search is performed
    let originalActiveSection = null;

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        // Removes any previous "no results" message
        const existingMessage = document.querySelector('.no-results');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (searchTerm === '') {
            // If search is empty, restore the original section state
            if (originalActiveSection) {
                // Hide all content sections
                contentSections.forEach(section => {
                    section.style.display = 'none';
                });
                // Show only the previously active section
                originalActiveSection.style.display = 'block';
                originalActiveSection = null; // Reset
            }
            return;
        }

        // On the first search, store the currently active section
        if (!originalActiveSection) {
            contentSections.forEach(section => {
                if (section.classList.contains('active')) {
                    originalActiveSection = section;
                }
            });
        }

        // Hide all sections
        contentSections.forEach(section => {
            section.style.display = 'none';
        });

        let firstMatch = null;

        // Find the first section that contains the search term
        for (const section of contentSections) {
            const sectionText = section.textContent.toLowerCase();
            if (sectionText.includes(searchTerm)) {
                firstMatch = section;
                break;
            }
        }

        if (firstMatch) {
            // Show only the matched section
            firstMatch.style.display = 'block';
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // Show a "no results found" message
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.textContent = 'No results found for: ' + searchTerm;
            document.querySelector('.container').prepend(noResults);
        }
    }

    // Event listeners
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