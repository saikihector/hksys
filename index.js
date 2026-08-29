  /* ── CURSOR (pointer devices only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot = document.getElementById('dot');
    const ring = document.getElementById('ring');
    let rx = 0, ry = 0, mx = 0, my = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function loop() {
      rx += (mx - rx) * .13; ry += (my - ry) * .13;
      ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
      requestAnimationFrame(loop);
    })();
    document.querySelectorAll('a, button, .proj-item, .post-card, .info-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
    });
  }

  /* ── HAMBURGER ── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
  }
  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ── SCROLL REVEAL ── */
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('on'), i * 80);
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade, .fade-l').forEach(el => revealObs.observe(el));

  /* ── ACTIVE NAV (IntersectionObserver — reliable) ── */
  const navLinks = document.querySelectorAll('.nav-links a');
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

  /* ── FORM ── */
  function submitForm(e) {
    e.preventDefault();
    const form = e.target;
    const btn  = document.getElementById('sbtn');
    const nome  = form.nome.value.trim();
    const email = form.email.value.trim();
    if (!nome || !email) {
      if (!nome)  document.getElementById('f-nome').focus();
      else        document.getElementById('f-email').focus();
      return;
    }
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    // Replace setTimeout below with real fetch/formspree when deploying
    setTimeout(() => {
      btn.textContent = '✓ Mensagem enviada!';
      btn.style.background = '#10b981';
      btn.style.color = '#fff';
      setTimeout(() => {
        btn.textContent = 'Enviar Mensagem';
        btn.style.background = ''; btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    }, 700);
  }