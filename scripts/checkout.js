// Display order summary from localStorage
const summary = JSON.parse(localStorage.getItem('cart')) || [];
const orderSummary = document.getElementById('orderSummary');

if (summary.length > 0) {
  let table = `<h2>Your Order</h2><table><tr><th>Item</th><th>Qty</th><th>Price</th></tr>`;
  let total = 0;
  summary.forEach(item => {
    table += `<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td></tr>`;
    total += item.price * item.quantity;
  });
  table += `<tr><td colspan="2"><strong>Total</strong></td><td><strong>$${total.toFixed(2)}</strong></td></tr></table>`;
  orderSummary.innerHTML = table;
}

// Handle form submission
document.getElementById('checkoutForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const confirmation = document.getElementById('confirmationMessage');
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5); // 5-day estimate

  confirmation.innerHTML = `
    <h2 style="color: var(--theme-color);">Thank you for your purchase!</h2>
    <p>Your order will be delivered by <strong>${deliveryDate.toDateString()}</strong>.</p>
  `;
  confirmation.style.display = 'block';

  this.reset();
  localStorage.removeItem('cart');
});
