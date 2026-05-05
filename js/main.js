// =============================================
//   EXCLUSIVE - E-Commerce JavaScript
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Countdown Timer (Flash Sale) ---- */
  function startCountdown(targetId, hours, minutes, seconds) {
    let total = hours * 3600 + minutes * 60 + seconds;
    const el = document.getElementById(targetId);
    if (!el) return;

    const hEl = el.querySelector('.h');
    const mEl = el.querySelector('.m');
    const sEl = el.querySelector('.s');

    function tick() {
      if (total <= 0) { clearInterval(timer); return; }
      total--;
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      if (hEl) hEl.textContent = String(h).padStart(2, '0');
      if (mEl) mEl.textContent = String(m).padStart(2, '0');
      if (sEl) sEl.textContent = String(s).padStart(2, '0');
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  startCountdown('flash-countdown', 3, 23, 19);
  startCountdown('banner-countdown', 5, 59, 35);

 /* ---- Hero Slider ---- */
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(n) {
  slides.forEach(s => {
    s.style.opacity = '0';
    s.style.zIndex = '0';
  });
  dots.forEach(d => d.classList.remove('active'));

  currentSlide = (n + slides.length) % slides.length;

  slides[currentSlide].style.opacity = '1';
  slides[currentSlide].style.zIndex = '1';
  dots[currentSlide].classList.add('active');
}

function startSlider() {
  clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 4000);
}

goToSlide(0);
startSlider();

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    goToSlide(i);
    startSlider();
  });
});

const prevBtn = document.querySelector('.hero-prev');
const nextBtn = document.querySelector('.hero-next');
if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); startSlider(); });
if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); startSlider(); });

  /* ---- Wishlist / Cart Toggle ---- */
  const wishlistBtns = document.querySelectorAll('.wishlist-btn');
  wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      const icon = this.querySelector('i');
      if (this.classList.contains('active')) {
        icon.className = 'fas fa-heart';
        icon.style.color = '#DB4444';
        showToast('Added to wishlist!');
      } else {
        icon.className = 'far fa-heart';
        icon.style.color = '';
        showToast('Removed from wishlist');
      }
    });
  });

  let cartCount = 0;
  const cartBadge = document.querySelector('.cart-badge');
  const addCartBtns = document.querySelectorAll('.product-add-cart');
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      cartCount++;
      if (cartBadge) cartBadge.textContent = cartCount;
      const productName = this.closest('.product-card').querySelector('.product-name')?.textContent || 'Item';
      showToast(`"${productName}" added to cart!`);
    });
  });

  /* ---- Toast Notification ---- */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  /* ---- Filter Tabs ---- */
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', function () {
      filterTabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ---- Category Cards ---- */
  const catCards = document.querySelectorAll('.category-card');
  catCards.forEach(card => {
    card.addEventListener('click', function () {
      catCards.forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  /* ---- Scroll To Top ---- */
  const scrollTopBtn = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
    if (scrollTopBtn) {
      if (window.scrollY > 400) scrollTopBtn.classList.add('show');
      else scrollTopBtn.classList.remove('show');
    }
  });
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- Sticky Header Shadow ---- */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 0) header.style.boxShadow = '0 2px 16px rgba(0,0,0,0.1)';
      else header.style.boxShadow = '';
    }
  });

  /* ---- Newsletter Form ---- */
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input?.value) {
        showToast('Subscribed successfully!');
        input.value = '';
      }
    });
  }

  /* ---- Search ---- */
  const searchInput = document.querySelector('.search-bar input');
  const searchBtn = document.querySelector('.search-bar button');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      if (searchInput?.value.trim()) showToast(`Searching for "${searchInput.value}"...`);
    });
  }
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) showToast(`Searching for "${searchInput.value}"...`);
    });
  }

  /* ---- Product Quick View ---- */
  const quickViewBtns = document.querySelectorAll('.quick-view-btn');
  quickViewBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const card = this.closest('.product-card');
      const name = card.querySelector('.product-name')?.textContent || 'Product';
      showToast(`Quick view: ${name}`);
    });
  });

  /* ---- Hamburger Mobile Menu ---- */
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.position = 'absolute';
      nav.style.top = '72px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.background = '#fff';
      nav.style.padding = '16px 24px';
      nav.style.borderBottom = '1px solid #eee';
      nav.style.zIndex = '999';
    });
  }

  /* ---- Product Card Hover: show/hide add to cart ---- */
  // Already handled via CSS, JS backup for touch devices
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    card.addEventListener('touchstart', function () {
      productCards.forEach(c => c.classList.remove('touch-hover'));
      this.classList.add('touch-hover');
    });
  });

  /* ---- Arrival cards hover ---- */
  const arrivalCards = document.querySelectorAll('.arrival-main, .arrival-card');
  arrivalCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.querySelector('img')?.style && (this.querySelector('img').style.transform = 'scale(1.05)');
    });
    card.addEventListener('mouseleave', function () {
      this.querySelector('img')?.style && (this.querySelector('img').style.transform = 'scale(1)');
    });
  });

});