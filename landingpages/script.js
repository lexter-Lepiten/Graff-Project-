class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(
            document.querySelectorAll('.carousel-slide')
        );

        this.prevButton = document.querySelector(
            '.carousel-button.prev'
        );

        this.nextButton = document.querySelector(
            '.carousel-button.next'
        );

        this.dotsContainer = document.querySelector(
            '.carousel-dots'
        );

        this.currentIndex = 0;
        this.resizeTimeout = null;

        this.slideWidth = this.slides.length > 0
            ? this.slides[0].offsetWidth
            : 0;

        this.slidesPerView = this.getSlidesPerView();

        this.maxIndex = Math.max(
            0,
            this.slides.length - this.slidesPerView
        );

        this.init();
    }

    init() {
        if (!this.track || this.slides.length === 0) {
            return;
        }

        this.createDots();

        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => {
                this.move('prev');
            });
        }

        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => {
                this.move('next');
            });
        }

        window.addEventListener('resize', () => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 150);
        });

        // Slide images may still be loading (lazy) when offsetWidth is first
        // read, so recompute once everything has actually loaded.
        window.addEventListener('load', () => {
            this.handleResize();
        });

        this.updateDots();
        this.updateButtons();

        this.addTouchSupport();
    }

    getSlidesPerView() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth <= 768) {
            return 1;
        }

        if (viewportWidth <= 1200) {
            return 2;
        }

        return 3;
    }

    createDots() {
        if (!this.dotsContainer) {
            return;
        }

        this.dotsContainer.innerHTML = '';

        const dotCount = Math.max(
            1,
            this.slides.length - this.slidesPerView + 1
        );

        for (let i = 0; i < dotCount; i++) {

            const dot = document.createElement('div');

            dot.classList.add('dot');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('tabindex', '0');
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);

            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });

            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.goToSlide(i);
                }
            });

            this.dotsContainer.appendChild(dot);
        }
    }

    move(direction) {

        if (
            direction === 'prev' &&
            this.currentIndex > 0
        ) {
            this.currentIndex--;
        }

        if (
            direction === 'next' &&
            this.currentIndex < this.maxIndex
        ) {
            this.currentIndex++;
        }

        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    goToSlide(index) {

        this.currentIndex = Math.max(
            0,
            Math.min(index, this.maxIndex)
        );

        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    updateSlidePosition() {

        const position =
            -this.currentIndex * this.slideWidth;

        this.track.style.transform =
            `translateX(${position}px)`;
    }

    updateDots() {

        if (!this.dotsContainer) {
            return;
        }

        const dots = Array.from(
            this.dotsContainer.children
        );

        dots.forEach((dot, index) => {

            const isActive = index === this.currentIndex;

            dot.classList.toggle('active', isActive);
            dot.setAttribute('aria-selected', String(isActive));

        });
    }

    updateButtons() {

        if (this.prevButton) {
            this.prevButton.disabled =
                this.currentIndex === 0;
        }

        if (this.nextButton) {
            this.nextButton.disabled =
                this.currentIndex === this.maxIndex;
        }
    }

    handleResize() {

        if (this.slides.length === 0) {
            return;
        }

        this.slideWidth =
            this.slides[0].offsetWidth;

        this.slidesPerView =
            this.getSlidesPerView();

        this.maxIndex = Math.max(
            0,
            this.slides.length - this.slidesPerView
        );

        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }

        this.createDots();
        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    addTouchSupport() {

        let startX = 0;
        let moveX = 0;

        const minSwipeDistance = 50;

        this.track.addEventListener(
            'touchstart',
            (e) => {
                startX = e.touches[0].clientX;
                moveX = startX;
            },
            { passive: true }
        );

        this.track.addEventListener(
            'touchmove',
            (e) => {
                moveX = e.touches[0].clientX;
            },
            { passive: true }
        );

        this.track.addEventListener(
            'touchend',
            () => {

                const difference =
                    startX - moveX;

                if (
                    Math.abs(difference) >
                    minSwipeDistance
                ) {

                    if (difference > 0) {
                        this.move('next');
                    } else {
                        this.move('prev');
                    }

                }
            }
        );
    }
}


// Initialize carousel
document.addEventListener(
    'DOMContentLoaded',
    () => {
        new Carousel();
    }
);


// GSAP loading animation
if (typeof gsap !== 'undefined') {

    gsap.fromTo(
        ".loading-page",
        { opacity: 1 },
        {
            opacity: 0,
            display: "none",
            duration: 1.5,
            delay: 3.5
        }
    );

    gsap.fromTo(
        ".logo-name",
        {
            y: 50,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 2,
            delay: 0.5
        }
    );

} else {

    // GSAP failed to load (CDN blocked, offline, ad blocker, etc).
    // Without this, the loading page's opacity/display never change and
    // it permanently covers the site. Fall back to a plain CSS transition
    // so the page is never stuck behind the loading screen.
    const loadingPage = document.querySelector(".loading-page");

    if (loadingPage) {
        loadingPage.style.transition = "opacity 1.5s ease";

        setTimeout(() => {
            loadingPage.style.opacity = "0";

            setTimeout(() => {
                loadingPage.style.display = "none";
            }, 1500);
        }, 3500);
    }
}


// Safety net: no matter what happens above, never let the loading page
// block the site for more than a few seconds.
setTimeout(() => {
    const loadingPage = document.querySelector(".loading-page");

    if (loadingPage && loadingPage.style.display !== "none") {
        loadingPage.style.display = "none";
    }
}, 6000);


// OpenStreetMap
document.addEventListener(
    "DOMContentLoaded",
    function () {

        const map = document.getElementById("map");

        if (!map) {
            return;
        }

        const latitude = 10.298821947774051;
        const longitude = 123.89604297895866;

        // Small bounding box centered on the marker so the embed always
        // frames the boutique regardless of what coordinates are used
        // above (previously this bbox was hardcoded and unrelated to
        // latitude/longitude, so moving the marker did nothing visually).
        const delta = 0.01;
        const bbox = [
            longitude - delta,
            latitude - delta,
            longitude + delta,
            latitude + delta
        ].join('%2C');

        map.innerHTML = `
            <iframe
                title="Map showing the Graff boutique location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}"
                width="100%"
                height="100%"
                style="border: 0;"
                loading="lazy">
            </iframe>
        `;
    }
);