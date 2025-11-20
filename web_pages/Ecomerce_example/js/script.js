// Sample Products Data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 89.99,
        description: "High-quality wireless headphones with noise cancellation",
        emoji: "🎧"
    },
    {
        id: 2,
        name: "Smartphone Stand",
        category: "electronics",
        price: 24.99,
        description: "Adjustable phone stand for desk and travel",
        emoji: "📱"
    },
    {
        id: 3,
        name: "Winter Jacket",
        category: "fashion",
        price: 149.99,
        description: "Warm and stylish winter jacket for cold weather",
        emoji: "🧥"
    },
    {
        id: 4,
        name: "Designer Sunglasses",
        category: "fashion",
        price: 199.99,
        description: "Premium UV protection sunglasses",
        emoji: "😎"
    },
    {
        id: 5,
        name: "Coffee Maker",
        category: "home",
        price: 79.99,
        description: "Programmable coffee maker with thermal carafe",
        emoji: "☕"
    },
    {
        id: 6,
        name: "Plant Pot Set",
        category: "home",
        price: 45.99,
        description: "Set of 3 decorative ceramic plant pots",
        emoji: "🪴"
    },
    {
        id: 7,
        name: "Yoga Mat",
        category: "sports",
        price: 34.99,
        description: "Non-slip yoga mat with carrying strap",
        emoji: "🧘"
    },
    {
        id: 8,
        name: "Running Shoes",
        category: "sports",
        price: 129.99,
        description: "Professional running shoes with cushioning",
        emoji: "👟"
    },
    {
        id: 9,
        name: "Tablet",
        category: "electronics",
        price: 399.99,
        description: "10-inch tablet with high resolution display",
        emoji: "📱"
    },
    {
        id: 10,
        name: "Desk Lamp",
        category: "home",
        price: 55.99,
        description: "LED desk lamp with adjustable brightness",
        emoji: "💡"
    },
    {
        id: 11,
        name: "Sneaker Shoes",
        category: "fashion",
        price: 99.99,
        description: "Comfortable everyday sneaker shoes",
        emoji: "👟"
    },
    {
        id: 12,
        name: "Fitness Tracker",
        category: "sports",
        price: 149.99,
        description: "Wearable fitness tracker with heart rate monitor",
        emoji: "⌚"
    }
];

// Shopping Cart Array
let cart = [];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    displayProducts(products);
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will contact you soon.');
        this.reset();
    });
});

// Display products
function displayProducts(productsToDisplay) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 2rem;">No products found</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Add</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;

    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchInput) || 
                            product.description.toLowerCase().includes(searchInput);
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
        
        let matchesPrice = true;
        if (priceFilter === '0-50') matchesPrice = product.price <= 50;
        else if (priceFilter === '50-100') matchesPrice = product.price > 50 && product.price <= 100;
        else if (priceFilter === '100-500') matchesPrice = product.price > 100 && product.price <= 500;
        else if (priceFilter === '500+') matchesPrice = product.price > 500;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    displayProducts(filtered);
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    alert(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update cart
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotal.textContent = '$0.00';
        tax.textContent = '$0.00';
        total.textContent = '$0.00';
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <small>Qty: ${item.quantity}</small>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.10;
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    tax.textContent = `$${taxAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('active');
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = total * 0.10;
    alert(`Thank you for your purchase!\n\nTotal: $${(total + taxAmount).toFixed(2)}\n\nOrder confirmed!`);
    cart = [];
    updateCart();
    toggleCart();
}

// Smooth scroll
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}
