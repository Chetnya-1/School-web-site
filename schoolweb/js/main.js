document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav a');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            nav.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Navbar scroll effect
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove background opacity based on scroll
        if (currentScroll > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }

        // Hide/show header on scroll up/down
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScroll = currentScroll;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });

    // Dynamic year in footer
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
