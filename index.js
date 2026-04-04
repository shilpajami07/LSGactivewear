// ===================================
// LSG Active - Main JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Mobile Navigation
    // ===================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // ===================================
    // Cart Functionality
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
    cartBtn.addEventListener('click', function() {
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close cart
    function closeCartSidebar() {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    closeCart.addEventListener('click', closeCartSidebar);
    cartOverlay.addEventListener('click', closeCartSidebar);
    
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeCartSidebar();
        });
    }
    
    // Add to cart
    const quickAddButtons = document.querySelectorAll('.quick-add');
    
    quickAddButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const name = this.dataset.name;
            const price = parseFloat(this.dataset.price);
            
            // Check if item already in cart
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
            showToast(`${name} added to bag!`);
        });
    });
    
    // Update cart display
    function updateCart() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        cartCount.textContent = totalItems;
        cartTotalAmount.textContent = `$${totalPrice}`;
        
        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="cart-empty">
                    <p>Your bag is empty</p>
                    <a href="#shop" class="btn btn-secondary" id="continue-shopping">Continue Shopping</a>
                </div>
            `;
            cartFooter.style.display = 'none';
            
            // Re-attach event listener
            document.getElementById('continue-shopping').addEventListener('click', function(e) {
                e.preventDefault();
                closeCartSidebar();
            });
        } else {
            let cartHTML = '';
            
            cart.forEach((item, index) => {
                cartHTML += `
                    <div class="cart-item">
                        <div class="cart-item-image"></div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <p>Size: M | Color: Sand</p>
                            <p>Qty: ${item.quantity}</p>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>
                        <div class="cart-item-price">$${item.price * item.quantity}</div>
                    </div>
                `;
            });
            
            cartItems.innerHTML = cartHTML;
            cartFooter.style.display = 'block';
            
            // Add remove functionality
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.dataset.index);
                    cart.splice(index, 1);
                    updateCart();
                    showToast('Item removed from bag');
                });
            });
        }
    }
    
    // Toast notification
    function showToast(message) {
        toastMessage.textContent = message;
        toast.classList.add('active');
        
        setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    }
    
    // ===================================
    // Newsletter Form
    // ===================================
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate submission
        showToast('Thanks for subscribing! Check your email for 10% off.');
        this.reset();
    });
    
    // ===================================
    // Smooth Scroll for Navigation
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===================================
    // Active Navigation State
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===================================
    // Product Card Hover Effect (Touch)
    // ===================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touched');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touched');
            }, 300);
        });
    });
    
    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Apply to animatable elements
    const animatableElements = document.querySelectorAll('.category-card, .product-card, .feature-card');
    
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
