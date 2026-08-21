import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { ProductListPage } from "./features/products/pages/ProductListPage";
import { ProductFormPage } from "./features/products/pages/ProductFormPage";

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Product Inventory</h1>
        <p className="subtitle">
          React + TypeScript · Redux Toolkit (RTK Query) · React Router ·
          json-server · React Hook Form + Zod
        </p>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/new" element={<ProductFormPage />} />
          <Route path="/products/:id/edit" element={<ProductFormPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
