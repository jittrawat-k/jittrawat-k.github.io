// Progress bar
const bar = document.createElement('div');
bar.id = 'progress-bar';
document.body.prepend(bar);

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = scrolled + '%';
  document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 30);
});

// Theme toggle
const html = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
hamburger.addEventListener('click', () => menu.classList.toggle('active'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('active')));

// Fade-up on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// Stagger children
document.querySelectorAll('.skills-container, .projects-grid, .about-btns').forEach(container => {
  container.querySelectorAll(':scope > *').forEach((child, i) => {
    child.classList.add('fade-up');
    child.style.transitionDelay = (i * 0.1) + 's';
    observer.observe(child);
  });
});

// Back to top
const backBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backBtn.classList.toggle('visible', window.scrollY > 400);
});
backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));