describe('Search Functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="searchInput" />
      <button id="searchButton"></button>
      <div class="container">
        <div id="section1" class="conteudo-lateral">Test content</div>
        <div id="section2" class="conteudo-lateral">Another section</div>
      </div>
    `;
    
    require('../../script.js');
  });

  it('should show matching section when searching', () => {
    const searchInput = document.getElementById('searchInput');
    searchInput.value = 'Another';
    document.getElementById('searchButton').click();
    
    expect(document.getElementById('section1').style.display).toBe('none');
    expect(document.getElementById('section2').style.display).toBe('block');
  });
});