import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@mf/cart-store';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

// @ts-ignore
const ProductPage = lazy(() => import('product_remote/ProductPage'));
// @ts-ignore
const CartPage = lazy(() => import('cart_remote/CartPage'));

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <main style={{ flex: 1, padding: 24 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/product"
                element={
                  <Suspense fallback={<div>Loading product...</div>}>
                    <ProductPage />
                  </Suspense>
                }
              />
              <Route
                path="/cart"
                element={
                  <Suspense fallback={<div>Loading cart...</div>}>
                    <CartPage />
                  </Suspense>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}
