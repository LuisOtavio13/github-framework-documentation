describe('Navigation System', () => {
  beforeEach(() => {
    // Setup mock DOM
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
    `;
    
    // Initialize your navigation script
    require('../../js/index.js');
  });

  it('should add scrolled class when scrolling past 50px', () => {
    window.scrollY = 51;
    window.dispatchEvent(new Event('scroll'));
    expect(document.querySelector('.navbar').classList.contains('scrolled')).toBe(true);
  });

  it('should toggle mobile menu', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    menuToggle.click();
    expect(menuToggle.classList.contains('active')).toBe(true);
    expect(document.querySelector('.nav-links').classList.contains('active')).toBe(true);
  });
});