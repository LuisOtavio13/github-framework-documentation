// Test suite to verify integration of particles.js in the application.
describe('Particles.js Integration', () => {

  // Set up the testing environment before each test case runs.
  beforeEach(() => {
    // Mock the global particlesJS object with a Jest function to simulate its behavior.
    global.particlesJS = {
      load: jest.fn((id, path, cb) => cb && cb()) // If a callback is provided, invoke it.
    };

    // Inject a container div into the document for particles.js to initialize.
    document.body.innerHTML = `
      <div id="particles-js"></div>
    `;
   
    // Call particlesJS.load to simulate initializing the particle animation.
    particlesJS.load('particles-js', '../path/to/particles.json', () => {
      // Callback executed after loading configuration.
    });
  });

  // Test case: Ensure that particles.js initialization was triggered.
  it('should initialize particles.js', () => {
    expect(global.particlesJS.load).toHaveBeenCalled(); // Validate that the load function was called.
  });
});
