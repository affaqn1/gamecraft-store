let cart = [];

async function loadProducts() {
  try {
    const response = await fetch("products.json"); // Ensure products.json is in the same directory
    const data = await response.json();
    const container = document.getElementById("products");

    for (const category in data) {
      const section = document.createElement("section");
      section.innerHTML = `<h2>${capitalize(category)}</h2>`;
      const grid = document.createElement("div");
      grid.className = "grid";

      data[category].forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";

        const cardId = `${category}-${item.name.replace(/\s+/g, '-')}`;

        card.innerHTML = `
          <img src="${item.image}" alt="${item.name}" />
          <p>${item.name} - $${item.price}</p>
          <input type="number" min="1" value="1" id="qty-${cardId}" />
          <button onclick="addToCart('${item.name}', ${item.price}, 'qty-${cardId}')">Add to Cart</button>
        `;

        grid.appendChild(card);
      });

      section.appendChild(grid);
      container.appendChild(section);
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function addToCart(name, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value);
  if (qty < 1) return;

  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({ name, price, quantity: qty });
  }

  updateCartTable();
}

function updateCartTable() {
  const tbody = document.querySelector("#cartTable tbody");
  tbody.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const row = document.createElement("tr");
    const subtotal = item.quantity * item.price;
    total += subtotal;

    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalPrice").textContent = `$${total.toFixed(2)}`;
}

function saveAsFavourite() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  localStorage.setItem("favouriteCart", JSON.stringify(cart));
  alert("Cart saved as favourite!");
}

function applyFavourite() {
  const fav = JSON.parse(localStorage.getItem("favouriteCart"));
  if (!fav || fav.length === 0) {
    alert("No favourite order found!");
    return;
  }

  cart = [...fav]; // Clone saved cart
  updateCartTable();
  alert("Favourite order applied!");
}

function goToCheckout() {
  if (cart.length === 0) {
    alert("Please add items to cart before proceeding.");
    return;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "checkout.html";
}

window.addEventListener("DOMContentLoaded", loadProducts);
