class NavigationSpy {
    constructor() {
        this.sections = document.querySelectorAll('section, footer');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.menuToggle = document.getElementById('menuToggle');
        this.menuClose = document.getElementById('menuClose');
        this.navMenu = document.getElementById('navMenu');

        this.init();
    }

   init() {
        window.addEventListener('scroll', () => this.spyScroll());

        if (this.menuToggle && this.navMenu) {
            this.menuToggle.addEventListener('click', () => this.openMenu());
        }
        if (this.menuClose) {
            this.menuClose.addEventListener('click', () => this.closeMenu());
        }

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }

    openMenu() {
        this.navMenu.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    closeMenu() {
        if (this.navMenu.classList.contains('is-open')) {
            this.navMenu.classList.remove('is-open');
            document.body.style.overflow = '';
        }
    }

    spyScroll() {
        let currentSectionId = '';
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        if ((scrollPosition + windowHeight) >= documentHeight - 50) {
            const lastSection = this.sections[this.sections.length - 1];
            currentSectionId = lastSection.getAttribute('id');
        } else {
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - 170;
                if (scrollPosition >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            });
        }

        this.navLinks.forEach(link => {
            link.classList.remove('active');
        const href = link.getAttribute('href');
            if (href === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    }

window.NavigationSpy = NavigationSpy;
