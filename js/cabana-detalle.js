/**
 * Cabana Detalle - Renderiza la información de la cabaña
 */
document.addEventListener('DOMContentLoaded', function() {
    const cabanaId = getCabanaIdFromUrl();
    const cabana = getCabanaById(cabanaId);
    const container = document.getElementById('cabanaDetalle');
    const ctaSection = document.getElementById('ctaSection');

    if (!cabana) {
        container.innerHTML = `
            <div class="cabana-loading">
                <div style="text-align: center;">
                    <h2 style="margin-bottom: 1rem;">Cabaña no encontrada</h2>
                    <p style="margin-bottom: 1.5rem;">La cabaña que buscas no existe o ha sido removida.</p>
                    <a href="cabanas.html" class="btn btn-primary">Ver todas las cabañas</a>
                </div>
            </div>
        `;
        return;
    }

    // Update page title
    document.title = `${cabana.nombre} | Bosques de Monterreal`;

    // Render cabin detail
    container.innerHTML = renderCabanaDetail(cabana);

    // Initialize carousel
    initCarousel();

    // Show CTA section
    if (ctaSection) ctaSection.style.display = 'block';
});

function renderCabanaDetail(cabana) {
    const capacidadText = cabana.capacidad.minima === cabana.capacidad.maxima
        ? `${cabana.capacidad.maxima} personas`
        : `${cabana.capacidad.minima}-${cabana.capacidad.maxima} personas`;

    const imagenes = cabana.imagenes || [];
    const isSingleImage = imagenes.length === 1;

    return `
        <!-- Hero Carousel -->
        <div class="cabana-hero">
            <div class="cabana-carousel" data-single-image="${isSingleImage}">
                <div class="cabana-carousel-track">
                    ${imagenes.map((img, index) => `
                        <div class="cabana-carousel-slide">
                            <img src="${img}" alt="${cabana.nombre} - Imagen ${index + 1}" loading="${index === 0 ? 'eager' : 'lazy'}">
                        </div>
                    `).join('')}
                </div>

                ${!isSingleImage ? `
                    <button class="cabana-carousel-btn cabana-carousel-btn-prev" aria-label="Imagen anterior">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="cabana-carousel-btn cabana-carousel-btn-next" aria-label="Siguiente imagen">
                        <svg viewBox="0 0 24 24" fill="none">
                            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>

                    <div class="cabana-carousel-indicators">
                        ${imagenes.map((_, index) => `
                            <button class="cabana-carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Ir a imagen ${index + 1}"></button>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
            ${cabana.badge ? `<span class="cabana-hero-badge">${cabana.badge}</span>` : ''}
        </div>

        <!-- Info Section -->
        <div class="cabana-info">
            <!-- Header -->
            <header class="cabana-header">
                <h1>${cabana.nombre}</h1>
                <div class="cabana-meta">
                    <span class="cabana-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        </svg>
                        ${capacidadText}
                    </span>
                    <span class="cabana-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        ${cabana.dormitorios} ${cabana.dormitorios === 1 ? 'dormitorio' : 'dormitorios'}
                    </span>
                    <span class="cabana-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="M2 8h20"></path>
                        </svg>
                        ${cabana.banos.cantidad} ${cabana.banos.cantidad === 1 ? 'baño' : 'baños'}
                    </span>
                    ${cabana.niveles ? `
                    <span class="cabana-meta-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                        </svg>
                        ${cabana.niveles} ${cabana.niveles === 1 ? 'nivel' : 'niveles'}
                    </span>` : ''}
                </div>
            </header>

            <!-- Description -->
            <div class="cabana-descripcion">
                <p>${cabana.descripcion}</p>
            </div>

            <!-- Location if exists -->
            ${cabana.ubicacion ? `
            <div class="cabana-ubicacion">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p><strong>Ubicación:</strong> ${cabana.ubicacion}</p>
            </div>` : ''}

            <!-- Beds Section -->
            <section class="cabana-section">
                <h2 class="cabana-section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M2 4v16"></path><path d="M22 4v16"></path>
                        <path d="M2 12h20"></path><path d="M2 20h20"></path>
                        <path d="M6 12v-4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v4"></path>
                    </svg>
                    Camas
                </h2>
                <ul class="cabana-list">
                    ${cabana.camas.map(cama => `<li>${cama}</li>`).join('')}
                </ul>
            </section>

            <!-- Bathrooms Section -->
            <section class="cabana-section">
                <h2 class="cabana-section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 6L6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"></path>
                        <line x1="10" y1="5" x2="8" y2="7"></line><line x1="2" y1="12" x2="22" y2="12"></line>
                    </svg>
                    Baños
                </h2>
                <p style="color: var(--color-gray-700);">${cabana.banos.cantidad} ${cabana.banos.cantidad === 1 ? 'baño' : 'baños'}: ${cabana.banos.descripcion}</p>
            </section>

            <!-- Amenities Section -->
            <section class="cabana-section">
                <h2 class="cabana-section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                    Amenidades
                </h2>
                <div class="cabana-amenidades-grid">
                    ${cabana.amenidades.map(amenidad => `
                        <div class="cabana-amenidad">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            ${amenidad}
                        </div>
                    `).join('')}
                </div>
            </section>

            <!-- Upgrade if available -->
            ${cabana.upgrade ? `
            <div class="cabana-upgrade-card">
                <h3>⭐ ${cabana.upgrade.nombre}</h3>
                <ul>
                    ${cabana.upgrade.amenidades.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>` : ''}

            <!-- Note -->
            <p class="cabana-nota">*Las fotografías mostradas son una referencia, cada cabaña es única y tiene su particular estilo.</p>
        </div>

        <!-- Mobile CTA -->
        <div class="cabana-cta-mobile">
            <a href="https://direct-book.com/properties/bosquesdemonterrealdirect" target="_blank" rel="noopener" class="btn btn-primary">
                RESERVAR AHORA
            </a>
        </div>
    `;
}

/**
 * Initialize carousel functionality
 */
function initCarousel() {
    const carousel = document.querySelector('.cabana-carousel');
    if (!carousel || carousel.dataset.singleImage === 'true') return;

    const track = carousel.querySelector('.cabana-carousel-track');
    const slides = carousel.querySelectorAll('.cabana-carousel-slide');
    const prevBtn = carousel.querySelector('.cabana-carousel-btn-prev');
    const nextBtn = carousel.querySelector('.cabana-carousel-btn-next');
    const indicators = carousel.querySelectorAll('.cabana-carousel-indicator');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Button event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    // Indicator event listeners
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }
}

