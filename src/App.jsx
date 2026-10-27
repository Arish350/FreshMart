
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FarmerProfile from "./FarmerProfile";
import Cart from "./pages/Cart";
import Settings from "./pages/Settings";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerJoin from "./pages/FarmerJoin";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

import FreshBuddy from "./components/FreshBuddy";
import Nav from "./components/Nav";
import CartDrawer from "./CartDrawer";
import DeliveryTracking from "./DeliveryTracking";

import { CartProvider } from "./components/CartContext";

import "./App.css";

function DeliveryTrackingPage() {
  return <DeliveryTracking />;
}

function HomePage() {
  return (
    <div className="freshmart">
      <div className="announcement">
        🌿 Fresh from local farms, straight to your home
      </div>

      <Nav />

      <Home />

      <CartDrawer />

      <footer className="site-footer">
        <div className="footer-brand">
          🌿 Fresh<span>Mart</span>
        </div>

        <p>Good food. Happy farmers. Healthier homes.</p>

        <small>
          © 2026 FreshMart. Made for a fresher tomorrow.
        </small>
      </footer>

      <FreshBuddy />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/cart" element={<Cart />} />

          <Route path="/checkout" element={<Checkout />} />

          <Route path="/join-farmer" element={<FarmerJoin />} />

          <Route
            path="/farmer-dashboard"
            element={<FarmerDashboard />}
          />

          <Route
            path="/farmer-settings"
            element={<Settings />}
          />
          <Route
  path="/farmer-profile"
  element={<FarmerProfile />}
/>

          <Route
            path="/delivery-tracking"
            element={<DeliveryTrackingPage />}
          />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
