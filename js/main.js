// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.createElement('div');
mobileNav.className = 'mobile-nav';
mobileNav.innerHTML = `
  <button class="mobile-close" id="mobileClose"><i class="fas fa-times"></i></button>
  <a href="#services" class="mobile-link">Services</a>
  <a href="#portfolio" class="mobile-link">Portfolio</a>
  <a href="#about" class="mobile-link">About</a>
  <a href="#contact" class="mobile-link">Contact</a>
`;
document.body.appendChild(mobileNav);

const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileNav.classList.remove('open'));
});

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thanks for reaching out! I will get back to you soon.');
    contactForm.reset();
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .portfolio-card, .process-card, .pricing-card').forEach(el => {
  observer.observe(el);
});

// ===== HERO FADE IN =====
window.addEventListener('load', () => {
  document.querySelector('.hero-content').classList.add('hero-visible');
});
