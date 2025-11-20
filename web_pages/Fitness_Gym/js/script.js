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

// Select class
let selectedClass = null;

function selectClass(element, className) {
    const display = document.getElementById('classDisplay');
    
    const classInfo = {
        strength: {
            name: 'Strength Training',
            description: 'Build muscle and increase your strength with guided exercises using weights and resistance equipment.',
            duration: '60 minutes',
            members: 12,
            schedule: 'Mon, Wed, Fri - 6:00 PM',
            intensity: 'High'
        },
        cardio: {
            name: 'Cardio Blast',
            description: 'High-intensity cardiovascular workouts designed to burn calories and improve heart health.',
            duration: '45 minutes',
            members: 20,
            schedule: 'Tue, Thu, Sat - 7:00 PM',
            intensity: 'Very High'
        },
        yoga: {
            name: 'Yoga & Flexibility',
            description: 'Improve flexibility, balance, and mental wellness with guided yoga sessions.',
            duration: '50 minutes',
            members: 15,
            schedule: 'Mon, Wed, Fri - 7:30 AM',
            intensity: 'Low to Medium'
        },
        hiit: {
            name: 'HIIT Training',
            description: 'Maximum results in minimum time with high-intensity interval training.',
            duration: '30 minutes',
            members: 18,
            schedule: 'Tue, Thu, Sat - 6:00 PM',
            intensity: 'Very High'
        },
        spin: {
            name: 'Spin Class',
            description: 'Energetic indoor cycling sessions with motivating music and expert instructors.',
            duration: '45 minutes',
            members: 25,
            schedule: 'Daily - 6:30 PM',
            intensity: 'High'
        },
        boxing: {
            name: 'Boxing',
            description: 'Learn boxing skills, build power, and get an amazing full-body workout.',
            duration: '55 minutes',
            members: 14,
            schedule: 'Mon, Wed, Fri - 5:00 PM',
            intensity: 'Very High'
        }
    };

    const info = classInfo[className];
    display.innerHTML = `
        <div style="text-align: left;">
            <h3 style="color: var(--accent-color); margin-bottom: 1rem;">${info.name}</h3>
            <p style="margin-bottom: 0.5rem;"><strong>Description:</strong> ${info.description}</p>
            <p style="margin-bottom: 0.5rem;"><strong>Duration:</strong> ${info.duration}</p>
            <p style="margin-bottom: 0.5rem;"><strong>Members:</strong> ${info.members} per class</p>
            <p style="margin-bottom: 0.5rem;"><strong>Schedule:</strong> ${info.schedule}</p>
            <p style="margin: 0;"><strong>Intensity:</strong> ${info.intensity}</p>
        </div>
    `;
    display.classList.add('active');
}

// Select pricing
let selectedPricing = null;

function selectPricing(element, planName) {
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.classList.remove('selected');
    });

    element.classList.add('selected');
    selectedPricing = planName;

    const displayElement = document.getElementById('pricingDisplay');
    
    const planDetails = {
        basic: {
            name: 'Basic Plan',
            price: '$29/month',
            description: 'Perfect for beginners starting their fitness journey'
        },
        premium: {
            name: 'Premium Plan',
            price: '$59/month',
            description: 'Best overall value with unlimited classes and amenities'
        },
        elite: {
            name: 'Elite Plan',
            price: '$99/month',
            description: 'For serious athletes with personal training and premium services'
        }
    };

    const plan = planDetails[planName];
    displayElement.innerHTML = `
        <div>
            <h3 style="color: var(--accent-color); margin-bottom: 0.5rem;">${plan.name}</h3>
            <p style="font-size: 1.3rem; color: var(--primary-color); margin: 0.5rem 0; font-weight: bold;">${plan.price}</p>
            <p style="color: var(--text-light); margin: 0;">${plan.description}</p>
        </div>
    `;
    displayElement.classList.add('active');
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you! We will contact you soon to discuss your fitness goals.');
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

    document.querySelectorAll('.feature-card, .class-card, .trainer-card, .pricing-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
