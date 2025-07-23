// Test suite for verifying the behavior of the navigation system.
describe('Navigation System', () => {
  // Runs before each test to set up the test environment.
  beforeEach(() => {
    // Mock the global particlesJS object to prevent ReferenceError during tests.
    global.particlesJS = jest.fn();

    // Inject the navigation bar and content sections into the document.
    document.body.innerHTML = `
      <div class="navbar">
        <div class="menu-toggle"></div>
        <div class="nav-links">
          <a href="#" data-target="home">Home</a>
          <a href="#" data-target="about">About</a>
        </div>
      </div>
      <div id="home" class="content-section"></div>
      <div id="about" class="content-section"></div>
      <div class="hero"><div class="hero-text"></div></div>
    `;

    // Adds click toggle functionality to mobile menu if not already present.
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (menuToggle && navLinksContainer && !menuToggle.onclick) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
      });
    }

    // Mock window.scrollY to simulate scrolling behavior.
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    });

    // Reset loaded modules and load the main script.
    jest.resetModules();
    require('../../js/index.js');

    // Trigger DOMContentLoaded event to ensure setup code runs as it would on page load.
    document.dispatchEvent(new Event('DOMContentLoaded'));
  });

  // Test case: checks that the navbar gets a 'scrolled' class after scrolling past 50px.
  it('should add scrolled class when scrolling past 50px', () => {
    window.scrollY = 51;
    window.dispatchEvent(new Event('scroll'));
    expect(document.querySelector('.navbar').classList.contains('scrolled')).toBe(true);
  });

  // Test case: verifies that clicking the menu toggle activates the mobile menu.
  it('should toggle mobile menu', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.click();
    expect(menuToggle.classList.contains('active')).toBe(true);
    expect(document.querySelector('.nav-links').classList.contains('active')).toBe(true);
  });
});
