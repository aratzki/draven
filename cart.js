const CART_KEY = "draven-cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCart(id, size) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id && item.size === size);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, size, qty: 1 });
  }
  saveCart(cart);
}

function updateCartCount() {
  const el = document.querySelector("#cart-count");
  if (el) el.textContent = getCart().reduce((total, item) => total + item.qty, 0);
}

document.addEventListener("DOMContentLoaded", updateCartCount);