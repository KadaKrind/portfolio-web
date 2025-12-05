// ==========================================
// DESIGN PORTFOLIO - JAVASCRIPT
// Con Lightbox Modal para imágenes
// ==========================================

// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const navLinks = document.querySelectorAll('.nav-link');
const clickableImages = document.querySelectorAll('.project-image.clickable');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.querySelector('.modal-close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentImageIndex = 0;
let allImages = [];

// ========== INITIALIZE IMAGES ARRAY ==========
function initializeImages() {
    allImages = Array.from(clickableImages).map(img => img.querySelector('img'));
}

// ========== LIGHTBOX FUNCTIONALITY ==========
clickableImages.forEach((imageWrapper, index) => {
    imageWrapper.style.cursor = 'pointer';
    imageWrapper.addEventListener('click', () => {
        currentImageIndex = index;
        openModal(index);
    });
});

function openModal(index) {
    const img = allImages[index];
    modalImage.src = img.src;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Enable scrolling
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
    openModal(currentImageIndex);
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % allImages.length;
    openModal(currentImageIndex);
}

// Close button
modalClose.addEventListener('click', closeModal);

// Navigation buttons
prevBtn.addEventListener('click', showPreviousImage);
nextBtn.addEventListener('click', showNextImage);

// Click outside modal to close
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'ArrowLeft') showPreviousImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape') closeModal();
    }
});

// ========== FILTER FUNCTIONALITY ==========
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Get filter value
        const filterValue = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const cardFilter = card.getAttribute('data-filter');
            
            if (filterValue === 'all' || cardFilter === filterValue) {
                card.classList.remove('hidden');
                // Trigger animation
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.5s ease';
                }, 10);
            } else {
                card.classList.add('hidden');
            }
        });
        
        // Reinitialize images after filter
        initializeImages();
    });
});

// ========== SMOOTH SCROLLING FOR NAV LINKS ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Get target section
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== UPDATE ACTIVE NAV LINK ON SCROLL ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========== LAZY LOADING IMAGES ==========
const images = document.querySelectorAll('.project-image img');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========== ANIMATION ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards for animation
projectCards.forEach(card => {
    observer.observe(card);
});

// Initialize on page load
window.addEventListener('load', () => {
    initializeImages();
});

console.log('Design Portfolio Script Loaded with Lightbox! 🎨✨');

        // Language Toggle
        const langToggle = document.getElementById('langToggle');
        let currentLang = localStorage.getItem('language') || 'es';

        // Initialize language on page load
        setLanguage(currentLang);

        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            localStorage.setItem('language', currentLang);
            setLanguage(currentLang);
        });

        function setLanguage(lang) {
            document.querySelectorAll('[data-en][data-es]').forEach(element => {
                element.textContent = lang === 'en' ? element.dataset.en : element.dataset.es;
            });

            // Update button text
            langToggle.textContent = lang === 'en' ? 'ES' : 'EN';

            // Update HTML lang attribute
            document.documentElement.lang = lang;
        }
   