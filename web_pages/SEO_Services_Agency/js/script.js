// Smooth scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Toggle menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Select pricing plan
let selectedPlan = null;

function selectPricing(element, planName) {
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });

    element.classList.add('selected');
    selectedPlan = planName;

    const displayElement = document.getElementById('pricingDisplay');
    
    const planDetails = {
        starter: {
            name: 'Starter Plan',
            price: '$999/month',
            description: 'Perfect for small businesses starting their SEO journey'
        },
        professional: {
            name: 'Professional Plan',
            price: '$2,499/month',
            description: 'For growing businesses ready to scale with comprehensive SEO'
        },
        enterprise: {
            name: 'Enterprise Plan',
            price: '$4,999/month',
            description: 'For large enterprises needing full SEO domination'
        }
    };

    const plan = planDetails[planName];
    displayElement.innerHTML = `
        <div>
            <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${plan.name}</h3>
            <p style="font-size: 1.3rem; color: var(--accent-color); margin: 0.5rem 0; font-weight: bold;">${plan.price}</p>
            <p style="color: var(--text-light); margin: 0;">${plan.description}</p>
        </div>
    `;
    displayElement.classList.add('active');
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We\'ll send you a free SEO audit within 24 hours.');
            this.reset();
        });
    }

    observeElements();
});

// Observe elements for animation
function observeElements() {
    const options = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, options);

    document.querySelectorAll('.service-card, .process-step, .result-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
