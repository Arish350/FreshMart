import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

import { useCart } from "../components/CartContext";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  const navigate = useNavigate();

  return (
    <main className="cart-page">
      <div className="cart-header">
        <div>
          <span className="cart-eyebrow">FRESHMART</span>
          <h1>My Shopping Cart</h1>
          <p>
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <Link to="/" className="continue-shopping">
          <ArrowLeft size={18} />
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <section className="empty-cart">
          <ShoppingCart size={64} />
          <h2>Your cart is empty</h2>
          <p>Add fresh products from local farmers to get started.</p>
          <Link to="/" className="cart-shop-button">
            Shop Fresh Products
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-products">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-product-image"
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-product-details">
                  <span className="cart-product-category">
                    {item.category}
                  </span>
                  <h3>{item.name}</h3>
                  <p>
                    ₹{item.price} / {item.unit}
                  </p>

                  <div className="cart-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      <Minus size={16} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <strong>
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </strong>

                  <button
                    type="button"
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
              <span>Total items</span>
              <strong>{totalItems}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>₹{Number(totalPrice).toFixed(2)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Delivery</span>
              <strong>Calculated at checkout</strong>
            </div>

            <hr />

            <div className="cart-summary-total">
              <span>Product total</span>
              <strong>₹{Number(totalPrice).toFixed(2)}</strong>
            </div>

            <button
              type="button"
              className="cart-checkout-button"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>

            <p className="cart-summary-note">
              Fresh products sourced from local farmers.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
