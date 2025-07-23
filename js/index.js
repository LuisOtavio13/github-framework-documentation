document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links a:not([data-target=""])'); // Excludes links without data-target
  const contentSections = document.querySelectorAll('.content-section');
  const heroSection = document.querySelector('.hero');

  // 1. Navbar Scroll Effect
  // Adds or removes the 'scrolled' class to the navbar depending on scroll position
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  // Toggles menu visibility on smaller screens
  menuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
  });

  // 3. Navigation System
  function setupNavigation() {
    // Displays a specific section based on ID
    function showSection(sectionId) {
      // Hide all sections
      contentSections.forEach(section => {
        section.style.display = 'none';
      });

      // Show selected section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.style.display = 'block';

        // Smooth scroll to the section
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
      }

      // Update active link in navbar
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === sectionId) {
          link.classList.add('active');
        }
      });

      // Close mobile menu if open
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    }

    // Set up click events on navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetSection = this.getAttribute('data-target');
        
        // Prevent default only for internal links
        if (targetSection) {
          e.preventDefault();
          showSection(targetSection);
          history.pushState(null, null, `#${targetSection}`);
        }
        // External/documentation links behave normally
      });
    });

    // Check initial hash when the page loads
    function checkInitialHash() {
      const initialHash = window.location.hash.substring(1);
      if (initialHash && document.getElementById(initialHash)) {
        showSection(initialHash);
      } else {
        // Default to 'home' section
        showSection('home');
      }
    }

    // Listen for URL hash changes
    window.addEventListener('hashchange', function() {
      const newHash = window.location.hash.substring(1);
      if (newHash && document.getElementById(newHash)) {
        showSection(newHash);
      }
    });

    // Initialize navigation system
    checkInitialHash();
  }

  // 4. Close Mobile Menu When Clicking Outside
  document.addEventListener('click', function(e) {
    if (!navLinksContainer.contains(e.target) && 
        !menuToggle.contains(e.target) &&
        navLinksContainer.classList.contains('active')) {
      menuToggle.classList.remove('active');
      navLinksContainer.classList.remove('active');
    }
  });

  // Initialize navigation setup
  setupNavigation();
});
document.addEventListener('DOMContentLoaded', function() {
  // 1. Create particle container
  const particlesContainer = document.createElement('div');
  particlesContainer.id = 'particles-js';
  particlesContainer.style.position = 'absolute';
  particlesContainer.style.top = '0';
  particlesContainer.style.left = '0';
  particlesContainer.style.width = '100%';
  particlesContainer.style.height = '100%';
  particlesContainer.style.zIndex = '-1';
  particlesContainer.style.background = '#0d1117'; // Dark background

  // Insert particle container inside hero section
  const heroSection = document.querySelector('.hero');
  heroSection.style.position = 'relative';
  heroSection.style.overflow = 'hidden';
  heroSection.insertBefore(particlesContainer, heroSection.firstChild);

  // 2. Particle.js Configuration
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": ["#d6e4f0", "#a8c0d6", "#7a9bbc"] // Light blue shades
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        }
      },
      "opacity": {
        "value": 0.7,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#fcfdff", // Pure white
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": true,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "push": {
          "particles_nb": 4
        }
      }
    },
    "retina_detect": true
  });

  // 3. Ensure hero content appears above particles
  const heroContent = document.querySelector('.hero-text');
  const heroCode = document.querySelector('.hero-code');
  if (heroContent) heroContent.style.position = 'relative';
  if (heroCode) heroCode.style.position = 'relative';
});
