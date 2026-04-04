/ ===================================
// LSG Active - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function () {
  alert("JS is running");

console.log("JS Loaded ✅");

// ===================================
// Mobile Navigation (SAFE)
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
hamburger.addEventListener('click', function () {
hamburger.classList.toggle('active');
navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
link.addEventListener('click', function () {
hamburger.classList.remove('active');
navLinks.classList.remove('active');
});
});
}

// ===================================
// Cart Functionality (SAFE)
// ===================================
const cartBtn = document.querySelector('.cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('continue-shopping');
const cartItems = document.getElementById('cart-items');
const cartFooter = document.getElementById('cart-footer');
const cartCount = document.querySelector('.cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

let cart = [];

// Open cart
if (cartBtn && cartSidebar && cartOverlay) {
cartBtn.addEventListener('click', function () {
cartSidebar.classList.add('active');
cartOverlay.classList.add('active');
document.body.style.overflow = 'hidden';
});
}

// Close cart
function closeCartSidebar() {
if (cartSidebar && cartOverlay) {
cartSidebar.classList.remove('active');
cartOverlay.classList.remove('active');
document.body.style.overflow = '';
}
}

if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

if (continueShoppingBtn) {
continueShoppingBtn.addEventListener('click', function (e) {
e.preventDefault();
closeCartSidebar();
});
}

// ===================================
// Quick Add
// ===================================
document.addEventListener('click', function (e) {
const button = e.target.closest('.quick-add');
if (!button) return;

const name = button.dataset.name;
const price = parseFloat(button.dataset.price);

if (!name || isNaN(price)) {
console.log("Missing product data");
return;
}

let existingItem = cart.find(item => item.name === name);

if (existingItem) {
existingItem.quantity += 1;
} else {
cart.push({
name: name,
price: price,
quantity: 1
});
}

updateCart();
showToast(`${name} added to bag`);
});

// ===================================
// Update Cart
// ===================================
function updateCart() {

if (!cartItems || !cartCount || !cartTotalAmount) return;

const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

cartCount.textContent = totalItems;
cartTotalAmount.textContent = `$${totalPrice.toFixed(2)}`;

if (cart.length === 0) {
cartItems.innerHTML = `
<div class="cart-empty">
<p>Your bag is empty</p>
<a href="#shop" class="btn btn-secondary" id="continue-shopping">Continue Shopping</a>
</div>
`;
if (cartFooter) cartFooter.style.display = 'none';

} else {
let cartHTML = '';

cart.forEach((item, index) => {
cartHTML += `
<div class="cart-item">
<div class="cart-item-details">
<h4>${item.name}</h4>
<p>Qty: ${item.quantity}</p>
<button class="remove-item" data-index="${index}">Remove</button>
</div>
<div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
</div>
`;
});

cartItems.innerHTML = cartHTML;
if (cartFooter) cartFooter.style.display = 'block';

document.querySelectorAll('.remove-item').forEach(btn => {
btn.addEventListener('click', function () {
const index = parseInt(this.dataset.index);
cart.splice(index, 1);
updateCart();
showToast('Item removed');
});
});
}
}

// ===================================
// Toast
// ===================================
function showToast(message) {
if (!toast || !toastMessage) return;

toastMessage.textContent = message;
toast.classList.add('active');

setTimeout(() => {
toast.classList.remove('active');
}, 3000);
}

// ===================================
// Newsletter (SAFE FIX)
// ===================================
const newsletterForm = document.querySelector('newsletter-form');

if (newsletterForm) {
newsletterForm.addEventListener('submit', function (e) {
e.preventDefault();
showToast('Thanks for subscribing! 🎉');
this.reset();
});
}

});
