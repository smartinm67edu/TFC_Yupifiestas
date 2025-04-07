document.addEventListener('DOMContentLoaded', () => {
  // === MENÚ DESPLEGABLE ===
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // === CARRUSEL HORIZONTAL ===
  const track = document.querySelector('.carousel-track');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  let index = 0;

  if (track && nextBtn && prevBtn) {
    nextBtn.addEventListener('click', () => {
      index = (index + 1) % track.children.length;
      updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
      index = (index - 1 + track.children.length) % track.children.length;
      updateCarousel();
    });

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }
  }

  // === ZOOM / LIGHTBOX ===
  const zoomables = document.querySelectorAll('.zoomable');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close-lightbox');

  if (lightbox && lightboxImg && closeBtn) {
    zoomables.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.classList.remove('hidden');
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightboxImg.src = '';
    });

    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightboxImg.src = '';
      }
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
