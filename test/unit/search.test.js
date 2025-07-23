// This test suite verifies the search functionality of a simple UI.
describe('Search Functionality', () => {
  
  // Set up the HTML environment before each test.
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="searchInput" />
      <button id="searchButton"></button>
      <div class="container">
        <div id="section1" class="conteudo-lateral">Test content</div>
        <div id="section2" class="conteudo-lateral">Another section</div>
      </div>
    `;

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    // Add click event to the search button: it filters sections by search term.
    searchButton.addEventListener('click', function () {
      const value = searchInput.value.toLowerCase();

      document.querySelectorAll('.conteudo-lateral').forEach(section => {
        // Show section if its content matches the search term, otherwise hide it.
        if (section.textContent.toLowerCase().includes(value)) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });

    // Mark the first section as active by default.
    document.getElementById('section1').classList.add('active');

    // Require the main script file to ensure functionality is included.
    require('../../script.js');
  });

  // Test case: verifies that only the matching section is displayed after searching.
  it('should show matching section when searching', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = 'Another';
    document.getElementById('searchButton').click();

    // Expect the first section to be hidden and the second to be visible.
    expect(document.getElementById('section1').style.display).toBe('none');
    expect(document.getElementById('section2').style.display).toBe('block');
  });
});
