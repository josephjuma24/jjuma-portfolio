document.addEventListener('DOMContentLoaded', function() {

    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('header nav ul li a:not(.nav-resume)');
    const sections = document.querySelectorAll('main section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active nav link on scroll
    function highlightNavLink() {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjusted offset
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
         // If at the very top, or hero section is primarily in view, remove active class or set hero active
        if (window.pageYOffset < sections[0].offsetTop - headerHeight - 50) {
             navLinks.forEach(link => link.classList.remove('active'));
        }
    }
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call to set active link on page load

    // Contact Form submission (frontend only)
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            if (nameInput.value.trim() === '' || emailInput.value.trim() === '' || messageInput.value.trim() === '') {
                formMessage.textContent = 'Please fill in all fields.';
                formMessage.style.color = 'red';
                return;
            }

            formMessage.textContent = 'Thank you, ' + nameInput.value.split(' ')[0] + '! Your message has been "sent".';
            formMessage.style.color = 'green';
            contactForm.reset(); 

            setTimeout(() => {
                formMessage.textContent = '';
            }, 5000);
        });
    }

    // Update footer year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Intersection Observer for section fade-in animations (applied via CSS classes)
    const animatedSections = document.querySelectorAll('main section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: stop observing after first animation
            } else {
                 // Optional: remove 'visible' if you want animation to replay on scroll up then down
                 // entry.target.classList.remove('visible'); 
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        section.classList.add('section-fade-in'); // Add base class for initial state
        sectionObserver.observe(section);
    });
});