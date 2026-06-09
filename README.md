# Full Stack Admin Dashboard

A comprehensive, full-stack Admin Dashboard application built with the MERN stack (MongoDB, Express, React, Node.js). This dashboard provides a robust interface for managing business data, including orders, products, suppliers, and customers, complete with secure authentication.

## 🚀 Key Features

* **Secure Authentication**: JWT-based login system with hashed passwords (bcrypt).
* **Comprehensive Dashboard**: Overview of key business metrics at a glance.
* **Data Management**:
  * **Orders**: Track and manage all customer orders.
  * **Products**: Inventory management for all products.
  * **Suppliers**: Manage supplier information.
  * **Customers**: View and handle customer data.
* **Responsive UI**: Built with React and Material UI, ensuring a seamless experience across all devices.
* **RESTful API**: A robust Express/Node.js backend handling data operations securely.

## 🛠️ Technology Stack

**Frontend:**
* React 19
* Vite
* Material UI (MUI) & X-Data-Grid
* React Router DOM
* Axios
* React Hook Form & Yup (Validation)
* Emotion (Styling)

**Backend:**
* Node.js & Express
* MongoDB & Mongoose
* JWT (JSON Web Tokens)
* Bcrypt
* Cors & Dotenv

## 📊 Lighthouse Performance Metrics

The application is highly optimized, passing core web vitals and accessibility standards with flying colors.

### Desktop Performance
* **Performance:** 100
* **Accessibility:** 93
* **Best Practices:** 96
* **SEO:** 91

### Mobile Performance
* **Performance:** 85
* **Accessibility:** 93
* **Best Practices:** 96
* **SEO:** 91

*(Metrics measured via PageSpeed Insights for `https://admin-dashboard.emreceyhan.xyz/`)*

## 📂 Project Structure

```text
admin-dashboard/
├── backend/                  # Node.js/Express API server
│   ├── config/               # Configuration files (Database)
│   ├── controllers/          # Route handlers
│   ├── middlewares/          # Express middlewares (Auth, etc.)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   ├── seed/                 # Database seed scripts
│   ├── index.js              # Server entry point
│   └── package.json
└── frontend/                 # React client application
    ├── public/               # Static assets
    ├── src/
    │   ├── api/              # Axios API calls
    │   ├── assets/           # Images and icons
    │   ├── components/       # Reusable UI components
    │   ├── layouts/          # Page layouts (Sidebar, Header)
    │   ├── pages/            # Main application views (Dashboard, Orders, etc.)
    │   ├── theme/            # Material UI theme configuration
    │   ├── App.jsx           # Main React component
    │   └── main.jsx          # React entry point
    ├── vite.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
* Node.js (v18+)
* MongoDB (Local or Atlas cluster)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
   Run the backend development server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup:**
   Open a new terminal window.
   ```bash
   cd frontend
   npm install
   ```
   Run the frontend development server:
   ```bash
   npm run dev
   ```

## 📜 License
This project is licensed under the ISC License.
