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
        // Get all searchable elements (cards, list items, etc.)
        const searchableElements = document.querySelectorAll('[data-search], .conteudo-lateral');

        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, show all content
                contentSections.forEach(section => section.style.display = 'block');
                document.querySelectorAll('[data-search]').forEach(el => el.style.display = 'block');
                return;
            }

            // First hide all content sections
            contentSections.forEach(section => section.style.display = 'none');
            
            // Search through all elements with data-search attribute
            let foundResults = false;
            
            document.querySelectorAll('[data-search]').forEach(element => {
                const searchText = element.getAttribute('data-search').toLowerCase();
                if (searchText.includes(searchTerm)) {
                    element.style.display = 'block';
                    // Show the parent section
                    const parentSection = element.closest('.conteudo-lateral');
                    if (parentSection) {
                        parentSection.style.display = 'block';
                        foundResults = true;
                    }
                } else {
                    element.style.display = 'none';
                }
            });

            // Search through content text (for deeper content searching)
            if (!foundResults) {
                contentSections.forEach(section => {
                    const sectionText = section.textContent.toLowerCase();
                    if (sectionText.includes(searchTerm)) {
                        section.style.display = 'block';
                        foundResults = true;
                    }
                });
            }

            // If no results found, show a message
            if (!foundResults) {
                const noResults = document.createElement('div');
                noResults.className = 'no-results';
                noResults.textContent = 'No results found for: ' + searchTerm;
                
                // Check if message already exists
                const existingMessage = document.querySelector('.no-results');
                if (!existingMessage) {
                    document.querySelector('.container').prepend(noResults);
                }
            } else {
                // Remove no results message if it exists
                const existingMessage = document.querySelector('.no-results');
                if (existingMessage) {
                    existingMessage.remove();
                }
            }
        }

        // Event listeners for search
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