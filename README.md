
## 📖 StockFlow – Inventory Management System  

A **full‑stack** inventory management solution that lets you:

* **Create, edit, and delete products** (SKU, price, category, stock).  
* **Adjust stock** (incoming shipments, sales, order cancellations) with robust validation.  
* **View complete stock‑change history** per product.  
* **Place, list, and cancel orders**.  
* **Authenticate users** (JWT‑based) and protect routes.  
* **Monitor dashboards** with aggregated statistics.

Built with **Node/Express**, **Sequelize + PostgreSQL**, and a **React + Vite** front‑end.

---

### 🛠️ Tech Stack  

| Layer | Tech |
|-------|------|
| **Backend** | Node.js 12+, Express, Sequelize, PostgreSQL, JWT, dotenv |
| **Frontend** | React 18, Vite, Axios, TailwindCSS (optional) |
| **Testing** | Jest (backend), React Testing Library (frontend) |
| **Linting/Formatting** | ESLint, Prettier |
| **Version Control** | Git (`.gitignore` excludes `node_modules`, `.env`, log files, IDE artefacts) |
| **Deployment** | Docker (optional) – `Dockerfile` & `docker‑compose.yml` in repo root |

---

### 🚀 Quick Start / Installation  

> **Prerequisites**  
> * Node ≥ 14, npm ≥ 6  
> * PostgreSQL server (default DB name: `stockflow`)  
> * Git (already cloned)

#### 1️⃣ Clone the repo (if not already)

```bash
git clone https://github.com/Shubhi1352/StockFlow.git
cd StockFlow
```

#### 2️⃣ Set up environment variables  

Create **backend** and **frontend** `.env` files (they are ignored by Git).

```bash
# backend/.env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stockflow
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=super_secret_key
PORT=5000
```

```bash
# frontend/.env
VITE_API_BASE_URL=http://localhost:5000/api
```

> **Note:** You just removed `backend/.env` from Git tracking (`git rm --cached backend/.env`). It will now stay local only.

#### 3️⃣ Install dependencies  

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd ../frontend
npm install
```

#### 4️⃣ Initialise the database  

```bash
# From backend folder
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

> If you don’t have `sequelize-cli` globally, it’s installed locally via `npm install`.

#### 5️⃣ Run the apps  

```bash
# Backend (dev mode)
npm run dev   # starts at http://localhost:5000

# Frontend (dev mode)
cd ../frontend
npm run dev   # starts at http://localhost:5173
```

Open `http://localhost:5173` in a browser. The UI will communicate with the backend on the API base URL defined in the frontend `.env`.

---

### 📂 Project Structure  

```
StockFlow/
├─ backend/
│  ├─ config/
│  │   └─ database.js            # Sequelize instance & DB config
│  ├─ controllers/
│  │   ├─ authController.js
│  │   ├─ dashboardController.js
│  │   ├─ orderController.js
│  │   ├─ productController.js
│  │   └─ stockController.js
│  ├─ middlewares/
│  │   ├─ authMiddleware.js       # JWT verification
│  │   └─ validateRequest.js     # express‑validator wrapper
│  ├─ models/
│  │   ├─ Index.js               # aggregates all models
│  │   ├─ Product.js
│  │   ├─ StockHistory.js
│  │   └─ User.js
│  ├─ routes/
│  │   ├─ authRoutes.js
│  │   ├─ dashboardRoutes.js
│  │   ├─ orderRoutes.js
│  │   ├─ productRoutes.js
│  │   └─ stockRoutes.js
│  ├─ services/
│  │   └─ stockService.js        # core stock‑adjust logic (validation, transactions)
│  ├─ validators/
│  │   ├─ authValidator.js
│  │   ├─ productValidator.js
│  │   ├─ stockValidator.js
│  │   └─ ...
│  ├─ utils/
│  │   └─ AppError.js            # custom error class
│  ├─ .env.example                # template for .env
│  ├─ .gitignore                  # ignores node_modules, .env, logs, IDE files
│  ├─ app.js                      # Express entry point
│  └─ package.json
│
├─ frontend/
│  ├─ public/
│  │   └─ ...                     # static assets (favicon, icons)
│  ├─ src/
│  │   ├─ api/
│  │   │   └─ axios.js            # Axios instance with base URL
│  │   ├─ assets/
│  │   ├─ components/
│  │   │   └─ Navbar.jsx
│  │   ├─ pages/
│  │   │   ├─ Dashboard.jsx
│  │   │   ├─ Login.jsx
│  │   │   ├─ Orders.jsx
│  │   │   ├─ Products.jsx
│  │   │   ├─ Register.jsx
│  │   │   └─ Stock.jsx
│  │   ├─ App.jsx
│  │   ├─ main.jsx
│  │   └─ index.css
│  ├─ .gitignore
│  ├─ vite.config.js
│  ├─ package.json
│  └─ README.md
│
├─ .gitignore
├─ README.md                      # <‑‑ **THIS FILE**
└─ LICENSE
```

**Key Files**

* `backend/services/stockService.js` – handles the **increase/decrease** logic with transaction safety and validation (now forces numeric, positive quantity).  
* `backend/routes/stockRoutes.js` – REST endpoints for stock adjustments and history.  
* `frontend/src/pages/Products.jsx` – displays product list with **ID column** (newly added).  
* `frontend/src/pages/Orders.jsx` – allows cancelling when **status is `PENDING` or `PLACED`** (updated condition).  

---

###
