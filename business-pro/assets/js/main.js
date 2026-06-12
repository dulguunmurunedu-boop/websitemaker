// BUSINESS PRO - MAIN JAVASCRIPT

// NAVIGATION SCROLL
window.addEventListener('scroll', function() {
  var navbar = document.getElementById('navbar');
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
});

// MOBILE NAV TOGGLE
var navToggle = document.getElementById('navToggle');
if (navToggle) {
  navToggle.addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// NUMBER COUNTER ANIMATION
function animateNumbers() {
  var numbers = document.querySelectorAll('.stat-number');
  numbers.forEach(function(num) {
    var target = parseInt(num.dataset.count);
    var duration = 2000;
    var step = target / (duration / 16);
    var current = 0;
    var timer = setInterval(function() {
      current += step;
      if (current >= target) {
        num.textContent = target;
        clearInterval(timer);
      } else {
        num.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Intersection Observer for animations
var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.classList.contains('hero-stats')) {
        animateNumbers();
      }
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section, .hero-stats').forEach(function(el) {
  observer.observe(el);
});

// TESTIMONIAL SLIDER
var testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
var testimonialCards = document.querySelectorAll('.testimonial-card');
var currentSlide = 0;

function showSlide(index) {
  testimonialCards.forEach(function(card) { card.classList.remove('active'); });
  testimonialDots.forEach(function(dot) { dot.classList.remove('active'); });
  if (testimonialCards[index]) testimonialCards[index].classList.add('active');
  if (testimonialDots[index]) testimonialDots[index].classList.add('active');
  currentSlide = index;
}

testimonialDots.forEach(function(dot) {
  dot.addEventListener('click', function() {
    showSlide(parseInt(this.dataset.slide));
  });
});

// Auto-rotate testimonials
setInterval(function() {
  var next = (currentSlide + 1) % testimonialCards.length;
  showSlide(next);
}, 5000);

// FAQ ACCORDION
var faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(function(item) {
  var question = item.querySelector('.faq-question');
  question.addEventListener('click', function() {
    var isActive = item.classList.contains('active');
    faqItems.forEach(function(i) { i.classList.remove('active'); });
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// TEMPLATE FILTER (for marketplace page)
function filterTemplates() {
  var search = '';
  var searchInput = document.getElementById('templateSearch');
  if (searchInput) search = searchInput.value.toLowerCase();
  
  var filter = 'all';
  var activeBtn = document.querySelector('.filter-btn.active');
  if (activeBtn) filter = activeBtn.dataset.filter;
  
  var cards = document.querySelectorAll('.template-card');
  var visible = 0;
  
  cards.forEach(function(card) {
    var category = card.dataset.category ? card.dataset.category.toLowerCase() : '';
    var name = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
    var matchFilter = (filter === 'all') || (category === filter.toLowerCase());
    var matchSearch = (search === '') || (name.indexOf(search) !== -1) || (category.indexOf(search) !== -1);
    if (matchFilter && matchSearch) {
      card.style.display = '';
      card.classList.add('fade-in');
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  
  var empty = document.getElementById('marketplaceEmpty');
  if (empty) {
    if (visible === 0) empty.classList.add('show');
    else empty.classList.remove('show');
  }
}

// RENDER TEMPLATES (for marketplace page)
function renderTemplates() {
  var grid = document.getElementById('marketplaceGrid');
  if (!grid || typeof templates === 'undefined') return;
  
  grid.innerHTML = templates.map(function(t, i) {
    return '<div class="template-card" data-category="' + t.category + '" data-idx="' + i + '">' +
      '<div class="template-preview ' + t.theme + '-theme">' +
        '<div class="template-header"><span class="template-url">' + t.url + '</span><span class="template-dots"><span></span><span></span><span></span></span></div>' +
        '<div class="template-hero"><h4>' + t.name + '</h4><p>' + t.name + ' вэбсайт</p></div>' +
        '<div class="template-features">' + t.features.map(function(f) { return '<span>' + f + '</span>'; }).join('') + '</div>' +
      '</div>' +
      '<div class="template-overlay"><span class="template-overlay-btn">Live Preview →</span></div>' +
      '<div class="template-info">' +
        (t.badge ? '<div class="template-badge">' + t.badge + '</div>' : '') +
        '<div class="template-category" style="color:' + t.color + '">' + t.category + '</div>' +
        '<h3>' + t.name + '</h3>' +
        '<div class="template-price" style="background:' + t.gradient + ';-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">' + t.price + '</div>' +
        '<div class="template-delivery">⚡ ' + t.delivery + '</div>' +
        '<div class="template-social-proof">' + t.socialProof + '</div>' +
        '<button class="btn btn-ghost template-btn">Live Preview →</button>' +
      '</div>' +
    '</div>';
  }).join('');
}

// OPEN TEMPLATE MODAL
function openModal(idx) {
  var modal = document.getElementById('templateModal');
  if (!modal || typeof templates === 'undefined') return;
  var t = templates[idx];
  if (!t) return;
  
  var modalTitle = document.getElementById('modalTitle');
  var modalCategory = document.getElementById('modalCategory');
  var modalPrice = document.getElementById('modalPrice');
  var modalFeatures = document.getElementById('modalFeatures');
  
  if (modalTitle) modalTitle.textContent = t.name;
  if (modalCategory) modalCategory.textContent = t.category;
  if (modalPrice) modalPrice.textContent = t.price;
  if (modalFeatures) {
    modalFeatures.innerHTML = t.features.map(function(f) {
      return '<div class="modal-feature"><i class="fas fa-check"></i> ' + f + '</div>';
    }).join('');
  }
  
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

// CLOSE MODAL
function closeModal() {
  var modal = document.getElementById('templateModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // Render templates if on marketplace page
  if (document.getElementById('marketplaceGrid')) {
    renderTemplates();
  }
  
  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      filterTemplates();
    });
  });
  
  // Search
  var searchInput = document.getElementById('templateSearch');
  if (searchInput) searchInput.addEventListener('input', filterTemplates);
  
  // Marketplace card click
  var grid = document.getElementById('marketplaceGrid');
  if (grid) {
    grid.addEventListener('click', function(e) {
      var card = e.target.closest('.template-card');
      if (card) {
        var idx = parseInt(card.dataset.idx);
        if (!isNaN(idx)) openModal(idx);
      }
    });
  }
  
  // Modal close
  var modalClose = document.querySelector('.modal-close');
  if (modalClose) modalClose.addEventListener('click', closeModal);
  
  var modal = document.getElementById('templateModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
});
