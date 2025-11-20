// Properties data
const propertiesData = {
    all: [
        {
            id: 1,
            title: "Modern Downtown Apartment",
            type: "apartment",
            price: "$450,000",
            location: "Downtown District",
            beds: 2,
            baths: 2,
            sqft: 1200,
            icon: "fas fa-building"
        },
        {
            id: 2,
            title: "Luxury Family Home",
            type: "house",
            price: "$850,000",
            location: "Suburban Heights",
            beds: 4,
            baths: 3,
            sqft: 3500,
            icon: "fas fa-home"
        },
        {
            id: 3,
            title: "Executive Penthouse",
            type: "condo",
            price: "$1,200,000",
            location: "Downtown Skyline",
            beds: 3,
            baths: 3,
            sqft: 2200,
            icon: "fas fa-gem"
        },
        {
            id: 4,
            title: "Cozy Studio Apartment",
            type: "apartment",
            price: "$280,000",
            location: "Arts District",
            beds: 1,
            baths: 1,
            sqft: 600,
            icon: "fas fa-door-open"
        },
        {
            id: 5,
            title: "Contemporary Condo",
            type: "condo",
            price: "$625,000",
            location: "Waterfront",
            beds: 2,
            baths: 2,
            sqft: 1400,
            icon: "fas fa-building"
        },
        {
            id: 6,
            title: "Spacious House with Garden",
            type: "house",
            price: "$950,000",
            location: "Green Valley",
            beds: 5,
            baths: 4,
            sqft: 4200,
            icon: "fas fa-home"
        }
    ]
};

let currentFilter = 'all';

// Display properties
function displayProperties(filter = 'all') {
    const propertiesGrid = document.getElementById('propertiesGrid');
    propertiesGrid.innerHTML = '';

    let properties = propertiesData.all;
    if (filter !== 'all') {
        properties = propertiesData.all.filter(p => p.type === filter);
    }

    properties.forEach(property => {
        const propertyCard = document.createElement('div');
        propertyCard.className = 'property-card';
        propertyCard.innerHTML = `
            <div class="property-image">
                <i class="${property.icon}"></i>
                <span class="property-price">${property.price}</span>
                <span class="property-type">${property.type.toUpperCase()}</span>
            </div>
            <div class="property-info">
                <h3 class="property-title">${property.title}</h3>
                <p class="property-location">
                    <i class="fas fa-map-marker-alt"></i> ${property.location}
                </p>
                <div class="property-details">
                    <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                    <span><i class="fas fa-ruler"></i> ${property.sqft} Sqft</span>
                </div>
                <p class="property-description">Beautiful property in prime location with modern amenities.</p>
            </div>
        `;
        propertiesGrid.appendChild(propertyCard);
    });
}

// Filter properties
function filterProperties(type) {
    currentFilter = type;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayProperties(type);
}

// Handle search
function handleSearch(e) {
    e.preventDefault();
    alert('Search functionality coming soon! Please browse our featured properties.');
}

// Toggle menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Smooth scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    displayProperties();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your inquiry! We will contact you soon.');
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

    document.querySelectorAll('.property-card, .agent-card, .service-item, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
