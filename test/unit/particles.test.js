describe('Particles Integration', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="hero">
        <div class="hero-text"></div>
      </div>
    `;
    
    // Mock particlesJS
    global.particlesJS = jest.fn();
    
    require('../../js/index.js');
  });

  it('should create particles container', () => {
    expect(document.getElementById('particles-js')).not.toBeNull();
  });

  it('should initialize particlesJS', () => {
    expect(particlesJS).toHaveBeenCalled();
  });
});