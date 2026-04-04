document.addEventListener('DOMContentLoaded', function () {

  // =========================
  // CART STATE (ONLY ONCE)
  // =========================
  let cart = [];

  // =========================
  // ELEMENTS
  // =========================
  const cartBtn = document.querySelector('.cart-btn');
  const cartSidebar = document.getElementById('cart-sidebar');
  const cartOverlay = document.getElementById('cart-overlay');
  const closeCart = document.getElementById('close-cart');

  const cartItems = document.getElementById('cart-items');
  const cartCount = document.querySelector('.cart-count');
  const cartTotalAmount = document.getElementById('cart-total-amount');

  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const newsletterForm = document.querySelector('.newsletter-form');

  // =========================
  // OPEN CART
  // =========================
  if (cartBtn) {
    cartBtn.addEventListener('click', function () {
      cartSidebar.classList.add('active');
      cartOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // =========================
  // CLOSE CART
  // =========================
  function closeCartSidebar() {
    if (!cartSidebar || !cartOverlay) return;

    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

  // =========================
  // QUICK ADD (FIXED SINGLE SYSTEM)
  // =========================
  document.addEventListener('click', function (e) {

    const button = e.target.closest('.quick-add');
    if (!button) return;

    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    if (!name || isNaN(price)) return;

    const existingItem = cart.find(item => item.name === name);

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

  // =========================
  // UPDATE CART
  // =========================
  function updateCart() {

    if (!cartItems || !cartCount || !cartTotalAmount) return;

    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach(item => {
      total += item.price * item.quantity;
      count += item.quantity;

      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.textContent = `${item.name} x ${item.quantity}`;
      cartItems.appendChild(div);
    });

    cartCount.textContent = count;
    cartTotalAmount.textContent = `$${total.toFixed(2)}`;
  }

  // =========================
  // TOAST
  // =========================
  function showToast(message) {

    if (!toast || !toastMessage) return;

    toastMessage.textContent = message;
    toast.classList.add('active');

    setTimeout(() => {
      toast.classList.remove('active');
    }, 2500);
  }

  // =========================
  // NEWSLETTER (FIXED)
  // =========================
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      showToast('Thanks for subscribing! 🎉');
      this.reset();
    });
  }

});
