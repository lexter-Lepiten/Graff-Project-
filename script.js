class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(document.querySelectorAll('.carousel-slide'));
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nextButton = document.querySelector('.carousel-button.next');
        this.dotsContainer = document.querySelector('.carousel-dots');

        this.slideWidth = this.slides[0].offsetWidth;
        this.currentIndex = 0;
        this.slidesPerView = this.getSlidesPerView();
        this.maxIndex = this.slides.length - this.slidesPerView;

        this.init();
    }

    init() {
        this.createDots();

        this.prevButton.addEventListener('click', () => this.move('prev'));
        this.nextButton.addEventListener('click', () => this.move('next'));
        window.addEventListener('resize', () => this.handleResize());

        this.updateDots();
        this.updateButtons();

        this.addTouchSupport();
    }

    getSlidesPerView() {
        const viewportWidth = window.innerWidth;
        if (viewportWidth <= 768) return 1;
        if (viewportWidth <= 1200) return 2;
        return 3;
    }

    createDots() {
        const dotCount = this.slides.length - this.slidesPerView + 1;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
    }

    move(direction) {
        if (direction === 'prev' && this.currentIndex > 0) {
            this.currentIndex--;
        } else if (direction === 'next' && this.currentIndex < this.maxIndex) {
            this.currentIndex++;
        }

        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    updateSlidePosition() {
        const position = -this.currentIndex * this.slideWidth;
        this.track.style.transform = `translateX(${position}px)`;
    }

    updateDots() {
        const dots = Array.from(this.dotsContainer.children);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
    }

    updateButtons() {
        this.prevButton.disabled = this.currentIndex === 0;
        this.nextButton.disabled = this.currentIndex === this.maxIndex;
    }

    handleResize() {
        this.slideWidth = this.slides[0].offsetWidth;
        this.slidesPerView = this.getSlidesPerView();
        this.maxIndex = this.slides.length - this.slidesPerView;

        if (this.currentIndex > this.maxIndex) {
            this.currentIndex = this.maxIndex;
        }

        this.updateSlidePosition();
        this.updateDots();
        this.updateButtons();
    }

    addTouchSupport() {
        let startX, moveX;
        const minSwipeDistance = 50;

        this.track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX;
        });

        this.track.addEventListener('touchend', () => {
            const difference = startX - moveX;
            if (Math.abs(difference) > minSwipeDistance) {
                if (difference > 0) {
                    this.move('next');
                } else {
                    this.move('prev');
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});

gsap.fromTo(
    ".loading-page",
    { opacity: 1 },
    {
      opacity: 0,
      display: "none",
      duration: 1.5,
      delay: 3.5,
    }
  );

gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );