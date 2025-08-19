    // Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme
    const root = document.documentElement;
    const modeToggle = document.getElementById('modeToggle');
    const saved = localStorage.getItem('theme');
    if(saved === 'light') root.classList.add('light');
    modeToggle.addEventListener('click', ()=>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });

    // Mobile menu
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    menuBtn.addEventListener('click',()=> mobileMenu.classList.toggle('show'));
    mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('show')));

    // Scroll spy (highlight active link)
    const sections = [...document.querySelectorAll('main section[id]')];
    const links = [...document.querySelectorAll('.links a')];
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const id = '#' + entry.target.id;
          links.forEach(l=> l.classList.toggle('active', l.getAttribute('href')===id));
        }
      });
    },{rootMargin:'-50% 0px -40% 0px', threshold:0});
    sections.forEach(s=> io.observe(s));

    // Smooth scroll for in-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
      anchor.addEventListener('click', function(e){
        const target = document.querySelector(this.getAttribute('href'));
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      });
    });
