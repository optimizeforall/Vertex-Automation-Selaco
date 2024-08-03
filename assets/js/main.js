(function() {
  "use strict";

  function safeQuerySelector(selector) {
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Element with selector "${selector}" not found`);
      return null;
    }
    return element;
  }

  function toggleScrolled() {
    const selectBody = safeQuerySelector('body');
    const selectHeader = safeQuerySelector('#header');
    if (!selectHeader || (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top'))) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  const mobileNavToggleBtn = safeQuerySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    const body = safeQuerySelector('body');
    if (body && mobileNavToggleBtn) {
      body.classList.toggle('mobile-nav-active');
      mobileNavToggleBtn.classList.toggle('bi-list');
      mobileNavToggleBtn.classList.toggle('bi-x');
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (safeQuerySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      const nextElement = this.parentNode.nextElementSibling;
      if (nextElement) {
        nextElement.classList.toggle('dropdown-active');
      }
      e.stopImmediatePropagation();
    });
  });

  const preloader = safeQuerySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  let scrollTop = safeQuerySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const isotopeContainer = isotopeItem.querySelector('.isotope-container');
    if (isotopeContainer && typeof imagesLoaded !== 'undefined' && typeof Isotope !== 'undefined') {
      imagesLoaded(isotopeContainer, function() {
        initIsotope = new Isotope(isotopeContainer, {
          itemSelector: '.isotope-item',
          layoutMode: layout,
          filter: filter,
          sortBy: sort
        });
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          const filterActive = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (filterActive) {
            filterActive.classList.remove('filter-active');
          }
          this.classList.add('filter-active');
          if (initIsotope) {
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
            if (typeof aosInit === 'function') {
              aosInit();
            }
          }
        }, false);
      });
    }
  });

  function initSwiper() {
    if (typeof Swiper !== 'undefined') {
      document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
        const configElement = swiperElement.querySelector(".swiper-config");
        if (configElement) {
          let config = JSON.parse(configElement.innerHTML.trim());
          new Swiper(swiperElement, config);
        }
      });
    }
  }

  window.addEventListener("load", initSwiper);

  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      const section = safeQuerySelector(window.location.hash);
      if (section) {
        setTimeout(() => {
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = safeQuerySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
