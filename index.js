// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Theme toggle
const root = document.documentElement;
const modeToggle = document.getElementById('modeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light') root.classList.add('light');

modeToggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('show');
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('show');
}));

// Scroll spy
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.links a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const id = '#' + entry.target.id;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
    }
  });
},{rootMargin:'-50% 0px -40% 0px', threshold:0});
sections.forEach(s => observer.observe(s));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
