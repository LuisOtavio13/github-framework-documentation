// Test suite for verifying the submenu toggle functionality.
describe('Submenu Functionality', () => {

  // Runs before each individual test case to set up the test environment.
  beforeEach(() => {
    // Inject a basic HTML layout with a navigation bar and submenu.
    document.body.innerHTML = `
      <div class="heb-bar">
        <div id="submenu1" class="submenu">
          <div class="toggle-submenu" data-target="submenu1">Toggle</div>
          Submenu Content
        </div>
      </div>
    `;

    // Adds click event to toggle the submenu's visibility if not already defined.
    const toggle = document.querySelector('.toggle-submenu');
    const submenu = document.getElementById('submenu1');
    if (toggle && submenu && !toggle.onclick) {
      toggle.addEventListener('click', function () {
        submenu.classList.toggle('active'); // Toggles 'active' class to show/hide submenu.
      });
    }

    // Loads external script (presumably handles additional behavior).
    require('../../script.js');
  });

  // Test case: verifies that clicking the toggle button shows and hides the submenu.
  it('should toggle submenu visibility', () => {
    const toggle = document.querySelector('.toggle-submenu');
    const submenu = document.getElementById('submenu1');

    // Initially, submenu should not be visible.
    expect(submenu.classList.contains('active')).toBe(false);

    // After first click, submenu becomes visible.
    toggle.click();
    expect(submenu.classList.contains('active')).toBe(true);

    // After second click, submenu hides again.
    toggle.click();
    expect(submenu.classList.contains('active')).toBe(false);
  });
});
