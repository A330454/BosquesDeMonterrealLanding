/**
 * Bosques de Monterreal - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Navbar.init();
    SmoothScroll.init();
    RevealOnScroll.init();
    MobileMenu.init();
    ExperienciasCarousel.init();
});

/**
 * Navbar Module
 * Handles sticky navbar with glass effect on scroll
 */
const Navbar = {
    navbar: null,
    scrollThreshold: 100,

    init() {
        this.navbar = document.getElementById('navbar');
        if (!this.navbar) return;

        this.handleScroll();
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    },

    handleScroll() {
        if (window.scrollY > this.scrollThreshold) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
};

/**
 * Mobile Menu Module
 * Handles mobile navigation toggle
 */
const MobileMenu = {
    toggle: null,
    menu: null,
    navbar: null,
    isOpen: false,

    init() {
        this.toggle = document.getElementById('navbarToggle');
        this.menu = document.getElementById('navbarMenu');
        this.navbar = document.getElementById('navbar');

        if (!this.toggle || !this.menu) return;

        // Use both click and touchend for better mobile support
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        // Touchend for iOS devices
        this.toggle.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        }, { passive: false });

        // Close menu when clicking a link
        this.menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
            link.addEventListener('touchend', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.toggle.contains(e.target) && !this.menu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            if (this.isOpen) {
                this.closeMenu();
            }
        });

        // Handle resize (close menu if going to desktop size)
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isOpen) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        this.isOpen = !this.isOpen;
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');

        // Toggle hamburger animation
        const spans = this.toggle.querySelectorAll('span');
        if (this.isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
    },

    closeMenu() {
        if (this.isOpen) {
            this.toggleMenu();
        }
    }
};

/**
 * Smooth Scroll Module
 * Handles smooth scrolling to anchor links
 */
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');

                // Skip if it's just "#"
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
};

/**
 * Experiencias Carousel Module
 * Handles carousel navigation for experiencias section
 */
const ExperienciasCarousel = {
    currentPage: 0,
    cardsPerView: 4,
    totalCards: 0,
    grid: null,
    prevBtn: null,
    nextBtn: null,

    init() {
        this.grid = document.querySelector('.experiencias-grid');
        this.prevBtn = document.querySelector('.experiencias-nav-prev');
        this.nextBtn = document.querySelector('.experiencias-nav-next');

        if (!this.grid || !this.prevBtn || !this.nextBtn) return;

        this.totalCards = this.grid.querySelectorAll('.experiencia-card').length;

        // Set cards per view based on screen size
        this.updateCardsPerView();
        window.addEventListener('resize', () => {
            this.currentPage = 0;
            this.updateCardsPerView();
        });

        // Add event listeners
        this.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.nextBtn.addEventListener('click', () => this.navigate(1));

        // Update button states
        this.updateButtons();
    },

    updateCardsPerView() {
        if (window.innerWidth <= 768) {
            this.cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            this.cardsPerView = 2;
        } else {
            this.cardsPerView = 4;
        }
        this.updateButtons();
        this.updateCarousel();
    },

    navigate(direction) {
        const totalPages = Math.ceil(this.totalCards / this.cardsPerView);
        this.currentPage = Math.max(0, Math.min(totalPages - 1, this.currentPage + direction));
        this.updateCarousel();
        this.updateButtons();
    },

    updateCarousel() {
        const cards = this.grid.querySelectorAll('.experiencia-card');
        if (cards.length === 0) return;

        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // var(--space-md) = 1.5rem = 24px

        // Calculate offset: move by cardsPerView cards each page
        const cardsToSkip = this.currentPage * this.cardsPerView;
        const offset = -(cardsToSkip * (cardWidth + gap));
        this.grid.style.transform = `translateX(${offset}px)`;
    },

    updateButtons() {
        const totalPages = Math.ceil(this.totalCards / this.cardsPerView);
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage >= totalPages - 1;
    }
};

/**
 * Reveal on Scroll Module
 * Handles fade-in animations when elements come into view
 */
const RevealOnScroll = {
    elements: [],

    init() {
        // Add reveal class to elements that should animate
        this.addRevealClass();

        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.reveal').forEach(el => {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.add('active');
            });
        }
    },

    addRevealClass() {
        // Add reveal class to specific sections and elements
        const selectors = [
            '.intro-content',
            '.experiencia-card',
            '.highlight-card',
            '.restaurante-wrapper > *',
            '.actividades-content',
            '.actividades-image',
            '.cabana-card',
            '.actividad-wrapper > *',
            '.contacto-info',
            '.contacto-form'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach((el, index) => {
                el.classList.add('reveal');
                // Stagger animation delay for grid items
                if (selector.includes('card')) {
                    el.style.transitionDelay = `${index * 0.1}s`;
                }
            });
        });
    }
};

/**
 * Form Validation Module
 * Handles contact form validation
 */
const FormValidation = {
    init() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if (this.validateForm(form)) {
                this.submitForm(form);
            }
        });

        // Real-time validation
        form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => {
                if (field.classList.contains('error')) {
                    this.validateField(field);
                }
            });
        });
    },

    validateForm(form) {
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es requerido';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un email válido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-+()]{10,}$/;
            if (!phoneRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor ingresa un teléfono válido';
            }
        }

        // Update UI
        this.updateFieldUI(field, isValid, errorMessage);

        return isValid;
    },

    updateFieldUI(field, isValid, errorMessage) {
        const formGroup = field.closest('.form-group');
        const existingError = formGroup.querySelector('.error-message');

        if (existingError) {
            existingError.remove();
        }

        if (isValid) {
            field.classList.remove('error');
        } else {
            field.classList.add('error');
            const error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = errorMessage;
            error.style.cssText = 'color: #dc3545; font-size: 0.75rem; margin-top: 0.25rem; display: block;';
            formGroup.appendChild(error);
        }
    },

    submitForm(form) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            form.innerHTML = `
                <div style="text-align: center; padding: 2rem;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2D5A3D" stroke-width="2" style="margin-bottom: 1rem;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="9 12 12 15 16 10"></polyline>
                    </svg>
                    <h3 style="font-family: 'Playfair Display', serif; margin-bottom: 0.5rem;">¡Mensaje Enviado!</h3>
                    <p style="color: #666;">Nos pondremos en contacto contigo pronto.</p>
                </div>
            `;
        }, 1500);
    }
};

// Initialize form validation if contact form exists
document.addEventListener('DOMContentLoaded', () => {
    FormValidation.init();
});

/**
 * Parallax Effect Module
 * Subtle parallax for hero background
 */
const ParallaxEffect = {
    init() {
        const hero = document.querySelector('.hero-bg');
        if (!hero || window.innerWidth < 768) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            hero.style.transform = `scale(1.1) translateY(${scrolled * 0.3}px)`;
        }, { passive: true });
    }
};

// Initialize parallax
document.addEventListener('DOMContentLoaded', () => {
    ParallaxEffect.init();
});

/**
 * Lazy Loading Images
 * Native lazy loading fallback for older browsers
 */
const LazyLoad = {
    init() {
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading supported
            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback with Intersection Observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[loading="lazy"]').forEach(img => {
                observer.observe(img);
            });
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    LazyLoad.init();
});
