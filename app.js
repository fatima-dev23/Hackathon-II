let cartIcon = document.querySelector(".cartIcon");
let cartContainer = document.createElement("div");
cartContainer.className = "cart-container d-none";
document.body.appendChild(cartContainer); 

let cartItems = []; 
let totalAmount = 0;

function initializeCartUI() {
    cartContainer.innerHTML = `
        <div class="cart-header p-3 bg-dark text-white d-flex justify-content-between">
            <h5>Shopping Cart</h5>
            <button id="close-cart-btn" class="btn-close btn-close-white"></button>
        </div>
        <div class="cart-body p-3" id="cart-body">
            <p class="text-muted">No items in the cart</p>
        </div>
        <div class="cart-footer p-3 bg-light d-flex justify-content-between align-items-center">
            <h6>Total: <span id="cart-total">0 PKR</span></h6>
            <button class="btn btn-primary">Checkout</button>
        </div>
    `;

    document.getElementById("close-cart-btn").addEventListener("click", () => {
        cartContainer.classList.add("d-none");
    });
}

cartIcon.addEventListener("click", () => {
    cartContainer.classList.toggle("d-none");
});

function addToCart(productName, productPrice, productImage) {
    const existingItem = cartItems.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name: productName, price: productPrice, quantity: 1, image: productImage });
    }

    updateCartUI();

    Swal.fire({
        title: "Product Added to Cart",
        text: `${productName} has been successfully added to your cart.`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
    });
}

// Update Cart UI
function updateCartUI() {
    const cartBody = document.getElementById("cart-body");
    const cartTotal = document.getElementById("cart-total");
    const cartCounts = document.getElementById("cart-counts"); // Reference to the badge element

    if (cartItems.length === 0) {
        cartBody.innerHTML = `<p class="text-muted">No items in the cart</p>`;
        cartTotal.textContent = "0 PKR";
        cartCounts.textContent = ""; // Clear the badge if the cart is empty
        totalAmount = 0;
        return;
    }

    cartBody.innerHTML = "";
    totalAmount = 0;

    let totalItems = 0; // Track the total number of items in the cart

    cartItems.forEach((item, index) => {
        totalAmount += item.price * item.quantity;
        totalItems += item.quantity; // Accumulate item quantities

        const cartItem = document.createElement("div");
        cartItem.className = "d-flex justify-content-between align-items-center mb-2";

        cartItem.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" height="50" width="50" />
                <h6>${item.name}</h6>
                <small>${item.price} PKR</small>
            </div>
            <div class="d-flex align-items-center">
                <button class="btn btn-sm btn-outline-secondary me-2" onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="btn btn-sm btn-outline-secondary ms-2" onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        `;

        cartBody.appendChild(cartItem);
    });

    cartTotal.textContent = `${totalAmount.toFixed(2)} PKR`;

    // Update the cart-counts badge
    cartCounts.textContent = totalItems;

    // Show/hide the badge based on whether there are items in the cart
    cartCounts.style.display = totalItems > 0 ? "inline" : "none";
}


// Change Quantity of Items
function changeQuantity(index, change) {
    cartItems[index].quantity += change;

    if (cartItems[index].quantity <= 0) {
        cartItems.splice(index, 1); 
    }

    updateCartUI();
}

// Initialize
initializeCartUI();

// Add event listeners to "Shop Now" buttons
document.querySelectorAll('.btn-shop').forEach(button => {
    button.addEventListener('click', () => {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        const productImage = button.getAttribute('data-image');
        
        addToCart(productName, productPrice, productImage);
    });
});