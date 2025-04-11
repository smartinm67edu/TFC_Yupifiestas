document.addEventListener('DOMContentLoaded', () => {
  // === CARGAR HEADER Y FOOTER DINÁMICAMENTE ===
  fetch('header.html')
    .then(res => res.text())
    .then(data => {
      const headerContainer = document.getElementById('header');
      if (headerContainer) {
        headerContainer.innerHTML = data;
      }
    });

  fetch('footer.html')
    .then(res => res.text())
    .then(data => {
      const footerContainer = document.getElementById('footer');
      if (footerContainer) {
        footerContainer.innerHTML = data;
        
        // Inicializar botones sociales después de cargar el footer
        initSocialButtons();
      }
    });

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

  // === ANIMACIÓN DE APARICIÓN DE LOS EVENTOS AL HACER SCROLL ===
  const eventos = document.querySelectorAll('.evento');
  const options = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, options);

  eventos.forEach(evento => {
    evento.classList.add('visible');
  });

  // === EFECTO HOVER SUAVE EN VIDEOS ===
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

  // === FUNCIÓN PARA INICIALIZAR BOTONES SOCIALES ===
  function initSocialButtons() {
    // Añadir estilo para la animación de onda
    const style = document.createElement('style');
    style.textContent = `
      @keyframes wave {
        to {
          transform: scale(2);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Configurar eventos para los botones sociales
    document.querySelectorAll('.social-btn').forEach(button => {
      // Efecto de onda al hacer clic
      button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Crear efecto de onda
        const wave = document.createElement('span');
        wave.className = 'wave';
        wave.style.position = 'absolute';
        wave.style.borderRadius = '50%';
        wave.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        wave.style.pointerEvents = 'none';
        wave.style.transform = 'scale(0)';
        wave.style.animation = 'wave 0.6s linear';
        
        this.appendChild(wave);
        
        // Tamaño inicial del efecto de onda
        const size = Math.max(this.offsetWidth, this.offsetHeight);
        wave.style.width = size + 'px';
        wave.style.height = size + 'px';
        
        // Posición del efecto de onda
        wave.style.left = (e.offsetX - size/2) + 'px';
        wave.style.top = (e.offsetY - size/2) + 'px';
        
        // Eliminar el elemento después de la animación
        setTimeout(() => wave.remove(), 600);
        
        // Abrir enlace después de un breve retraso (simulación)
        setTimeout(() => {
          const url = this.getAttribute('href');
          if(url && url !== '#') {
            window.open(url, '_blank');
          }
        }, 300);
      });
      
      // Efecto de sonido al interactuar (opcional)
      button.addEventListener('mouseenter', () => {
        const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
        sound.volume = 0.2;
        sound.play().catch(e => console.log('No se pudo reproducir sonido'));
      });
    });
  }
  
  // Inicializar botones sociales si ya existen en el DOM
  if (document.querySelector('.social-btn')) {
    initSocialButtons();
  }
});