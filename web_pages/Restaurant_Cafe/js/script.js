// Menu items data
const menuData = {
    appetizers: [
        {
            name: "Bruschetta al Pomodoro",
            price: "$8.99",
            description: "Toasted bread with fresh tomatoes, garlic, and basil",
            type: "Vegetarian"
        },
        {
            name: "Calamari Fritti",
            price: "$12.99",
            description: "Crispy fried squid with marinara sauce",
            type: "Seafood"
        },
        {
            name: "Caprese Salad",
            price: "$9.99",
            description: "Fresh mozzarella, tomatoes, basil, and balsamic",
            type: "Vegetarian"
        },
        {
            name: "Arancini",
            price: "$7.99",
            description: "Crispy risotto balls with meat ragù",
            type: "Meat"
        }
    ],
    mains: [
        {
            name: "Osso Buco",
            price: "$28.99",
            description: "Braised veal shank with risotto alla milanese",
            type: "Meat"
        },
        {
            name: "Branzino al Forno",
            price: "$26.99",
            description: "Whole sea bass baked with vegetables",
            type: "Seafood"
        },
        {
            name: "Risotto ai Funghi",
            price: "$18.99",
            description: "Creamy mushroom risotto with truffle oil",
            type: "Vegetarian"
        },
        {
            name: "Saltimbocca alla Romana",
            price: "$24.99",
            description: "Veal wrapped in prosciutto and sage",
            type: "Meat"
        }
    ],
    pasta: [
        {
            name: "Spaghetti Carbonara",
            price: "$14.99",
            description: "Classic Roman pasta with eggs, guanciale, and pecorino",
            type: "Meat"
        },
        {
            name: "Pappardelle al Ragù",
            price: "$16.99",
            description: "Wide ribbon pasta with slow-cooked meat sauce",
            type: "Meat"
        },
        {
            name: "Ravioli di Ricotta e Spinaci",
            price: "$15.99",
            description: "Handmade ravioli filled with ricotta and spinach",
            type: "Vegetarian"
        },
        {
            name: "Linguine ai Frutti di Mare",
            price: "$18.99",
            description: "Pasta with mixed seafood in white wine sauce",
            type: "Seafood"
        }
    ],
    desserts: [
        {
            name: "Tiramisu",
            price: "$6.99",
            description: "Classic Italian dessert with mascarpone and espresso",
            type: "Vegetarian"
        },
        {
            name: "Panna Cotta",
            price: "$6.99",
            description: "Creamy vanilla panna cotta with berry compote",
            type: "Vegetarian"
        },
        {
            name: "Cannoli",
            price: "$5.99",
            description: "Crispy pastry tubes filled with sweet ricotta cream",
            type: "Vegetarian"
        },
        {
            name: "Gelato Trio",
            price: "$7.99",
            description: "Three scoops of our house-made gelato",
            type: "Vegetarian"
        }
    ],
    drinks: [
        {
            name: "Italian Red Wine",
            price: "$7-12",
            description: "Selection of fine Italian red wines",
            type: "Wine"
        },
        {
            name: "Prosecco",
            price: "$6-8",
            description: "Sparkling Italian wine",
            type: "Wine"
        },
        {
            name: "Espresso",
            price: "$2.99",
            description: "Strong Italian coffee",
            type: "Coffee"
        },
        {
            name: "Limoncello",
            price: "$4.99",
            description: "Traditional Italian lemon liqueur",
            type: "Liqueur"
        }
    ]
};

let currentMenuCategory = 'appetizers';

// Display menu
function displayMenu(category) {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    menuData[category].forEach(item => {
        const menuItem = document.createElement('div');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `
            <div class="menu-item-header">
                <span class="menu-item-name">${item.name}</span>
                <span class="menu-item-price">${item.price}</span>
            </div>
            <p class="menu-item-description">${item.description}</p>
            <span class="menu-item-type">${item.type}</span>
        `;
        menuGrid.appendChild(menuItem);
    });
}

// Switch menu category
function switchMenu(category) {
    currentMenuCategory = category;

    // Update active button
    document.querySelectorAll('.menu-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    displayMenu(category);
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
    displayMenu('appetizers');

    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your reservation! We look forward to seeing you.');
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

    document.querySelectorAll('.menu-item, .testimonial-card, .info-box').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}
