/**
 * Cart module — small state manager backed by localStorage,
 * so the cart survives a page refresh.
 */
const Cart = (() => {
  const STORAGE_KEY = "krishyas_cakery_cart";
  let items = load();

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }

  function findItemById(id) {
    for (const cat of MENU) {
      const found = cat.items.find((i) => i.id === id);
      if (found) return found;
    }
    return null;
  }

  function add(id) {
    items[id] = (items[id] || 0) + 1;
    save();
  }

  function decrease(id) {
    if (!items[id]) return;
    items[id] -= 1;
    if (items[id] <= 0) delete items[id];
    save();
  }

  function remove(id) {
    delete items[id];
    save();
  }

  function clear() {
    items = {};
    save();
  }

  function getLines() {
    return Object.entries(items).map(([id, qty]) => {
      const menuItem = findItemById(id);
      return { ...menuItem, qty, lineTotal: menuItem.price * qty };
    });
  }

  function getCount() {
    return Object.values(items).reduce((a, b) => a + b, 0);
  }

  function getTotal() {
    return getLines().reduce((sum, line) => sum + line.lineTotal, 0);
  }

  return { add, decrease, remove, clear, getLines, getCount, getTotal };
})();
