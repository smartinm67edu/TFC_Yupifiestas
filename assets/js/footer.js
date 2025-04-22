document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(res => res.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) {
                footer.innerHTML = ''; // Asegura limpio
                footer.insertAdjacentHTML('beforeend', data); // ✅ Más fiable
                initSocialButtons();
            }
        })
        .catch(err => console.error('Error loading footer:', err));





    function initSocialButtons() {
        // Estilo para animación de onda
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

        document.querySelectorAll('.social-btn').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();

                const wave = document.createElement('span');
                wave.className = 'wave';
                wave.style.position = 'absolute';
                wave.style.borderRadius = '50%';
                wave.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                wave.style.pointerEvents = 'none';
                wave.style.transform = 'scale(0)';
                wave.style.animation = 'wave 0.6s linear';

                this.appendChild(wave);

                const size = Math.max(this.offsetWidth, this.offsetHeight);
                wave.style.width = size + 'px';
                wave.style.height = size + 'px';
                wave.style.left = (e.offsetX - size / 2) + 'px';
                wave.style.top = (e.offsetY - size / 2) + 'px';

                setTimeout(() => wave.remove(), 600);

                setTimeout(() => {
                    const url = this.getAttribute('href');
                    if (url && url !== '#') {
                        window.open(url, '_blank');
                    }
                }, 300);
            });

            button.addEventListener('mouseenter', () => {
                const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-game-jump-coin-216.mp3');
                sound.volume = 0.2;
                sound.play().catch(e => console.log('No se pudo reproducir sonido'));
            });
        });
    }
});
