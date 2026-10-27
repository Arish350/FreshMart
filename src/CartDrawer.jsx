
import { useCart } from "./components/CartContext";
import { X, Minus, Plus, Trash2, ShoppingBasket } from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setCartOpen(false)}>
      <div
        className="cart-drawer"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="cart-header">
          <div>
            <h2>Your Cart</h2>
            <p>{totalItems} item(s)</p>
          </div>

          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <ShoppingBasket size={48} />
            <h3>Your cart is empty</h3>
            <p>Add fresh products from local farmers.</p>
            <button onClick={() => setCartOpen(false)}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div className="cart-item-info">
                    <h3>{item.name}</h3>
                    <p>₹{item.price} / {item.unit}</p>

                    <div className="quantity-control">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-right">
                    <strong>₹{item.price * item.quantity}</strong>
                    <button
                      className="cart-remove"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <strong>₹{totalPrice}</strong>
              </div>

              <button
                className="checkout-button"
                onClick={() => alert("Checkout will be added next!")}
              >
                Proceed to Checkout
              </button>

              <button
                className="continue-shopping"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
