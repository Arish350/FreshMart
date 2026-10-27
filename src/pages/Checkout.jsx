
import UPIPayment from "../components/UPIPayment";
import CoinCelebration from "../components/CoinCelebration";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalItems, totalPrice } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [payment, setPayment] = useState("COD");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [savedOrder, setSavedOrder] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const delivery = totalPrice >= 499 || totalPrice === 0 ? 0 : 40;
  const grandTotal = totalPrice + delivery;

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function placeOrder(e) {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add products first.");
      navigate("/");
      return;
    }

    if (payment !== "COD") {
      alert(
        "UPI payment is not connected yet. Please select Cash on Delivery."
      );
      return;
    }

    if (isPlacingOrder) return;

    setIsPlacingOrder(true);

    try {
    
const orderItems = cartItems.map((item) => {
  const productId = item.productId || item._id;

  if (
    typeof productId !== "string" ||
    !/^[0-9a-fA-F]{24}$/.test(productId)
  ) {
    throw new Error(
      `Invalid product ID for "${item.name}". Remove it from the cart and add it again.`
    );
  }

  return {
    productId,
    name: item.name,
    price: Number(item.price),
    quantity: Number(item.quantity ?? item.qty ?? 1),
  };
});


      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: form,
          items: orderItems,
          subtotal: totalPrice,
          deliveryCharge: delivery,
          totalAmount: grandTotal,
          paymentMethod: "COD",
        }),
      });

      
const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Failed to place order.");
}

console.log("Order API response:", data);

setSavedOrder(data.order);
setOrderPlaced(true);

    } catch (error) {
      console.error("Place order error:", error);
      alert(error.message || "Unable to place order. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  if (orderPlaced) {
    return (
      <main className="checkout-page">
        <section className="checkout-success">
          <div className="success-icon">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Your order has been saved successfully!</p>

          {savedOrder?._id && (
            <p>
              <strong>Order ID:</strong> {savedOrder._id}
            </p>
          )}

          <p>Payment method: Cash on Delivery</p>
          <p>
            <strong>Total Amount: ₹{grandTotal.toFixed(2)}</strong>
          </p>

          <button
            className="checkout-primary"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </section>

        <CoinCelebration show={true} />
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <button className="checkout-back" onClick={() => navigate("/")}>
        ← Continue Shopping
      </button>

      <header className="checkout-heading">
        <span>🌿 FreshMart</span>
        <h1>Checkout</h1>
        <p>Fresh from local farms to your doorstep.</p>
      </header>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <section className="checkout-card">
            <h2>📍 Delivery Address</h2>

            <label>Full Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label>Phone Number</label>
            <input
              name="phone"
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              value={form.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              required
            />

            <label>Full Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House number, street and area"
              required
            />

            <div className="checkout-two-columns">
              <div>
                <label>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Your city"
                  required
                />
              </div>

              <div>
                <label>PIN Code</label>
                <input
                  name="pincode"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="6-digit PIN"
                  required
                />
              </div>
            </div>
          </section>

          <section className="checkout-card">
            <h2>💳 Payment Method</h2>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={payment === "COD"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>
                <strong>Cash on Delivery</strong>
                <small>Pay when your order arrives</small>
              </span>
            </label>

            <label className="payment-option">
              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={payment === "UPI"}
                onChange={(e) => setPayment(e.target.value)}
              />
              <span>
                <strong>UPI Payment</strong>
                <small>Online payment gateway not connected yet</small>
              </span>
            </label>

            {payment === "UPI" && (
              <UPIPayment amount={grandTotal} />
            )}
          </section>

          <button
            type="submit"
            className="checkout-primary"
            disabled={cartItems.length === 0 || isPlacingOrder}
          >
            {isPlacingOrder
              ? "Placing Order..."
              : `Place Order · ₹${grandTotal.toFixed(2)}`}
          </button>

          <p className="checkout-demo-note">
            Cash on Delivery orders are saved to FreshMart.
          </p>
        </form>

        <aside className="checkout-card checkout-summary">
          <h2>🛒 Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div
                className="checkout-item"
                key={item.id || item._id || item.productId || item.name}
              >
                <div>
                  <strong>{item.name}</strong>
                  <small>
                    Qty: {item.quantity ?? item.qty ?? 1}
                  </small>
                </div>

                <strong>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity ?? item.qty ?? 1)
                  ).toFixed(2)}
                </strong>
              </div>
            ))
          )}

          <div className="checkout-total-row">
            <span>Items ({totalItems})</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <div className="checkout-total-row">
            <span>Delivery</span>
            <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
          </div>

          <div className="checkout-grand-total">
            <strong>Total Amount</strong>
            <strong>₹{grandTotal.toFixed(2)}</strong>
          </div>

          <p className="checkout-delivery-note">
            🎉 Free delivery on orders above ₹499
          </p>
        </aside>
      </div>
    </main>
  );
}
