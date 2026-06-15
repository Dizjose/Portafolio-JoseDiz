class TechCarousel {
    constructor() {
        this.rail = document.getElementById('techSliderRail');
        this.btnPrev = document.getElementById('btnSlidePrev');
        this.btnNext = document.getElementById('btnSlideNext');
        this.dots = document.querySelectorAll('.dot-indicator');
        
        this.currentIndex = 0;
        this.autoplayTimer = null;
        this.isPaused = false;
        this.intervalDuration = 4000;
        
        this.init();
    }

    init() {
        if (!this.rail) return;

        this.btnNext.addEventListener('click', () => this.nextSlide());
        this.btnPrev.addEventListener('click', () => this.prevSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateView();
                this.resetAutoplay();
            });
        });

        this.startAutoplay();
        const container = document.querySelector('.slider-viewport-container');
        if (container) {
            container.addEventListener('mouseenter', () => this.stopAutoplay());
            container.addEventListener('mouseleave', () => {
                this.isPaused = false;
                this.startAutoplay();
            }); 
        }

        window.addEventListener('resize', () => this.updateView());
    }

    getCardsInView() {
        if (window.innerWidth <= 520) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    nextSlide() {
        const totalCards = this.rail.children.length;
        const cardsPerGroup = 3;
        const maxIndex = Math.ceil(totalCards / cardsPerGroup) - 1;

        if (this.currentIndex >= maxIndex) {
            this.currentIndex = 0;
        } else {
            this.currentIndex++;
        }
        this.updateView();
        this.resetAutoplay();
    }

    prevSlide() {
        const totalCards = this.rail.children.length;
        const cardsPerGroup = 3;
        const maxIndex = Math.ceil(totalCards / cardsPerGroup) - 1;

        if (this.currentIndex <= 0) {
        this.currentIndex = maxIndex;
        } else {
        this.currentIndex--;
        }
    
        this.updateView();
        this.resetAutoplay();
}

    updateView() {
        const card = this.rail.querySelector('.tech-mega-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight) || 24;
        
        const cardsPerGroup = 3;
        const distance = this.currentIndex * (cardWidth + marginRight) * cardsPerGroup;
        this.rail.style.transform = `translateX(-${distance}px)`;

        this.dots.forEach((dot, idx) => {
            if (idx === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    startAutoplay() {
        if (this.isPaused || this.autoplayTimer !== null) return;

        this.autoplayTimer = setInterval(() => {
            const totalCards = this.rail.children.length;
            const cardsPerGroup = 3;
            const maxIndex = Math.ceil(totalCards / cardsPerGroup) - 1;
            if (this.currentIndex >= maxIndex) {
                this.currentIndex = 0;
            } else {
                this.currentIndex++;
            }
            this.updateView();
        }, this.intervalDuration);
    }

    stopAutoplay() {
        this.isPaused = true;
        if (this.autoplayTimer !== null) {
            clearInterval(this.autoplayTimer);
            this.autoplayTimer = null;
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        setTimeout(() => {
        this.startAutoplay();
    }, 500);
  }
}

window.TechCarousel = TechCarousel;
