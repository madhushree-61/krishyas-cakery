# Krishya's Cakery — Online Menu & Ordering

A responsive ordering website for **Krishya's Cakery** (Karur), built for a Git/GitHub
course project. Customers can browse the full menu, add items to a cart, and check
out with their delivery details and an online payment step.

**Live demo:** add your GitHub Pages link here once deployed (see Part 4 below).

## Features

- Full menu rendered from `js/data.js`, matching the shop's price card (Brownies,
  Blondies, Cookies, Tea Cakes, Snack Bites, Pre-Order Specials)
- Add to cart / quantity stepper, with a slide-out cart drawer
- Cart persists across page refresh (`localStorage`)
- 3-step checkout: **delivery details → online payment → confirmation**
- Confirmed orders can be sent straight to the shop's WhatsApp with the full order
  summary pre-filled
- No build tools required — plain HTML/CSS/JS, works by just opening `index.html`

## Project structure

```
krishyas-cakery/
├── index.html          Page structure: menu, cart drawer, checkout modal
├── css/
│   └── style.css        All styling
├── js/
│   ├── data.js           Menu items & prices (edit this to update the menu)
│   ├── cart.js            Cart state (add/remove/qty/total), saved to localStorage
│   └── main.js             Renders the page and drives the checkout flow
├── assets/                (put product photos here if you add them)
├── .gitignore
└── README.md
```

## About the "payment" step — please read

This project simulates online payment (you choose UPI or Card, click **Pay Now**,
and get a confirmation) rather than processing a real transaction. That's
intentional, not a shortcut:

- Real payment processing requires a **backend server** to talk to a payment
  gateway (Razorpay, Stripe, etc.) using a **secret API key**. A secret key can
  never live in front-end code that's pushed to a public GitHub repo — anyone
  could read it and charge things to your account.
- For a course project focused on Git/GitHub, the simulated flow demonstrates the
  full UX (details → pay → confirm) safely and correctly.

**If you want to add real payments later**, the standard path for an Indian
business like this one is [Razorpay](https://razorpay.com/docs/):
1. Create a small backend (Node.js + Express is the easiest pairing with this
   project) that creates an "order" using your Razorpay **secret key**.
2. In `main.js`, where `payNowBtn` is clicked, call your backend instead of
   simulating success, and open Razorpay's Checkout widget with the order it
   returns.
3. Verify the payment signature on your backend before marking the order paid.

That's a separate project in itself — good next step after this one, but not
needed to complete this assignment.

## Running it locally

No installation needed. Either:
- Double-click `index.html` to open it in a browser, **or**
- In VS Code, install the "Live Server" extension, right-click `index.html`,
  and choose "Open with Live Server" (recommended — some browsers restrict
  `localStorage` on files opened directly).

---

## Part 1 — Get the project into VS Code

1. Download/unzip the project folder somewhere on your computer, e.g.
   `Documents/krishyas-cakery`.
2. Open VS Code.
3. `File → Open Folder…` and select that `krishyas-cakery` folder.
4. Open the built-in terminal: `Terminal → New Terminal`.

## Part 2 — Initialize Git and make your first commit

Run these one at a time in the VS Code terminal:

```bash
git init
git add .
git commit -m "Initial commit: menu, cart, and checkout flow"
```

What each command does:
- `git init` — turns this folder into a Git repository (creates a hidden `.git` folder)
- `git add .` — stages every file (tells Git "include these in the next commit")
- `git commit -m "..."` — saves a snapshot of the staged files with a message

Check it worked:
```bash
git log --oneline
```
You should see your one commit listed.

## Part 3 — Create the repository on GitHub and push

1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon (top right) → **New repository**.
3. Name it `krishyas-cakery` (or any name you like).
4. Leave it **empty** — do **not** check "Add a README" (you already have one;
   ticking it would create a conflict).
5. Click **Create repository**. GitHub will show you a page with commands —
   use the "…or push an existing repository" section, or just run:

```bash
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/krishyas-cakery.git
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username. What each line does:
- `git branch -M main` — renames your default branch to `main` (GitHub's standard)
- `git remote add origin <url>` — tells Git where your GitHub repo lives, and
  names that connection `origin`
- `git push -u origin main` — uploads your commit to GitHub, and `-u` remembers
  this connection so future pushes can just be `git push`

Refresh the GitHub page — your files should now be there.

## Part 4 (bonus, worth doing) — Publish it live with GitHub Pages

Since this is a static site, GitHub can host it for free:

1. On your repo's GitHub page, go to **Settings → Pages**.
2. Under "Build and deployment", set **Source** to `Deploy from a branch`.
3. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
4. Wait a minute, refresh — GitHub gives you a live URL like
   `https://YOUR-USERNAME.github.io/krishyas-cakery/`.

Now you have a real, shareable link for the bakery's website — nice thing to
show for a course project.

## Part 5 — Your normal workflow after this (for future changes)

Every time you make changes (e.g. edit `js/data.js` to update prices):

```bash
git add .
git commit -m "Describe what you changed"
git push
```

Good habits for the course:
- Commit often, with clear messages ("Add cart quantity stepper", not "update")
- Look at `git status` any time to see what's changed and staged
- If your instructor wants branches: `git checkout -b feature/some-change`,
  make edits, commit, then `git push -u origin feature/some-change`, and open a
  Pull Request on GitHub to merge it into `main`.

## Things you may want to customize

- **Menu/prices** — edit `js/data.js`. Note: one item on the original price
  card ("Double Chocolate Brownie" / "Triple Chocolate Brownie") had a
  hand-written "300" note near it that wasn't clearly tied to one item — I used
  the printed ₹200 for both. Double-check that against the shop and adjust in
  `data.js` if needed.
- **Photos** — add real product photos to `assets/` and reference them in
  `data.js` (add an `image` field per item) and `main.js` (render an `<img>`
  in the item card).
- **Colors/fonts** — all in the `:root` section at the top of `css/style.css`.
