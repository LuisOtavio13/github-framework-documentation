describe('Submenu Functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="heb-bar">
        <div class="toggle-submenu" data-target="submenu1">Toggle</div>
        <div id="submenu1" class="submenu">Submenu Content</div>
      </div>
    `;
    require('../../script.js');
  });

  it('should toggle submenu visibility', () => {
    const toggle = document.querySelector('.toggle-submenu');
    const submenu = document.getElementById('submenu1');
    expect(submenu.style.display).not.toBe('block');
    toggle.click();
    expect(submenu.style.display).toBe('block');
    toggle.click();
    expect(submenu.style.display).toBe('none');
  });
});