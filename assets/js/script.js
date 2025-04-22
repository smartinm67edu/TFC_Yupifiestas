document.addEventListener('DOMContentLoaded', () => {
  // Carrusel
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

  // Lightbox
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

  // Animación de aparición de eventos
  const eventos = document.querySelectorAll('.evento');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  eventos.forEach(evento => observer.observe(evento));

  // Hover suave en videos
  const videos = document.querySelectorAll('.evento-video');
  videos.forEach(video => {
    video.addEventListener('mouseenter', () => {
      video.style.transform = 'scale(1.03)';
      video.style.transition = 'transform 0.3s ease';
    });

    video.addEventListener('mouseleave', () => {
      video.style.transform = 'scale(1)';
    });
  });
});
