// Portfolio interactions: navigation, reveal animations, theme and contact form.
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const darkToggle = document.getElementById('darkToggle');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Smooth scrolling, with the mobile menu closing after a navigation choice.
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const selector = anchor.getAttribute('href');
            if (!selector || selector === '#') return;
            const target = document.querySelector(selector);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
            navLinks?.classList.remove('show');
            menuToggle?.setAttribute('aria-expanded', 'false');
            menuToggle?.setAttribute('aria-label', 'Open navigation menu');
        });
    });

    // Mobile navigation toggle and accessible state.
    menuToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('show');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 760 && navLinks?.classList.contains('show') && !event.target.closest('.nav')) {
            navLinks.classList.remove('show');
            menuToggle?.setAttribute('aria-expanded', 'false');
            menuToggle?.setAttribute('aria-label', 'Open navigation menu');
        }
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) {
            navLinks?.classList.remove('show');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });

    // Header styling changes without overriding the selected theme.
    const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 18);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });

    // Reveal sections when they enter the viewport.
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach((section) => revealObserver.observe(section));

    // Animate progress bars from their data attributes instead of parsing inline styles.
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.skill-progress-fill').forEach((bar) => {
                const progress = Math.max(0, Math.min(100, Number(bar.dataset.progress) || 0));
                bar.style.width = `${progress}%`;
            });
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.18 });
    document.querySelectorAll('.skill-category').forEach((category) => skillObserver.observe(category));

    // Restore the user's theme preference.
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'true') {
        document.body.classList.add('dark-mode');
        if (darkToggle) darkToggle.checked = true;
    }
    darkToggle?.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', darkToggle.checked);
        localStorage.setItem('dark-mode', String(darkToggle.checked));
    });

    // Current year in the footer.
    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();

    // EmailJS contact form. Existing public key, service and template IDs are retained.
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            if (!formStatus) return;
            const submitButton = contactForm.querySelector('button[type="submit"]');
            formStatus.textContent = '';
            formStatus.classList.remove('error');
            if (!window.emailjs) {
                formStatus.textContent = 'The email service could not load. Please email me directly instead.';
                formStatus.classList.add('error');
                return;
            }
            submitButton.disabled = true;
            submitButton.innerHTML = 'Sending…';
            try {
                emailjs.init('5tfG93RgjAaO6v_2d');
                await emailjs.send('service_xl29bwe', 'template_xjsk7nn', {
                    message: document.getElementById('message').value.trim(),
                    from_name: document.getElementById('name').value.trim(),
                    reply_to: document.getElementById('email').value.trim()
                });
                formStatus.textContent = 'Your message has been sent successfully. Thank you for reaching out.';
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS submission failed:', error);
                formStatus.textContent = 'Your message could not be sent right now. Please use the email link instead.';
                formStatus.classList.add('error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
            }
        });
    }
});
