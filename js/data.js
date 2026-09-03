/**
 * Menu data for Krishya's Cakery.
 * Transcribed from the shop's price-list image.
 * Edit prices/items here — the whole site updates automatically.
 */
const MENU = [
  {
    id: "brownies",
    name: "Signature Brownies",
    note: "Brownie Slabs start from ₹500 — message us to pre-order a slab.",
    items: [
      { id: "b1", name: "Classic Brownie", price: 200 },
      { id: "b2", name: "Double Chocolate Brownie", price: 200 },
      { id: "b3", name: "Triple Chocolate Brownie", price: 200 },
      { id: "b4", name: "Nuts Loaded Brownie", price: 250 },
      { id: "b5", name: "Wheat / Ragi (Jaggery) Brownie", price: 250 }
    ]
  },
  {
    id: "blondies",
    name: "Blondies",
    items: [
      { id: "bl1", name: "Classic Blondie", price: 220 },
      { id: "bl2", name: "Double Chocolate Blondie", price: 250 },
      { id: "bl3", name: "Triple Chocolate Blondie", price: 275 }
    ]
  },
  {
    id: "cookies",
    name: "Cookies",
    items: [
      { id: "c1", name: "Butter Cookies", price: 200 },
      { id: "c2", name: "Cashew Cookies", price: 225 },
      { id: "c3", name: "Salt Cookies", price: 150 },
      { id: "c4", name: "Coconut Cookies", price: 200 },
      { id: "c5", name: "Chocolate Cookies", price: 225 },
      { id: "c6", name: "Wheat / Ragi / Kambu Cookies (Jaggery)", price: 250 }
    ]
  },
  {
    id: "teacakes",
    name: "Tea Cakes",
    items: [
      { id: "t1", name: "Plain Tea Cake", price: 125 },
      { id: "t2", name: "Butter Tea Cake", price: 150 },
      { id: "t3", name: "Chocolate Tea Cake", price: 150 },
      { id: "t4", name: "Kambu & Jaggery Tea Cake", price: 175 },
      { id: "t5", name: "Ragi Chocolate Tea Cake", price: 200 }
    ]
  },
  {
    id: "snacks",
    name: "Snack Bites",
    items: [
      { id: "s1", name: "Korean Cream Cheese Bun", unit: "Per pc", price: 80 },
      { id: "s2", name: "Garlic Bread", unit: "Per pc", price: 30 }
    ]
  }
];

/* Pre-order specials shown as an info strip, not addable to cart directly
   (custom-quoted items — matches the "Available on pre-order basis" note). */
const PREORDER_SPECIALS = [
  "Cupcakes", "Dream Cakes", "Jar Cakes", "Cookie Tins", "Celebration Cakes"
];
