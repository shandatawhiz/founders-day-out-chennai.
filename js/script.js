document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 800, once: true, offset: 70 });

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  const updateHeader = () => header?.classList.toggle('is-stuck', window.scrollY > 40);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  });

  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  if (window.Swiper) {
    const memory = document.querySelector('.memory-swiper');
    if (memory) new Swiper(memory, {
      slidesPerView: 'auto', spaceBetween: 18,
      navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
      pagination: { el: '.swiper-pagination', clickable: true }
    });

    const quotes = document.querySelector('.quote-swiper');
    if (quotes) new Swiper(quotes, {
      slidesPerView: 1, autoHeight: true, effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 5500, disableOnInteraction: false },
      pagination: { el: '.quote-pagination', clickable: true }
    });
  }

  const counters = document.querySelectorAll('[data-count]');
  const animateCounter = el => {
    const target = Number(el.dataset.count || 0);
    const start = performance.now();
    const tick = now => {
      const progress = Math.min((now - start) / 1000, 1);
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.35 });
    counters.forEach(counter => observer.observe(counter));
  } else counters.forEach(animateCounter);

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.hero h1 .line', { y: 55, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
  }
});
