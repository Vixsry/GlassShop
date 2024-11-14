// Sample products data with variants
const products = [
    { 
        id: 1, 
        name: 'ESP8266 V3 IOT', 
        basePrice: 31000, 
        image: 'Add Product Here/product/Product-1.png',
        variants: [
            { name: 'Standar', price: 31000 },
            { name: 'Pro', price: 35000 }
        ]
    },
    { 
        id: 2, 
        name: 'ESP32 WROOM TYPE-C', 
        basePrice: 70000, 
        image: 'Add Product Here/product/Product-2.png',
        variants: [
            { name: 'Standar', price: 70000 },
            { name: 'Advanced', price: 75000 }
        ]
    },

    { 
        id: 2, 
        name: 'SingleBoard Computer', 
        basePrice: 70000, 
        image: 'Add Product Here/product/Product-2.png',
        variants: [
            { name: 'Standar', price: 70000 },
            { name: 'Advanced', price: 75000 }
        ]
    },
    // Other products
];

// Shopping cart
let cart = [];
let currentProduct = null; // To store selected product for modal

// Render products
function renderProducts(productsList = products) {
    const productsContainer = document.querySelector('#products .row');
    productsContainer.innerHTML = productsList.map(product => `
        <div class="col-md-3" data-aos="fade-up">
            <div class="card product-card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title text-white">${product.name}</h5>
                    <p class="card-text text-white">Rp ${product.basePrice.toLocaleString()}</p>
                    <button class="btn custom-btn" onclick="openProductModal(${product.id})">
                        <i class="fas fa-eye"></i> View
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open the modal and display product details with variants
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    currentProduct = product; // Store the selected product

    const modalTitle = document.getElementById('modalProductTitle');
    const modalBody = document.getElementById('modalProductBody');
    const modalPrice = document.getElementById('modalProductPrice');
    
    // Set modal content
    modalTitle.textContent = product.name;
    modalBody.innerHTML = product.variants.map((variant, index) => `
        <div class="form-check">
            <input type="radio" class="form-check-input" name="productVariant" id="variant${productId}-${index}" 
                data-price="${variant.price}" data-name="${variant.name}" onclick="updatePrice(${productId}, ${index})">
            <label class="form-check-label text-white" for="variant${productId}-${index}">
                ${variant.name} - Rp ${variant.price.toLocaleString()}
            </label>
        </div>
    `).join('');
    modalPrice.textContent = `Rp 0`; // Display 0 initially
    
    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
}

// Update price based on selected variant
function updatePrice(productId, variantIndex) {
    const product = products.find(p => p.id === productId);
    const selectedVariant = product.variants[variantIndex];
    const modalPrice = document.getElementById('modalProductPrice');
    modalPrice.textContent = `Rp ${selectedVariant.price.toLocaleString()}`;
}

// Add the selected variant to cart
function addToCart() {
    const selectedVariant = document.querySelector('input[name="productVariant"]:checked');
    if (!selectedVariant) {
        alert('Please select a variant');
        return;
    }

    const product = currentProduct;
    const price = parseInt(selectedVariant.getAttribute('data-price'));
    const name = `${product.name} - ${selectedVariant.getAttribute('data-name')}`;

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id: product.id, name, price, quantity: 1 });
    }

    updateCartCount();
    renderCart();

    // Hide modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
    modal.hide();
}

// Render cart
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center text-white">Your cart is empty</p>';
        cartTotal.textContent = '0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="d-flex align-items-center mb-3">
            <div class="ms-3 flex-grow-1">
                <h6 class="mb-0 text-white">${item.name}</h6>
                <p class="mb-0 text-white">Rp ${item.price.toLocaleString()} x ${item.quantity}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toLocaleString();
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

// Search products based on input
function searchProducts() {
    const searchInput = document.querySelector('.search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchInput)
    );
    renderProducts(filteredProducts); // Render hanya produk yang cocok
}

// Event listener untuk kolom pencarian
document.querySelector('.search-bar').addEventListener('input', searchProducts);


// Initialize
renderProducts();
