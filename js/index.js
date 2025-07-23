document.addEventListener('DOMContentLoaded', function() {
  // Elementos DOM
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a:not([data-target=""])'); // Exclui links sem data-target
  const contentSections = document.querySelectorAll('.content-section');
  const heroSection = document.querySelector('.hero');
  
  // 1. Efeito de Scroll na Navbar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Menu Mobile
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // 3. Sistema de Navegação
  function setupNavigation() {
    // Mostra uma seção específica
    function showSection(sectionId) {
      // Esconde todas as seções
      contentSections.forEach(section => {
        section.style.display = 'none';
      });
      
      // Mostra a seção selecionada
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.style.display = 'block';
        
        // Scroll suave para a seção
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }
      
      // Atualiza o link ativo na navbar
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === sectionId) {
          link.classList.add('active');
        }
      });
      
      // Fecha o menu mobile se estiver aberto
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    }
    
    // Configura os eventos de clique nos links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetSection = this.getAttribute('data-target');
        
        // Só previne o comportamento padrão para links internos
        if (targetSection) {
          e.preventDefault();
          showSection(targetSection);
          history.pushState(null, null, `#${targetSection}`);
        }
        // Links sem data-target (como Documentation) seguirão normalmente
      });
    });
    
    // Verifica a hash da URL ao carregar a página
    function checkInitialHash() {
      const initialHash = window.location.hash.substring(1);
      if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
      } else {
        // Mostra a seção home por padrão
        showSection('home');
      }
    }
    
    // Verifica mudanças na hash
    window.addEventListener('hashchange', function() {
      const newHash = window.location.hash.substring(1);
      if (newHash && document.getElementById(newHash)) {
        showSection(newHash);
      }
    });
    
    // Inicializa
    checkInitialHash();
  }

  // 4. Fechar menu ao clicar fora
  document.addEventListener('click', function(e) {
    if (!navLinksContainer.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        navLinksContainer.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    }
  });

  // Inicializa a navegação
  setupNavigation();
});