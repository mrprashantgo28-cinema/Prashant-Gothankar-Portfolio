(() => {
  const intro = document.getElementById('intro');
  const enterButton = document.getElementById('enterButton');
  const header = document.getElementById('siteHeader');
  let entered = false;
  let transitioning = false;
  let lenis = null;

  const finishIntro = () => {
    if (entered || transitioning) return;
    transitioning = true;
    if (window.gsap) {
      gsap.timeline({ onComplete: () => {
        intro.style.display = 'none';
        entered = true;
        transitioning = false;
        document.body.classList.remove('intro-active');
        header.classList.add('visible');
        initScrollEffects();
      }})
      .to('.intro-copy', { y: -35, opacity: 0, duration: .45, ease: 'power2.in' }, 0)
      .to('.portrait-wrap', { y: 90, scale: .88, opacity: 0, duration: .65, ease: 'power3.in' }, 0)
      .to('.intro-name', { scale: 1.08, opacity: 0, duration: .65, ease: 'power2.in' }, 0)
      .to(intro, { yPercent: -100, rotateX: -8, transformPerspective: 1200, duration: 1.05, ease: 'power4.inOut' }, .18);
    } else {
      intro.style.transition = 'transform .8s ease, opacity .8s ease';
      intro.style.transform = 'translateY(-100%)';
      intro.style.opacity = '0';
      setTimeout(() => {
        intro.style.display = 'none'; entered = true; transitioning = false;
        document.body.classList.remove('intro-active'); header.classList.add('visible');
      }, 850);
    }
  };

  document.body.classList.add('intro-active');
  enterButton.addEventListener('click', finishIntro);
  window.addEventListener('wheel', (e) => {
    if (!entered && e.deltaY > 0) { e.preventDefault(); finishIntro(); }
  }, { passive: false });
  let touchStart = 0;
  window.addEventListener('touchstart', e => { touchStart = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', e => {
    if (!entered && touchStart - e.changedTouches[0].clientY > 20) finishIntro();
  }, { passive: true });
  window.addEventListener('keydown', e => {
    if (!entered && ['ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); finishIntro(); }
    if (e.key === 'Escape') closeLightbox();
  });

  function initSmoothScroll() {
    if (window.Lenis && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: .85 });
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
          const target = document.querySelector(link.getAttribute('href'));
          if (target) { e.preventDefault(); lenis.scrollTo(target, { offset: -75 }); }
        });
      });
    }
  }

  function initScrollEffects() {
    initSmoothScroll();
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.utils.toArray('.work-card, .about-layout > *, .section-heading').forEach((el, i) => {
        gsap.from(el, { y: 42, opacity: 0, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
      });
      gsap.from('.hero-main h2', { y: 70, opacity: 0, duration: 1.15, delay: .1, ease: 'power4.out' });
    }
  }

  const cards = [...document.querySelectorAll('.work-card')];
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  let activeIndex = 0;
  function showImage(index) {
    activeIndex = (index + cards.length) % cards.length;
    const source = cards[activeIndex].querySelector('img');
    lightboxImage.src = source.src;
    lightboxImage.alt = source.alt;
    lightboxCaption.textContent = `SELECTED WORK  /  ${String(activeIndex + 1).padStart(2, '0')} — 18`;
  }
  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('lightboxClose').focus();
  }
  function closeLightbox() {
    if (!lightbox.classList.contains('open')) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  cards.forEach(card => card.addEventListener('click', () => openLightbox(Number(card.dataset.index))));
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  document.getElementById('lightboxPrev').addEventListener('click', () => showImage(activeIndex - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => showImage(activeIndex + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  window.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') showImage(activeIndex - 1);
    if (e.key === 'ArrowRight') showImage(activeIndex + 1);
  });
})();