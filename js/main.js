/* All Door Supply — Main JS */

(function () {
  'use strict';

  /* --- Mobile nav toggle ---------------------------------- */
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function () {
      nav.classList.toggle('nav--open');
      const expanded = nav.classList.contains('nav--open');
      hamburger.setAttribute('aria-expanded', expanded);
    });
  }

  /* Close mobile nav on link click */
  document.querySelectorAll('.nav__mobile a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!nav || !hamburger) return;
      nav.classList.remove('nav--open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Keep review links inert while preserving their visual styling */
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });

  /* --- Scroll: transparent hero nav ----------------------- */
  if (nav && nav.classList.contains('nav--hero')) {
    var heroSection = document.querySelector('.hero, .svc-hero, .ctr-hero, .hero-band, .page-hero');
    var isHomepageHero = heroSection && heroSection.classList.contains('hero');
    var navScrolled = false;

    function updateNavState() {
      /* Compact: trigger at 60px */
      nav.classList.toggle('nav--compact', window.scrollY > 60);

      /* The homepage has a full-height hero, so keep its slower transition.
         Interior pages have shorter heroes with the white content visible much
         sooner; begin their nav transition before the hero fully clears. */
      var threshold = window.innerHeight * 0.8;
      if (heroSection) {
        var navHeight = nav.offsetHeight || 80;
        threshold = isHomepageHero
          ? heroSection.offsetHeight - navHeight
          : heroSection.offsetHeight - navHeight - 120;
      }

      var should = window.scrollY >= Math.max(0, threshold);
      if (should !== navScrolled) {
        navScrolled = should;
        nav.classList.toggle('nav--scrolled', should);
        nav.style.boxShadow = should ? '0 2px 12px rgba(0,0,0,0.12)' : 'none';
      }
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    updateNavState();

  } else {
    /* --- Scroll: nav shadow + compact (non-hero pages) ---- */
    var scrolled = false;
    window.addEventListener('scroll', function () {
      if (!nav) return;
      nav.classList.toggle('nav--compact', window.scrollY > 60);

      var should = window.scrollY > 8;
      if (should !== scrolled) {
        scrolled = should;
        nav.style.boxShadow = should
          ? '0 2px 12px rgba(0,0,0,0.12)'
          : 'none';
      }
    }, { passive: true });
  }

})();
