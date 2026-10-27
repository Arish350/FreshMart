
import { useState } from "react";
import {
  Leaf,
  Menu,
  X,
  Tag,
  ShoppingBasket,
  UserRound,
} from "lucide-react";
import { useCart } from "./CartContext";
import AuthModal from "./AuthModal";
import "./Nav.css";

const navItems = [
  { name: "Home", id: "home" },
  { name: "Fruits", id: "fruits", category: "Fruits" },
  { name: "Vegetables", id: "vegetables", category: "Vegetables" },
  {
    name: "Leafy Greens",
    id: "leafy-greens",
    category: "Leafy Greens",
  },
  { name: "Organic", id: "organic", category: "Organic" },
  { name: "Combo Packs", id: "combo-packs" },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();

  function goToSection(item) {
    setMenuOpen(false);

    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (item.category) {
      window.dispatchEvent(
        new CustomEvent("freshmart-category", {
          detail: item.category,
        })
      );

      document
        .getElementById("featured-products")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      return;
    }

    const targetId =
      item.id === "deals" ? "featured-products" : item.id;

    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function openLogin() {
    setMenuOpen(false);
    setAuthOpen(true);
  }

  return (
    <>
      <nav className="fresh-nav">
        <div className="nav-inner">
          <button
            type="button"
            className="nav-brand"
            onClick={() => goToSection({ id: "home" })}
            aria-label="FreshMart home"
          >
            <span className="nav-brand-icon">
              <Leaf size={22} />
            </span>

            <span>
              Fresh
              <span className="nav-brand-highlight">Mart</span>
            </span>
          </button>

          <div
            className={`nav-links ${
              menuOpen ? "nav-links-open" : ""
            }`}
          >
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                className="nav-link"
                onClick={() => goToSection(item)}
              >
                {item.name}
              </button>
            ))}

            <button
              type="button"
              className="nav-deals-button"
              onClick={() => goToSection({ id: "deals" })}
            >
              <Tag size={16} />
              Today's Deals
            </button>
            <a
  href="/delivery-tracking"
  className="nav-link"
  onClick={() => setMenuOpen(false)}
>
  Track My Order
</a>

            <button
              type="button"
              className="nav-login-mobile"
              onClick={openLogin}
            >
              <UserRound size={17} />
              Login / Sign Up
            </button>
          </div>

          <div className="nav-actions">
            <button
              type="button"
              className="nav-cart-button"
              onClick={() => {
                setMenuOpen(false);
                setCartOpen(true);
              }}
              aria-label={`Open cart, ${totalItems} items`}
            >
              <ShoppingBasket size={21} />
              <span className="nav-cart-text">Cart</span>

              {totalItems > 0 && (
                <span className="nav-cart-count">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              type="button"
              className="nav-login-button"
              onClick={openLogin}
            >
              <UserRound size={17} />
              <span>Login / Sign Up</span>
            </button>

            <button
              type="button"
              className="nav-menu-toggle"
              onClick={() =>
                setMenuOpen((previous) => !previous)
              }
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={25} /> : <Menu size={25} />}
            </button>
          </div>
        </div>
      </nav>

      <AuthModal
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
}
