// ─── CURSOR GLOW ───
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ─── MOBILE NAV TOGGLE ───
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!e.target.closest('.nav')) navLinks.classList.remove('open');
  });
}

// ─── NAV SCROLL EFFECT ───
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) nav.style.background = 'rgba(8,10,15,0.98)';
  else nav.style.background = 'rgba(8,10,15,0.85)';
}, { passive: true });

// ─── INTERSECTION OBSERVER (reveal) ───
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ─── ACTIVE NAV LINK ───
const currentPath = window.location.pathname;
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href && (currentPath.endsWith(href) || currentPath.includes(href.replace('https://hishamcse.github.io', '')))) {
    a.classList.add('active');
  }
});

// ─── SCROLL PROGRESS BAR ───
(function() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 3px;
    width: 0%;
    background: linear-gradient(90deg, #4f8ef7, #7c3aed);
    z-index: 9998;
    transition: width 0.1s linear;
    pointer-events: none;
    border-radius: 0 2px 2px 0;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();