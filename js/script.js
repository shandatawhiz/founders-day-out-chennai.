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

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduceMotion) {
      gsap.from('.hero h1 .line', {
        y: 55,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.to('.orb-one', {
        yPercent: 22,
        xPercent: -8,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.to('.orb-two', {
        yPercent: -18,
        xPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });

      gsap.from('.statement-image.gamistry-statement-image', {
        scale: 1.08,
        ease: 'none',
        scrollTrigger: {
          trigger: '.statement',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      gsap.from('.timeline-item', {
        x: 70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.timeline-list',
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });

      gsap.from('.gallery-head', {
        y: 45,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.gallery',
          start: 'top 78%',
          toggleActions: 'play none none reverse'
        }
      });
    }
  }
});
