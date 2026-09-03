/**
 * Main app: renders the menu, wires up the cart drawer,
 * and drives the 3-step checkout (details -> payment -> confirm).
 */
document.addEventListener("DOMContentLoaded", () => {
  const money = (n) => `₹${n.toLocaleString("en-IN")}`;

  /* ---------- render menu + category nav ---------- */
  const menuRoot = document.getElementById("menu");
  const navRoot = document.getElementById("categoryNav");

  MENU.forEach((cat) => {
    const navLink = document.createElement("a");
    navLink.href = `#${cat.id}`;
    navLink.textContent = cat.name;
    navRoot.appendChild(navLink);

    const section = document.createElement("section");
    section.className = "menu-section";
    section.id = cat.id;
    section.innerHTML = `
      <h2 class="section-title">${cat.name}</h2>
      ${cat.note ? `<p class="section-note">${cat.note}</p>` : ""}
      <div class="item-grid">
        ${cat.items
          .map(
            (item) => `
          <article class="item-card" data-id="${item.id}">
            <div class="item-info">
              <h3>${item.name}</h3>
              ${item.unit ? `<span class="item-unit">${item.unit}</span>` : ""}
              <span class="item-price">${money(item.price)}</span>
            </div>
            <div class="item-actions" data-qty-wrap="${item.id}"></div>
          </article>`
          )
          .join("")}
      </div>
    `;
    menuRoot.appendChild(section);
  });

  /* pre-order specials strip */
  const specials = document.createElement("section");
  specials.className = "menu-section preorder-strip";
  specials.innerHTML = `
    <h2 class="section-title">Pre-Order Specials</h2>
    <p class="section-note">Custom made for your special moments — available on pre-order basis. Message us on WhatsApp for a quote.</p>
    <div class="chip-row">
      ${PREORDER_SPECIALS.map((s) => `<span class="chip">${s}</span>`).join("")}
    </div>
    <a class="btn-secondary" href="https://wa.me/918248876620" target="_blank" rel="noopener">Enquire on WhatsApp</a>
  `;
  menuRoot.appendChild(specials);

  /* ---------- item quantity controls ---------- */
  function renderQtyControls() {
    document.querySelectorAll("[data-qty-wrap]").forEach((wrap) => {
      const id = wrap.dataset.qtyWrap;
      const qty = Cart.getLines().find((l) => l.id === id)?.qty || 0;
      wrap.innerHTML =
        qty === 0
          ? `<button class="btn-add" data-add="${id}">Add</button>`
          : `<div class="qty-stepper">
               <button data-dec="${id}" aria-label="Decrease">−</button>
               <span>${qty}</span>
               <button data-inc="${id}" aria-label="Increase">+</button>
             </div>`;
    });
  }

  menuRoot.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (add) Cart.add(add.dataset.add);
    if (inc) Cart.add(inc.dataset.inc);
    if (dec) Cart.decrease(dec.dataset.dec);
    if (add || inc || dec) {
      renderQtyControls();
      renderCart();
    }
  });

  /* ---------- cart drawer ---------- */
  const cartDrawer = document.getElementById("cartDrawer");
  const drawerBackdrop = document.getElementById("drawerBackdrop");
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartCountEl = document.getElementById("cartCount");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function openDrawer() {
    cartDrawer.classList.add("open");
    drawerBackdrop.classList.add("visible");
    cartDrawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    cartDrawer.classList.remove("open");
    drawerBackdrop.classList.remove("visible");
    cartDrawer.setAttribute("aria-hidden", "true");
  }
  document.getElementById("cartToggle").addEventListener("click", openDrawer);
  document.getElementById("cartClose").addEventListener("click", closeDrawer);
  drawerBackdrop.addEventListener("click", closeDrawer);

  function renderCart() {
    const lines = Cart.getLines();
    cartCountEl.textContent = Cart.getCount();
    cartTotalEl.textContent = money(Cart.getTotal());
    checkoutBtn.disabled = lines.length === 0;

    cartItemsEl.innerHTML = lines.length
      ? lines
          .map(
            (l) => `
        <div class="cart-line" data-id="${l.id}">
          <div class="cart-line-info">
            <p>${l.name}</p>
            <span>${money(l.price)} × ${l.qty}</span>
          </div>
          <div class="cart-line-actions">
            <button data-dec="${l.id}" aria-label="Decrease">−</button>
            <span>${l.qty}</span>
            <button data-inc="${l.id}" aria-label="Increase">+</button>
          </div>
        </div>`
          )
          .join("")
      : `<p class="cart-empty">Your cart is empty. Add something delicious!</p>`;
  }

  cartItemsEl.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) Cart.add(inc.dataset.inc);
    if (dec) Cart.decrease(dec.dataset.dec);
    if (inc || dec) {
      renderCart();
      renderQtyControls();
    }
  });

  /* ---------- checkout modal ---------- */
  const modal = document.getElementById("checkoutModal");
  const stepDetails = document.getElementById("stepDetails");
  const stepPayment = document.getElementById("stepPayment");
  const stepConfirm = document.getElementById("stepConfirm");
  const orderMiniSummary = document.getElementById("orderMiniSummary");
  const payTotal = document.getElementById("payTotal");

  function summaryHTML() {
    const lines = Cart.getLines();
    return (
      lines.map((l) => `<div><span>${l.name} × ${l.qty}</span><span>${money(l.lineTotal)}</span></div>`).join("") +
      `<div class="summary-total"><span>Total</span><span>${money(Cart.getTotal())}</span></div>`
    );
  }

  function openModal() {
    orderMiniSummary.innerHTML = summaryHTML();
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    closeDrawer();
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    stepDetails.hidden = false;
    stepPayment.hidden = true;
    stepConfirm.hidden = true;
  }

  checkoutBtn.addEventListener("click", openModal);
  document.getElementById("checkoutClose").addEventListener("click", closeModal);

  let orderDetails = null;

  document.getElementById("detailsForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    orderDetails = {
      name: fd.get("name").trim(),
      phone: fd.get("phone").trim(),
      address: fd.get("address").trim()
    };
    payTotal.textContent = money(Cart.getTotal());
    stepDetails.hidden = true;
    stepPayment.hidden = false;
  });

  document.getElementById("backToDetails").addEventListener("click", () => {
    stepPayment.hidden = true;
    stepDetails.hidden = false;
  });

  document.getElementById("payNowBtn").addEventListener("click", () => {
    const method = document.querySelector('input[name="payMethod"]:checked').value;
    const orderId = "KC-" + Date.now().toString().slice(-6);
    const lines = Cart.getLines();
    const total = Cart.getTotal();

    document.getElementById("orderId").textContent = `#${orderId}`;
    document.getElementById("confirmSummary").innerHTML = summaryHTML();

    const waText = encodeURIComponent(
      `Hi Krishya's Cakery! Order #${orderId}\n` +
        lines.map((l) => `- ${l.name} x${l.qty} = ${money(l.lineTotal)}`).join("\n") +
        `\nTotal: ${money(total)}\nPaid via: ${method}\n\nName: ${orderDetails.name}\nPhone: ${orderDetails.phone}\nAddress: ${orderDetails.address}`
    );
    document.getElementById("whatsappConfirm").href = `https://wa.me/918248876620?text=${waText}`;

    stepPayment.hidden = true;
    stepConfirm.hidden = false;
    Cart.clear();
    renderCart();
    renderQtyControls();
  });

  document.getElementById("closeConfirm").addEventListener("click", closeModal);

  /* ---------- init ---------- */
  renderQtyControls();
  renderCart();
});
