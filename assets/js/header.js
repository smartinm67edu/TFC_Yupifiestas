document.addEventListener('DOMContentLoaded', () => {
    fetch('header.html')
      .then(res => res.text())
      .then(data => {
        const header = document.getElementById('header');
        if (header) header.innerHTML = data;
        initMenuToggle();
      })
      .catch(err => console.error('Error loading header:', err));
  
    function initMenuToggle() {
      const menuToggle = document.getElementById('menu-toggle');
      const navLinks = document.getElementById('nav-links');
  
      if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
          navLinks.classList.toggle('active');
        });
      }
    }
  });
  