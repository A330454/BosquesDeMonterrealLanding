/**
 * Bosques de Monterreal - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Navbar.init();
    SmoothScroll.init();
    RevealOnScroll.init();
    MobileMenu.init();
    DatePicker.init();
});

/**
 * Date Picker Module
 * Calendar dropdown with range selection
 */
const DatePicker = {
    dropdown: null,
    trigger: null,
    displayInput: null,
    selectionText: null,
    month1Days: null,
    month2Days: null,
    month1Title: null,
    month2Title: null,
    prevBtn: null,
    nextBtn: null,
    searchBtn: null,

    checkInDate: null,
    checkOutDate: null,
    currentMonth: null,
    currentYear: null,

    // Base URL for booking
    bookingBaseUrl: 'https://direct-book.com/properties/bosquesdemonterrealdirect',

    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

    init() {
        this.dropdown = document.getElementById('calendarDropdown');
        this.trigger = document.getElementById('check-dates');
        this.displayInput = document.getElementById('check-dates');
        this.selectionText = document.getElementById('calendarSelection');
        this.month1Days = document.getElementById('month1Days');
        this.month2Days = document.getElementById('month2Days');
        this.month1Title = document.getElementById('month1Title');
        this.month2Title = document.getElementById('month2Title');
        this.prevBtn = document.getElementById('calendarPrev');
        this.nextBtn = document.getElementById('calendarNext');
        this.searchBtn = document.getElementById('bookingSearchBtn');

        if (!this.dropdown || !this.trigger) return;

        // Set current month
        const today = new Date();
        this.currentMonth = today.getMonth();
        this.currentYear = today.getFullYear();

        // Event listeners
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        this.prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.prevMonth();
        });

        this.nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            this.nextMonth();
        });

        // Search button click handler
        this.searchBtn?.addEventListener('click', () => {
            this.handleSearch();
        });

        // Clear hover preview when mouse leaves the calendar
        this.dropdown.addEventListener('mouseleave', () => {
            this.clearHoverPreview();
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!this.dropdown.contains(e.target) && e.target !== this.trigger) {
                this.closeDropdown();
            }
        });

        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        });

        // Render initial calendar
        this.renderCalendars();
    },

    toggleDropdown() {
        if (this.dropdown.classList.contains('active')) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    },

    openDropdown() {
        this.dropdown.classList.add('active');
    },

    closeDropdown() {
        this.dropdown.classList.remove('active');
    },

    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendars();
    },

    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendars();
    },

    renderCalendars() {
        // Month 1
        this.month1Title.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        this.renderMonth(this.month1Days, this.currentMonth, this.currentYear);

        // Month 2
        let month2 = this.currentMonth + 1;
        let year2 = this.currentYear;
        if (month2 > 11) {
            month2 = 0;
            year2++;
        }
        this.month2Title.textContent = `${this.monthNames[month2]} ${year2}`;
        this.renderMonth(this.month2Days, month2, year2);
    },

    renderMonth(container, month, year) {
        container.innerHTML = '';

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Empty cells for days before first day
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            container.appendChild(empty);
        }

        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = day;

            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const dateStr = this.formatDateStr(date);

            // Disable past dates
            if (date < today) {
                dayEl.classList.add('disabled');
            } else {
                dayEl.dataset.date = dateStr;

                // Check if in range (both dates selected)
                if (this.checkInDate && this.checkOutDate) {
                    const checkIn = this.parseDateStr(this.checkInDate);
                    const checkOut = this.parseDateStr(this.checkOutDate);

                    if (dateStr === this.checkInDate) {
                        dayEl.classList.add('check-in');
                    }
                    if (dateStr === this.checkOutDate) {
                        dayEl.classList.add('check-out');
                        // Add nights badge
                        const nights = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
                        if (nights > 0) {
                            const badge = document.createElement('span');
                            badge.className = 'nights-badge';
                            badge.textContent = `${nights} noche${nights > 1 ? 's' : ''}`;
                            dayEl.appendChild(badge);
                        }
                    }
                    if (date > checkIn && date < checkOut) {
                        dayEl.classList.add('in-range');
                    }
                } else if (this.checkInDate && dateStr === this.checkInDate) {
                    // Only check-in selected, show as single circle
                    dayEl.classList.add('check-in', 'check-out');
                }

                // Click handler
                dayEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectDate(dateStr);
                });

                // Hover handlers for preview (only when check-in is selected but not checkout)
                dayEl.addEventListener('mouseenter', () => this.handleDayHover(dateStr));
                dayEl.addEventListener('mouseleave', () => this.clearHoverPreview());
            }

            container.appendChild(dayEl);
        }
    },

    handleDayHover(dateStr) {
        // Only show hover preview when check-in is selected but checkout is not
        if (!this.checkInDate || this.checkOutDate) return;

        const checkIn = this.parseDateStr(this.checkInDate);
        const hoverDate = this.parseDateStr(dateStr);

        // Don't show preview if hovering on check-in date or before it
        if (hoverDate <= checkIn) {
            this.clearHoverPreview();
            return;
        }

        // Clear previous hover classes
        this.clearHoverPreview();

        // Get all day elements from both month containers
        const allDays = document.querySelectorAll('.calendar-day[data-date]');

        allDays.forEach(dayEl => {
            const dayDateStr = dayEl.dataset.date;
            const dayDate = this.parseDateStr(dayDateStr);

            if (dayDate > checkIn && dayDate < hoverDate) {
                // Days in between - show range
                dayEl.classList.add('hover-range');
            } else if (dayDateStr === dateStr) {
                // Hovered day - show as checkout preview
                dayEl.classList.add('hover-end');

                // Add nights badge
                const nights = Math.round((hoverDate - checkIn) / (1000 * 60 * 60 * 24));
                if (nights > 0) {
                    // Remove existing badge if any
                    const existingBadge = dayEl.querySelector('.nights-badge');
                    if (existingBadge) existingBadge.remove();

                    const badge = document.createElement('span');
                    badge.className = 'nights-badge';
                    badge.textContent = `${nights} noche${nights > 1 ? 's' : ''}`;
                    dayEl.appendChild(badge);
                }
            }
        });

    },

    clearHoverPreview() {
        // Remove all hover-related classes
        document.querySelectorAll('.calendar-day.hover-range').forEach(el => {
            el.classList.remove('hover-range');
        });
        document.querySelectorAll('.calendar-day.hover-end').forEach(el => {
            el.classList.remove('hover-end');
            // Remove nights badge from hover preview
            const badge = el.querySelector('.nights-badge');
            if (badge && !el.classList.contains('check-out')) {
                badge.remove();
            }
        });
    },

    selectDate(dateStr) {
        // Clear hover preview before making changes
        this.clearHoverPreview();

        if (!this.checkInDate || (this.checkInDate && this.checkOutDate)) {
            // Start new selection
            this.checkInDate = dateStr;
            this.checkOutDate = null;
            this.updateSelectionText();
        } else {
            // Complete selection
            const checkIn = this.parseDateStr(this.checkInDate);
            const selected = this.parseDateStr(dateStr);

            if (selected < checkIn) {
                // Selected date is before check-in, swap
                this.checkOutDate = this.checkInDate;
                this.checkInDate = dateStr;
            } else if (selected.getTime() === checkIn.getTime()) {
                // Same date, reset
                this.checkInDate = dateStr;
                this.checkOutDate = null;
            } else {
                this.checkOutDate = dateStr;
            }

            this.updateSelectionText();
            this.updateDisplayInput();

            // Close dropdown after selection complete
            if (this.checkInDate && this.checkOutDate) {
                setTimeout(() => this.closeDropdown(), 300);
            }
        }

        this.renderCalendars();
    },

    updateSelectionText() {
        if (!this.checkInDate) {
            this.selectionText.textContent = 'Selecciona tu check-in';
        } else if (!this.checkOutDate) {
            const date = this.parseDateStr(this.checkInDate);
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            const formatted = date.toLocaleDateString('es-MX', options);
            this.selectionText.textContent = `Tu selección: ${formatted} - ...`;
        } else {
            const checkIn = this.parseDateStr(this.checkInDate);
            const checkOut = this.parseDateStr(this.checkOutDate);
            const options = { weekday: 'short', month: 'short', day: 'numeric' };
            const checkInStr = checkIn.toLocaleDateString('es-MX', options);
            const checkOutStr = checkOut.toLocaleDateString('es-MX', options);
            this.selectionText.textContent = `Tu selección: ${checkInStr} - ${checkOutStr}`;
        }
    },

    updateDisplayInput() {
        if (this.checkInDate && this.checkOutDate) {
            const checkIn = this.parseDateStr(this.checkInDate);
            const checkOut = this.parseDateStr(this.checkOutDate);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            const checkInStr = checkIn.toLocaleDateString('es-MX', options);
            const checkOutStr = checkOut.toLocaleDateString('es-MX', options);
            this.displayInput.value = `${checkInStr} - ${checkOutStr}`;
        }
    },

    formatDateStr(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    // Parse date string (YYYY-MM-DD) as local date to avoid timezone issues
    parseDateStr(dateStr) {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    },

    handleSearch() {
        // Build the booking URL with the selected dates
        const params = new URLSearchParams({
            'locale': 'es',
            'items[0][adults]': '2',
            'items[0][children]': '0',
            'items[0][infants]': '0',
            'currency': 'MXN',
            'trackPage': 'yes'
        });

        // Add dates if selected, otherwise use defaults (today and tomorrow)
        if (this.checkInDate && this.checkOutDate) {
            params.set('checkInDate', this.checkInDate);
            params.set('checkOutDate', this.checkOutDate);
        } else {
            // Default: today and tomorrow
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1);
            params.set('checkInDate', this.formatDateStr(today));
            params.set('checkOutDate', this.formatDateStr(tomorrow));
        }

        const bookingUrl = `${this.bookingBaseUrl}?${params.toString()}`;
        window.open(bookingUrl, '_blank');
    }
};

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

        // Track if we handled touch to prevent double-firing
        let touchHandled = false;

        // Handle touch for mobile devices
        this.toggle.addEventListener('touchstart', (e) => {
            touchHandled = true;
        }, { passive: true });

        this.toggle.addEventListener('touchend', (e) => {
            if (touchHandled) {
                e.preventDefault();
                e.stopPropagation();
                this.toggleMenu();
                // Reset after a short delay
                setTimeout(() => { touchHandled = false; }, 300);
            }
        }, { passive: false });

        // Handle click for desktop and as fallback
        this.toggle.addEventListener('click', (e) => {
            // Skip if this was already handled by touch
            if (touchHandled) {
                touchHandled = false;
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking a link - with proper mobile handling
        this.menu.querySelectorAll('a').forEach(link => {
            // Use touchstart to track touch intent
            let touchStarted = false;

            link.addEventListener('touchstart', () => {
                touchStarted = true;
            }, { passive: true });

            // Handle tap on mobile - allow navigation to happen first
            link.addEventListener('touchend', (e) => {
                if (!touchStarted) return;
                touchStarted = false;

                // Don't prevent default - let the link navigate naturally
                // Close menu after a small delay to ensure navigation happens
                setTimeout(() => this.closeMenu(), 100);
            }, { passive: true });

            // Handle click for desktop and as fallback
            link.addEventListener('click', () => {
                // Small delay to ensure navigation happens
                setTimeout(() => this.closeMenu(), 50);
            });
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
