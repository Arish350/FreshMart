
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sprout,
  Users,
  TrendingUp,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Tractor,
} from "lucide-react";
import "./FarmerJoin.css";

export default function FarmerJoin() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    products: "",
    farmSize: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Demo only: farmer details are not saved to a backend.
    setSubmitted(true);
  }

  return (
    <main className="farmer-page">
      <nav className="farmer-nav">
        <button className="farmer-brand" onClick={() => navigate("/")}>
          <span className="farmer-brand-icon"><Sprout size={24} /></span>
          Fresh<span>Mart</span>
        </button>
        <button className="farmer-home-btn" onClick={() => navigate("/")}>
          ← Back to Shop
        </button>
      </nav>

      <section className="farmer-hero">
        <div className="farmer-hero-content">
          <span className="farmer-eyebrow">
            <Leaf size={15} /> FOR OUR FARMING COMMUNITY
          </span>

          <h1>
            Are you a <span>local farmer?</span>
          </h1>

          <p>
            Showcase your harvest, reach more customers and grow your
            business with FreshMart.
          </p>

          <button
            className="farmer-join-btn"
            onClick={() =>
              document.getElementById("farmer-form")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            Join FreshMart <ArrowRight size={19} />
          </button>

          <div className="farmer-hero-note">
            <CheckCircle2 size={17} />
            Grow locally. Reach more customers.
          </div>
        </div>

        <div className="farmer-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=85"
            alt="Green fields on a farm"
          />
          <div className="farmer-floating-card farmer-float-one">
            <span>🌱</span>
            <div><strong>Grow your reach</strong><small>Connect with customers</small></div>
          </div>
          <div className="farmer-floating-card farmer-float-two">
            <span>🥬</span>
            <div><strong>Fresh harvest</strong><small>Straight from your farm</small></div>
          </div>
          <span className="farmer-deco farmer-deco-one">✳</span>
          <span className="farmer-deco farmer-deco-two">✦</span>
        </div>
      </section>

      <section className="farmer-benefits">
        <div className="farmer-section-heading">
          <span>WHY FRESHMART?</span>
          <h2>Your harvest deserves a bigger market.</h2>
          <p>Bring your farm closer to the people who love fresh food.</p>
        </div>

        <div className="farmer-benefit-grid">
          <article className="farmer-benefit-card">
            <div className="farmer-benefit-icon"><Sprout size={28} /></div>
            <h3>Showcase Your Harvest</h3>
            <p>Present your fresh fruits, vegetables and farm products online.</p>
          </article>

          <article className="farmer-benefit-card">
            <div className="farmer-benefit-icon"><Users size={28} /></div>
            <h3>Reach More Customers</h3>
            <p>Help nearby customers discover the produce you grow.</p>
          </article>

          <article className="farmer-benefit-card">
            <div className="farmer-benefit-icon"><TrendingUp size={28} /></div>
            <h3>Grow Your Business</h3>
            <p>Build your online presence and develop customer relationships.</p>
          </article>
        </div>
      </section>

      <section className="farmer-form-section" id="farmer-form">
        <div className="farmer-form-intro">
          <div className="farmer-form-symbol"><Tractor size={34} /></div>
          <span>LET'S GROW TOGETHER</span>
          <h2>Join our farmer community</h2>
          <p>Tell us about yourself and the fresh produce you grow.</p>
          <div className="farmer-form-promise">
            <CheckCircle2 size={18} /> Your farming journey starts here.
          </div>
        </div>

        <form className="farmer-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="farmer-submitted">
              <CheckCircle2 size={58} />
              <h2>Thank you, {form.name}!</h2>
              <p>
                Your demo registration is complete. Connect a backend to
                securely save your farmer application.
              </p>
              <button type="button" onClick={() => setSubmitted(false)}>
                Edit details
              </button>
            </div>
          ) : (
            <>
              <h3>Farmer registration</h3>
              <p className="farmer-form-caption">Fill in your basic details below.</p>

              <label htmlFor="farmer-name">Full name</label>
              <input
                id="farmer-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

              <label htmlFor="farmer-phone">Mobile number</label>
              <input
                id="farmer-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]{10}"
                maxLength={10}
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                required
              />

              <label htmlFor="farmer-village">Village / Town</label>
              <input
                id="farmer-village"
                name="village"
                value={form.village}
                onChange={handleChange}
                placeholder="Your village or town"
                required
              />

              <label htmlFor="farmer-products">What do you grow?</label>
              <input
                id="farmer-products"
                name="products"
                value={form.products}
                onChange={handleChange}
                placeholder="Tomato, onion, greens..."
                required
              />

              <label htmlFor="farmer-size">Farm size (optional)</label>
              <select
                id="farmer-size"
                name="farmSize"
                value={form.farmSize}
                onChange={handleChange}
              >
                <option value="">Select farm size</option>
                <option value="Under 1 acre">Under 1 acre</option>
                <option value="1–3 acres">1–3 acres</option>
                <option value="3–5 acres">3–5 acres</option>
                <option value="Above 5 acres">Above 5 acres</option>
              </select>

              <button className="farmer-submit-btn" type="submit">
                Join as a Farmer <ArrowRight size={18} />
              </button>

              <small className="farmer-privacy-note">
                Demo form only. Details are not sent or saved yet.
              </small>
            </>
          )}
        </form>
      </section>

      <footer className="farmer-footer">
        <Sprout size={19} /> FreshMart — Supporting local farming communities.
      </footer>
    </main>
  );
}
