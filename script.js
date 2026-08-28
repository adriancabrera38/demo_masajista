(function () {
  document.addEventListener('DOMContentLoaded', () => {

    // Reveal on scroll
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));

    // Carrusel de fotos del hero (100% automático)
    document.querySelectorAll('.carousel').forEach((carousel) => {
      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.carousel-slide');
      const dotsWrap = carousel.querySelector('.carousel-dots');
      let index = 0;
      let timer;

      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        if (i === 0) dot.classList.add('active');
        dotsWrap?.appendChild(dot);
      });

      function goTo(i) {
        index = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        dotsWrap?.querySelectorAll('button').forEach((d, di) => d.classList.toggle('active', di === index));
      }
      function next() { goTo(index + 1); }
      timer = setInterval(next, 4500);
    });

    // FAQ accordion
    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-q')?.addEventListener('click', () => {
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach((i) => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });

    // Formulario de contacto (demo, sin envío real)
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const privacidad = document.getElementById('privacidad');
        const error = document.getElementById('form-error');
        if (!privacidad.checked) {
          error.textContent = 'Debes aceptar la Política de Privacidad para continuar.';
          error.classList.add('show');
          return;
        }
        error.classList.remove('show');
        form.querySelectorAll('.field, .checkbox-row, .submit-row').forEach((el) => el.style.display = 'none');
        document.getElementById('form-success').classList.add('show');
      });
    }

    // Banner de cookies
    const COOKIE_KEY = 'laia-masajes-demo-cookies';
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      if (!localStorage.getItem(COOKIE_KEY)) {
        setTimeout(() => banner.classList.add('show'), 400);
      }
      document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'aceptadas');
        banner.classList.remove('show');
      });
      document.getElementById('cookie-reject')?.addEventListener('click', () => {
        localStorage.setItem(COOKIE_KEY, 'rechazadas');
        banner.classList.remove('show');
      });
    }
  });
})();
