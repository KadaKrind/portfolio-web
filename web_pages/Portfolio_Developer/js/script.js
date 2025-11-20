// Projects data
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "ecommerce",
        description: "Full-stack e-commerce application with shopping cart and payment integration.",
        tech: ["React", "Node.js", "MongoDB"],
        icon: "fas fa-shopping-cart"
    },
    {
        id: 2,
        title: "Project Management App",
        category: "web",
        description: "Real-time collaboration tool for project tracking and team management.",
        tech: ["Vue.js", "Firebase", "Tailwind"],
        icon: "fas fa-tasks"
    },
    {
        id: 3,
        title: "Social Media Dashboard",
        category: "design",
        description: "UI/UX design for a comprehensive social media analytics dashboard.",
        tech: ["Figma", "UI Design", "Prototyping"],
        icon: "fas fa-chart-line"
    },
    {
        id: 4,
        title: "Blog Platform",
        category: "web",
        description: "Content management system with SEO optimization and user authentication.",
        tech: ["Next.js", "PostgreSQL", "Stripe"],
        icon: "fas fa-blog"
    },
    {
        id: 5,
        title: "Fitness Tracker",
        category: "ecommerce",
        description: "Mobile-friendly web app for tracking workouts and nutrition goals.",
        tech: ["React Native", "Firebase", "Charts.js"],
        icon: "fas fa-heartbeat"
    },
    {
        id: 6,
        title: "Design System",
        category: "design",
        description: "Complete design system and component library with documentation.",
        tech: ["Figma", "Storybook", "CSS"],
        icon: "fas fa-palette"
    }
];

let currentFilter = 'all';

// Display projects
function displayProjects(filter = 'all') {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';

    let filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(p => p.category === filter);

    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;
        portfolioGrid.appendChild(projectCard);
    });
}

// Filter projects
function filterProjects(category) {
    currentFilter = category;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayProjects(category);
}

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

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    displayProjects();

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Scroll animations
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

    document.querySelectorAll('.project-card, .skill-category, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
