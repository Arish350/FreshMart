
import { useState } from "react";
import "./AuthModal.css";

export default function AuthModal({ isOpen, onClose }) {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      isSignup
        ? "Sign Up UI ready! Backend authentication is not connected yet."
        : "Login UI ready! Backend authentication is not connected yet."
    );
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="auth-close"
          onClick={onClose}
          aria-label="Close login window"
        >
          ×
        </button>

        <div className="auth-brand">
          <span className="auth-logo">🌱</span>
          <h2>Fresh<span>Mart</span></h2>
          <p>Fresh from farmers to your home</p>
        </div>

        <h3>{isSignup ? "Create your account" : "Welcome back!"}</h3>
        <p className="auth-subtitle">
          {isSignup
            ? "Join our fresh farmer community"
            : "Login to continue shopping fresh"}
        </p>

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="auth-field">
              <label htmlFor="auth-name">Full Name</label>
              <input
                id="auth-name"
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="auth-email">Email Address</label>
            <input
              id="auth-email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>

          <div className="auth-field">
            <label htmlFor="auth-password">Password</label>
            <div className="auth-password-wrap">
              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                autoComplete={
                  isSignup ? "new-password" : "current-password"
                }
                minLength={6}
                required
              />
              <button
                type="button"
                className="auth-show-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {!isSignup && (
            <div className="auth-options">
              <label className="auth-remember">
                <input type="checkbox" />
                Remember me
              </label>
              <span className="auth-note">Stay fresh 🌿</span>
            </div>
          )}

          <button type="submit" className="auth-submit">
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>

        <p className="auth-switch">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}
          {" "}
          <button type="button" onClick={switchMode}>
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

        <p className="auth-footer">
          🥬 Fresh produce · Support local farmers
        </p>
      </div>
    </div>
  );
}
