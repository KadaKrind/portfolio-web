// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Start Trial function
function startTrial() {
    const email = document.querySelector('.hero-form input[type="email"]').value;
    if (email) {
        alert(`Great! We've sent a welcome email to ${email}. Check your inbox to start your free trial!`);
    } else {
        alert('Please enter your email to start your free trial.');
    }
}

// Toggle Billing
function toggleBilling(period) {
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (event.target.classList.contains('toggle-btn')) {
        event.target.classList.add('active');
    }
    
    alert(`Switched to ${period === 'annual' ? 'Annual (Save 20%)' : 'Monthly'} billing!`);
}

// Select Pricing Plan
let selectedPricingPlan = null;

function selectPricingPlan(element, planName) {
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });

    element.classList.add('selected');
    selectedPricingPlan = planName;

    const displayElement = document.getElementById('pricingDisplay');
    
    const planDetails = {
        free: {
            name: 'Free Plan',
            price: '$0/month',
            description: 'Perfect for getting started'
        },
        professional: {
            name: 'Professional Plan',
            price: '$29/month per user',
            description: 'For growing teams'
        },
        enterprise: {
            name: 'Enterprise Plan',
            price: '$99/month per user',
            description: 'For large organizations'
        }
    };

    const plan = planDetails[planName];
    displayElement.innerHTML = `
        <div class="plan-details">
            <div class="plan-name">${plan.name}</div>
            <div class="plan-price">${plan.price}</div>
            <div class="plan-desc">${plan.description}</div>
        </div>
    `;
    displayElement.classList.add('active');
}

// Toggle FAQ
function toggleFAQ(element) {
    const question = element;
    const answer = element.nextElementSibling;

    // Close other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        const a = item.querySelector('.faq-answer');
        if (q !== question) {
            q.classList.remove('active');
            a.classList.remove('active');
        }
    });

    // Toggle current FAQ
    question.classList.toggle('active');
    answer.classList.toggle('active');
}

// Document Ready
document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animations
    observeElements();

    // Contact form (if needed)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        });
    }
});

// Observe elements for scroll animation
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

    document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .pricing-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
