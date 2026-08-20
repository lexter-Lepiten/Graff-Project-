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

            dot.addEventListener('click', () => {
                this.goToSlide(i);
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

            dot.classList.toggle(
                'active',
                index === this.currentIndex
            );

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
            }
        );

        this.track.addEventListener(
            'touchmove',
            (e) => {
                moveX = e.touches[0].clientX;
            }
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
}


// OpenStreetMap
document.addEventListener(
    "DOMContentLoaded",
    function () {

        const map = document.getElementById("map");

        if (!map) {
            return;
        }

        const latitude =
            10.298821947774051;

        const longitude =
            123.89604297895866;

        map.innerHTML = `
            <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=123.8860%2C10.2888%2C123.9060%2C10.3088&layer=mapnik&marker=${latitude}%2C${longitude}"
                width="100%"
                height="100%"
                style="border: 0;"
                loading="lazy">
            </iframe>
        `;
    }
);

class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(
            document.querySelectorAll('.carousel-slide')
        );
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        this.dotsContainer = document.querySelector('.carousel-dots');

        if (!this.track || this.slides.length === 0) {
            return;
        }

        this.slideWidth = this.slides[0].offsetWidth;
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.maxIndex = Math.max(
            0,
            this.slides.length - this.slidesPerView
        );

        this.init();
    }

    init() {
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

            dot.addEventListener('click', () => {
                this.goToSlide(i);
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
            dot.classList.toggle(
                'active',
                index === this.currentIndex
            );
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
            }
        );

        this.track.addEventListener(
            'touchmove',
            (e) => {
                moveX = e.touches[0].clientX;
            }
        );

        this.track.addEventListener(
            'touchend',
            () => {
                const difference = startX - moveX;

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


// Start carousel
document.addEventListener(
    'DOMContentLoaded',
    () => {
        new Carousel();
    }
);


// GSAP animation
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

}