// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Select Plan Function
let selectedPlan = null;

function selectPlan(element, planName) {
    // Remove previous selection
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected class to clicked card
    element.classList.add('selected');
    selectedPlan = planName;

    // Update display section
    const displayElement = document.getElementById('selectedPlanDisplay');
    
    const planDetails = {
        starter: {
            name: 'Starter Plan',
            price: '$999/month',
            description: 'Perfect for small businesses just starting out'
        },
        professional: {
            name: 'Professional Plan',
            price: '$2,499/month',
            description: 'For growing businesses ready to scale'
        },
        enterprise: {
            name: 'Enterprise Plan',
            price: '$4,999/month',
            description: 'Complete digital marketing solution'
        }
    };

    const plan = planDetails[planName];
    displayElement.innerHTML = `
        <div class="plan-info">
            <div>
                <h3 style="margin-bottom: 0.5rem;">${plan.name}</h3>
                <p style="margin: 0; color: var(--text-light);">${plan.description}</p>
                <p style="margin: 0.5rem 0 0 0; font-weight: bold; color: var(--primary-color);">${plan.price}</p>
            </div>
        </div>
    `;
    displayElement.classList.add('active');
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            alert('Thank you for reaching out! We will contact you within 24 hours.');
            this.reset();
        });
    }

    // Add animation on scroll
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

    document.querySelectorAll('.service-card, .case-card, .team-member, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Active navigation link
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});
