# PB Exotics — MERN Stack Website

Full-stack cannabis eCommerce site built for PB Exotics.
**Stack:** MongoDB · Express · React · Node.js

---

## Project Structure

```
pb-exotics/
├── backend/          ← Express API + MongoDB
│   ├── src/
│   │   ├── config/       (db.js, cloudinary.js)
│   │   ├── controllers/  (auth, products, orders, upload)
│   │   ├── middleware/   (authMiddleware.js)
│   │   ├── models/       (User, Product, Order)
│   │   ├── routes/       (all routes)
│   │   ├── utils/        (seed.js, notifications.js)
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
└── frontend/         ← React app
    ├── src/
    │   ├── components/
    │   │   ├── admin/    (AdminLayout)
    │   │   ├── common/   (Icons, ProductCard, ProtectedRoute, ScrollToTop)
    │   │   └── layout/   (Navbar, Footer, MobileNav)
    │   ├── context/      (AuthContext, CartContext)
    │   ├── pages/
    │   │   ├── admin/    (Login, Dashboard, Products, Orders, ProductForm, OrderDetail)
    │   │   └── (Home, Shop, ProductDetail, Cart, Checkout, OrderSuccess, About, Contact, FAQ)
    │   ├── utils/        (api.js)
    │   └── index.css     (Global brand tokens)
    ├── public/index.html
    └── package.json
```

---

## Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Fill in your .env values (see below)
npm run seed        # Seeds DB with products + admin user
npm run dev         # Starts on port 5000
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm start           # Starts on port 3000
```

---

## Environment Variables (backend/.env)

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Strong random string for JWT signing |
| `CLOUDINARY_CLOUD_NAME` | From cloudinary.com dashboard |
| `CLOUDINARY_API_KEY` | From cloudinary.com dashboard |
| `CLOUDINARY_API_SECRET` | From cloudinary.com dashboard |
| `GHL_WEBHOOK_URL` | GoHighLevel webhook URL for order notifications |
| `GHL_API_KEY` | GHL API key (optional, for auth header) |
| `ADMIN_EMAIL` | Default admin login email |
| `ADMIN_PASSWORD` | Default admin login password |
| `FRONTEND_URL` | React app URL (for CORS) |

---

## Admin Panel

Access at: `http://localhost:3000/admin/login`

**Default credentials** (from seed):
- Email: `admin@pbexotics.ca`
- Password: `PBExotics@Admin2024`

**Change these immediately after first login.**

### Admin Features
- Dashboard — live order stats (auto-refreshes every 30s)
- Products — create, edit, delete, toggle stock/featured
- Product Form — Cloudinary image upload, pricing tiers, effects/flavours tags
- Orders — filter by status and delivery method
- Order Detail — update status, add tracking number, mark payment

---

## Order Notifications (GoHighLevel)

When a new order is placed, the backend sends a POST to `GHL_WEBHOOK_URL` with:

```json
{
  "event": "new_order",
  "orderId": "...",
  "customer": { "name": "...", "phone": "...", "email": "..." },
  "deliveryMethod": "same-day",
  "deliveryWindow": "2pm–6pm",
  "total": "$150.00",
  "items": "Pink Runtz (Oz) x1",
  "notes": "None",
  "placedAt": "2026-07-12, 3:45:00 PM"
}
```

In GHL, create a **Custom Webhook Trigger** and map these fields to an SMS/email notification or workflow.

---

## Cloudinary Setup

1. Create free account at cloudinary.com
2. Copy your Cloud Name, API Key, API Secret from the dashboard
3. Paste into `backend/.env`
4. Images uploaded via admin are stored in the `pb-exotics` folder in your Cloudinary account

---

## Deployment Notes

- **Backend:** Deploy to Railway, Render, or VPS. Set all env vars.
- **Frontend:** Deploy to Vercel or Netlify. Set `REACT_APP_API_URL` to your backend URL.
- **MongoDB:** Use MongoDB Atlas (free tier works).
- Update `FRONTEND_URL` in backend `.env` to your deployed frontend URL for CORS.
