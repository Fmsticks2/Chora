// Theme Toggle Functionality
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeIcon = document.querySelector('.theme-icon');
    this.body = document.body;
    
    this.init();
  }
  
  init() {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme') || 'dark';
    this.setTheme(savedTheme);
    
    // Add event listener for theme toggle
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
  
  setTheme(theme) {
    if (theme === 'light') {
      this.body.classList.add('light-mode');
      this.themeIcon.textContent = '☀️';
    } else {
      this.body.classList.remove('light-mode');
      this.themeIcon.textContent = '🌙';
    }
    localStorage.setItem('theme', theme);
  }
  
  toggleTheme() {
    const currentTheme = this.body.classList.contains('light-mode') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Mobile Navigation
class MobileNav {
  constructor() {
    this.hamburger = document.getElementById('hamburger');
    this.navMenu = document.getElementById('nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when clicking on nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
  
  toggleMenu() {
    this.hamburger.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = this.hamburger.querySelectorAll('span');
    if (this.hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
  
  closeMenu() {
    this.hamburger.classList.remove('active');
    this.navMenu.classList.remove('active');
    
    const spans = this.hamburger.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Intersection Observer for Animations
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
      '.feature-card, .step, .chain-item, .card'
    );
    
    animateElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      this.observer.observe(el);
    });
  }
}

// Newsletter Form Handler
class NewsletterForm {
  constructor() {
    this.form = document.querySelector('.newsletter-form');
    this.emailInput = document.querySelector('.email-input');
    
    this.init();
  }
  
  init() {
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }
  
  handleSubmit(e) {
    e.preventDefault();
    
    const email = this.emailInput.value.trim();
    
    if (!this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission
    this.showMessage('Thank you for joining our waitlist!', 'success');
    this.emailInput.value = '';
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message
    const messageEl = document.createElement('div');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = message;
    
    // Style the message
    messageEl.style.cssText = `
      margin-top: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      text-align: center;
      ${type === 'success' 
        ? 'background: rgba(0, 255, 163, 0.1); color: #00FFA3; border: 1px solid rgba(0, 255, 163, 0.3);'
        : 'background: rgba(255, 0, 0, 0.1); color: #ff6b6b; border: 1px solid rgba(255, 0, 0, 0.3);'
      }
    `;
    
    // Insert message after form
    this.form.parentNode.insertBefore(messageEl, this.form.nextSibling);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageEl.parentNode) {
        messageEl.remove();
      }
    }, 5000);
  }
}

// Navbar Scroll Effect
class NavbarScroll {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.lastScrollY = window.scrollY;
    
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      this.navbar.style.background = 'rgba(13, 17, 23, 0.95)';
      this.navbar.style.backdropFilter = 'blur(20px)';
    } else {
      this.navbar.style.background = 'rgba(13, 17, 23, 0.9)';
      this.navbar.style.backdropFilter = 'blur(10px)';
    }
    
    this.lastScrollY = currentScrollY;
  }
}

// Particle Animation (Simple CSS-based)
class ParticleAnimation {
  constructor() {
    this.container = document.querySelector('.floating-particles');
    this.init();
  }
  
  init() {
    if (!this.container) return;
    
    // Create floating particles
    for (let i = 0; i < 20; i++) {
      this.createParticle();
    }
  }
  
  createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const duration = 3 + Math.random() * 4;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      top: ${y}%;
      width: 2px;
      height: 2px;
      background: rgba(0, 255, 255, 0.6);
      border-radius: 50%;
      animation: float ${duration}s ease-in-out infinite ${delay}s;
      pointer-events: none;
    `;
    
    this.container.appendChild(particle);
  }
}

// Button Click Effects
class ButtonEffects {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('.btn').forEach(button => {
      button.addEventListener('click', (e) => this.createRipple(e));
    });
  }
  
  createRipple(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Add CSS for animations
const animationStyles = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    .nav-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(13, 17, 23, 0.98);
      backdrop-filter: blur(20px);
      flex-direction: column;
      padding: 2rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav-menu.active {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
    }
  }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
  new MobileNav();
  new SmoothScroll();
  new AnimationObserver();
  new NewsletterForm();
  new NavbarScroll();
  new ParticleAnimation();
  new ButtonEffects();
  
  // Add loading animation
  document.body.classList.add('loaded');
});

// Add loading styles
const loadingStyles = `
  body {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  
  body.loaded {
    opacity: 1;
  }
`;

const loadingStyleSheet = document.createElement('style');
loadingStyleSheet.textContent = loadingStyles;
document.head.appendChild(loadingStyleSheet);

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    MobileNav,
    SmoothScroll,
    AnimationObserver,
    NewsletterForm,
    NavbarScroll,
    ParticleAnimation,
    ButtonEffects
  };
}