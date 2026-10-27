
import { useEffect, useState } from "react";
import "./CoinCelebration.css";

export default function CoinCelebration({ show }) {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (!show) {
      setCoins([]);
      return;
    }

    setCoins(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 2 + Math.random() * 2,
        size: 22 + Math.random() * 18,
        spin: Math.random() > 0.5 ? 720 : -720,
      }))
    );
  }, [show]);

  if (!show) return null;

  return (
    <div className="coin-celebration">
      {coins.map((coin) => (
        <span
          className="falling-coin"
          key={coin.id}
          style={{
            left: `${coin.left}%`,
            animationDelay: `${coin.delay}s`,
            animationDuration: `${coin.duration}s`,
            fontSize: `${coin.size}px`,
            "--spin": `${coin.spin}deg`,
          }}
        >
          🪙
        </span>
      ))}

      <div className="coin-success-card">
        <div className="success-check">✓</div>
        <h2>Order Confirmed!</h2>
        <p>Your fresh order is on its way! 🌿</p>
        <span className="cod-badge">💵 Cash on Delivery</span>
      </div>
    </div>
  );
}
