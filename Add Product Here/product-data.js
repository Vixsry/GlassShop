// Sample products data
const products = [
    { id: 1, name: 'Iphone 15 Pro Max', price:  31249000, image: 'Add Product Here/product/product-1.png' },
    { id: 2, name: 'SAMSUNG S23 Ultra', price: 21999000, image: 'Add Product Here/product/product-2.png' },
    { id: 3, name: 'Google Pixel', price: 1500000, image: 'Add Product Here/product/product-3.png' },
    { id: 4, name: 'Nothing Phone (2a)', price: 6850000, image: 'Add Product Here/product/product-4.png' },
];

// Shopping cart
let cart = [];

// Render products
function renderProducts() {
    const productsContainer = document.querySelector('#products .row');
    productsContainer.innerHTML = products.map(product => `
        <div class="col-md-3" data-aos="fade-up">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Rp ${product.price.toLocaleString()}</p>
                    <button class="btn custom-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
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

    updateCartCount();
    renderCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    renderCart();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center mb-3">
            <img src="${item.image}" alt="${item.name}" style="width: 100px; height: 70px; object-fit: cover">
            <div class="ms-3 flex-grow-1">
                <h6 class="mb-0">${item.name}</h6>
                <p class="mb-0">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
}

// Form validation and checkout process
document.getElementById('checkoutForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    if (!this.checkValidity()) {
        event.stopPropagation();
        this.classList.add('was-validated');
        return;
    }

    alert('Order placed successfully!');
    cart = [];
    updateCartCount();
    renderCart();
    bootstrap.Modal.getInstance(document.getElementById('cartModal')).hide();
});

// Initialize
renderProducts();