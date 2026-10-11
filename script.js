// ================= THEME TOGGLE =================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (systemPrefersDark) {
    htmlElement.setAttribute('data-bs-theme', 'dark');
    updateThemeIcon('dark');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'bi bi-sun-fill';
    } else {
        themeIcon.className = 'bi bi-moon-stars-fill';
    }
}

// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('mainNavbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    if (window.scrollY > 400) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
    
    updateActiveNavLink();
}, { passive: true });

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            
            const navbarCollapse = document.getElementById('navMenu');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    });
});

// ================= CONTACT FORM =================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const product = formData.get('product');
            const message = formData.get('message');
            
            const whatsappMessage = `*New Inquiry from Website*%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Phone:* ${phone}%0A` +
                `*Product:* ${product}%0A` +
                `*Message:* ${message}`;
            
            window.open(`https://wa.me/923216714824?text=${whatsappMessage}`, '_blank');
            
            btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Message Sent!';
            btn.classList.add('btn-success');
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.classList.remove('btn-success');
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// ================= SCROLL REVEAL =================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.software-card, .contact-info-card, .about-feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ================= WINDOW RESIZE =================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth >= 992) {
            const navbarCollapse = document.getElementById('navMenu');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    }, 250);
});

// ================= PRESENTATION CAROUSEL =================
const presentations = {
    'flour-mill': {
        name: 'Flour M.',
        screenshots: [
            'images/screenshots/flour-mill-1.jpg',
            'images/screenshots/flour-mill-2.jpg',
            'images/screenshots/flour-mill-3.jpg',
            'images/screenshots/flour-mill-4.jpg'
        ],
        whatsappText: 'Flour%20M%20ka%20demo%20chahiye'
    },
    'rice-mill': {
        name: 'Rice M.',
        screenshots: [
            'images/screenshots/rice-mill-1.jpg',
            'images/screenshots/rice-mill-2.jpg',
            'images/screenshots/rice-mill-3.jpg'
        ],
        whatsappText: 'Rice%20M%20ka%20demo%20chahiye'
    },
    'fuel-m': {
        name: 'Fuel M.',
        screenshots: [
            'images/screenshots/fuel-m-1.jpg',
            'images/screenshots/fuel-m-2.jpg',
            'images/screenshots/fuel-m-3.jpg'
        ],
        whatsappText: 'Fuel%20M%20ka%20demo%20chahiye'
    },
    'seed-pro': {
        name: 'Seed Pro.',
        screenshots: [
            'images/screenshots/seed-pro-1.jpg',
            'images/screenshots/seed-pro-2.jpg',
            'images/screenshots/seed-pro-3.jpg'
        ],
        whatsappText: 'Seed%20Pro%20ka%20demo%20chahiye'
    },
    'gin-master': {
        name: 'Gin Master',
        screenshots: [
            'images/screenshots/gin-master-1.jpg',
            'images/screenshots/gin-master-2.jpg',
            'images/screenshots/gin-master-3.jpg'
        ],
        whatsappText: 'Gin%20Master%20ka%20demo%20chahiye'
    },
    'easy-accounting': {
        name: 'Easy Accounting',
        screenshots: [
            'images/screenshots/easy-accounting-1.jpg',
            'images/screenshots/easy-accounting-2.jpg',
            'images/screenshots/easy-accounting-3.jpg'
        ],
        whatsappText: 'Easy%20Accounting%20ka%20demo%20chahiye'
    },
    'inventory-pro': {
        name: 'Inventory Pro',
        screenshots: [
            'images/screenshots/inventory-pro-1.jpg',
            'images/screenshots/inventory-pro-2.jpg',
            'images/screenshots/inventory-pro-3.jpg'
        ],
        whatsappText: 'Inventory%20Pro%20ka%20demo%20chahiye'
    },
    'traders-pro': {
        name: 'Traders Pro.',
        screenshots: [
            'images/screenshots/traders-pro-1.jpg',
            'images/screenshots/traders-pro-2.jpg',
            'images/screenshots/traders-pro-3.jpg'
        ],
        whatsappText: 'Traders%20Pro%20ka%20demo%20chahiye'
    }
};

const presentationModal = document.getElementById('presentationModal');
if (presentationModal) {
    presentationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const softwareKey = button.getAttribute('data-software');
        const data = presentations[softwareKey];
        
        if (!data) return;
        
        document.getElementById('modalSoftwareName').textContent = data.name;
        
        const indicatorsContainer = document.getElementById('carouselIndicators');
        const innerContainer = document.getElementById('carouselInner');
        
        indicatorsContainer.innerHTML = '';
        innerContainer.innerHTML = '';
        
        data.screenshots.forEach((url, index) => {
            const indicator = document.createElement('button');
            indicator.type = 'button';
            indicator.setAttribute('data-bs-target', '#presentationCarousel');
            indicator.setAttribute('data-bs-slide-to', index);
            indicator.setAttribute('aria-label', `Slide ${index + 1}`);
            if (index === 0) {
                indicator.classList.add('active');
                indicator.setAttribute('aria-current', 'true');
            }
            indicatorsContainer.appendChild(indicator);
            
            const slide = document.createElement('div');
            slide.className = 'carousel-item' + (index === 0 ? ' active' : '');
            
            const img = document.createElement('img');
            img.src = url;
            img.alt = `${data.name} Screenshot ${index + 1}`;
            img.loading = 'lazy';
            
            slide.appendChild(img);
            innerContainer.appendChild(slide);
        });
        
        const requestDemoBtn = document.getElementById('modalRequestDemoBtn');
        requestDemoBtn.href = `https://wa.me/923216714824?text=${data.whatsappText}`;
    });
}

// ================= CONSOLE MESSAGE =================
console.log('%cMulti System Software', 'font-size: 20px; font-weight: bold; color: #3DAD57;');
console.log('%cWebsite Loaded Successfully! 🚀', 'font-size: 14px; color: #10b981;');
console.log('%cRahim Yar Khan, Pakistan | +92 321 6714824', 'font-size: 12px; color: #94a3b8;');
