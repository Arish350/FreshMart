import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import VoiceAssistant from "../components/VoiceAssistant";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css";
import {
  ArrowRight,
  Leaf,
  Truck,
  ShieldCheck,
  Sprout,
  Star,
  Heart,
  ShoppingBasket,
  Search,
  SlidersHorizontal,
  Minus,
  Plus,
  Check,
} from "lucide-react";
import { useCart } from "../components/CartContext";


const categoryImages = {
  Fruits:
    "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=85",
  Vegetables:
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=85",
  "Leafy Greens":
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=85",
  Organic:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=85",
  Rice:
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  Pulses:
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  Millets:
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Other Grains":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  Eggs:
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=85",
  Dairy:
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=85",
  Oils:
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=85",
};


const fallbackProducts = [
  {
    id: "fallback-1",
    name: "Fresh Tomato",
    category: "Vegetables",
    price: 30,
    unit: "kg",
    rating: "4.8",
    label: "Farm Fresh",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-2",
    name: "Fresh Onion",
    category: "Vegetables",
    price: 40,
    unit: "kg",
    rating: "4.7",
    label: "Farm Fresh",
    image:
      "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-3",
    name: "Fresh Apple",
    category: "Fruits",
    price: 120,
    unit: "kg",
    rating: "4.9",
    label: "Fresh Pick",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-4",
    name: "Fresh Banana",
    category: "Fruits",
    price: 50,
    unit: "dozen",
    rating: "4.8",
    label: "Farm Fresh",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-5",
    name: "Fresh Spinach",
    category: "Leafy Greens",
    price: 20,
    unit: "bunch",
    rating: "4.7",
    label: "Green & Fresh",
    image:
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-6",
    name: "Organic Vegetables",
    category: "Organic",
    price: 60,
    unit: "kg",
    rating: "4.9",
    label: "Organic",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-7",
    name: "Fresh Rice",
    category: "Rice",
    price: 65,
    unit: "kg",
    rating: "4.8",
    label: "Daily Essential",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: "fallback-8",
    name: "Fresh Pulses",
    category: "Pulses",
    price: 90,
    unit: "kg",
    rating: "4.7",
    label: "Protein Rich",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  },
];


const reviews = [
  {
    name: "Priya S.",
    location: "Chidambaram",
    review:
      "The vegetables were fresh and delivery was smooth. I love supporting local farmers!",
  },
  {
    name: "Karthik R.",
    location: "Cuddalore",
    review:
      "Good quality produce at reasonable prices. The fruits were fresh and tasty.",
  },
  {
    name: "Meena K.",
    location: "Mayiladuthurai",
    review:
      "A convenient way to buy farm produce. The website is easy to use.",
  },
];


const filterCategories = [
  "All",
  "Fruits",
  "Vegetables",
  "Leafy Greens",
  "Organic",
  "Rice",
  "Pulses",
  "Millets",
  "Other Grains",
  "Eggs",
  "Dairy",
  "Oils",
];

const categories = [
  {
    id: 1,
    name: "Fruits",
    filter: "Fruits",
    subtitle: "Sweet & seasonal",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 2,
    name: "Vegetables",
    filter: "Vegetables",
    subtitle: "Fresh from farms",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 3,
    name: "Leafy Greens",
    filter: "Leafy Greens",
    subtitle: "Green & healthy",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 4,
    name: "Organic",
    filter: "Organic",
    subtitle: "Naturally fresh",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 5,
    name: "Rice",
    filter: "Rice",
    subtitle: "Everyday essentials",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 6,
    name: "Pulses",
    filter: "Pulses",
    subtitle: "Protein-rich foods",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 7,
    name: "Millets",
    filter: "Millets",
    subtitle: "Traditional grains",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 8,
    name: "Other Grains",
    filter: "Other Grains",
    subtitle: "Daily grain staples",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 9,
    name: "Eggs",
    filter: "Eggs",
    subtitle: "Farm-fresh eggs",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 10,
    name: "Dairy",
    filter: "Dairy",
    subtitle: "Fresh dairy products",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=85",
  },
  {
    id: 11,
    name: "Oils",
    filter: "Oils",
    subtitle: "Traditional cooking oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=85",
  },
];

const productImages = {
  "Pure Groundnut Oil":
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=85",
  "Pure Sesame Oil":
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=85",
  "Fresh Beetroot":
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=85",
  "Fresh Cabbage":
    "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=85",
  "Bitter Gourd":
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=85",
  "Fresh Butter":
    "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=85",
  "Fresh Potato":
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=85",
  "Fresh Onion":
    "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=600&q=85",
  "Green Peas":
    "https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&w=600&q=85",
  "Fresh Broccoli":
    "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=85",
  "Fresh Pumpkin":
    "https://images.unsplash.com/photo-1570586437263-ab629fccc818?auto=format&fit=crop&w=600&q=85",
  "Fresh Mushroom":
    "https://images.unsplash.com/photo-1504545102780-26774c1bb073?auto=format&fit=crop&w=600&q=85",
  "French Beans":
    "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0?auto=format&fit=crop&w=600&q=85",
  "Bottle Gourd":
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=85",
  "Fresh Turnip":
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=85",
  "Green Chilli":
    "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=600&q=85",
  "Maize":
    "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=85",
  "Kambu":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Thinai":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Samai":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Wheat":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Drumstick":
    "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=85",
  "Barley":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Country Chicken Eggs":
    "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=85",
  "Fresh Cow Milk":
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=85",
  "Fresh Curd":
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=85",
  "Green Grapes":
    "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=600&q=85",
  "Sweet Bananas":
    "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=85",
  "Fresh Spinach":
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=85",
  "Red Apples":
    "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=85",
  "Fresh Carrots":
    "https://images.unsplash.com/photo-1445282768818-728615cc910a?auto=format&fit=crop&w=600&q=85",
  "Organic Cucumber":
    "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=600&q=85",
  "Fresh Coriander":
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=600&q=85",
  "Ponni Rice":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  "Raw Rice":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
"Brown Rice":
  "https://images.unsplash.com/photo-1516684732162-798a0062be99?auto=format&fit=crop&w=600&q=85",
  "Toor Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  "Urad Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  "Moong Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  "Chana Dal":
    "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=600&q=85",
  "Basmati Rice":
    "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=85",
  "Ragi":
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=85",
  "Fresh Tomatoes":
    "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=600&q=85",
};

export default function Home() {
 const { addToCart, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const scrollToSection = (sectionId) => {
  document.getElementById(sectionId)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};


const [products, setProducts] = useState(fallbackProducts);

useEffect(() => {
  let cancelled = false;

  async function loadProducts() {
    try {
      const response = await fetch("http://localhost:5000/api/products");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch products. Status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("API response is not an array");
      }

      console.log("API products count:", data.length);
      console.log(
        "API product names:",
        data.map((product) => product.name)
      );

      if (cancelled) return;

      if (data.length > 0) {
        const mongoProducts = data.map((product) => {
          
const name = String(product.name || "Fresh Product").trim();
const category = String(product.category || "Other Grains").trim();

const databaseImage =
  typeof product.image === "string" ? product.image.trim() : "";

const image =
  productImages[name] ||
  (databaseImage || "") ||
  categoryImages[category] ||
  categoryImages.Vegetables;


          return {
            ...product,
            id: product._id || product.id || name,
            name,
            category,
            image,
            rating: product.rating ?? "4.8",
            label: product.label || "Farm Fresh",
            price: Number(product.price) || 0,
            unit: product.unit || "kg",
          };
        });

        console.log("Products ready to display:", mongoProducts.length);
        
const mergedProducts = [...fallbackProducts];

mongoProducts.forEach((apiProduct) => {
  const index = mergedProducts.findIndex(
    (item) =>
      String(item.name || "").trim().toLowerCase() ===
      String(apiProduct.name || "").trim().toLowerCase()
  );

  if (index !== -1) {
    mergedProducts[index] = {
      ...mergedProducts[index],
      ...apiProduct,
    };
  } else {
    mergedProducts.push(apiProduct);
  }
});

setProducts(mergedProducts);

      } else {
        console.warn(
          "API returned zero products. Keeping fallback products."
        );
      }
    } catch (error) {
      console.error("MongoDB products loading error:", error);
    }
  }

  loadProducts();

  return () => {
    cancelled = true;
  };
}, []);



  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const [addedProduct, setAddedProduct] = useState(null);
   
  const [likedProducts, setLikedProducts] = useState([]);

  const toggleLike = (productId) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };


  function selectCategory(category) {
    setActiveCategory(category);
    setSearch("");
    scrollToSection("featured-products");
  }

  function changeQuantity(id, change) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(1, (current[id] || 1) + change),
    }));
  }

  function handleAddToCart(product) {
    addToCart(product, quantities[product.id] || 1);
    setAddedProduct(product.id);
    window.setTimeout(() => setAddedProduct(null), 1200);
  }

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <main>
        {/* CART ICON */}
    <div className="home-cart-container">
      <Link to="/cart" className="cart-link" aria-label="Open shopping cart">
        <ShoppingCart size={22} />

        {totalItems > 0 && (
          <span className="cart-count">{totalItems}</span>
        )}
      </Link>
    </div>
      {/* HERO */}
      <section className="home-hero" id="home">
        <div className="home-hero-content">
          <div className="hero-badge">
            <Leaf size={16} />
            FRESH FROM LOCAL FARMS
          </div>

          <h1>
            Eat fresh.
            <br />
            Live <span>healthy.</span>
            <br />
            Choose local.
          </h1>

          <p className="home-hero-description">
            Discover farm-fresh fruits and vegetables, sourced directly from
            local farmers and delivered to your doorstep.
          </p>

          <div className="home-hero-actions">
            <button
              className="home-primary-button"
              onClick={() => scrollToSection("featured-products")}
            >
              Shop Fresh Produce <ArrowRight size={19} />
            </button>

            <button
              className="home-secondary-button"
              onClick={() => scrollToSection("categories")}
            >
              Explore Categories
            </button>
          </div>

          <div className="hero-social-proof">
            <div className="hero-avatar-stack">
              <span>👩</span>
              <span>👨</span>
              <span>👩‍🌾</span>
            </div>
            <div>
              <div className="hero-stars">
                ★★★★★ <strong>4.8/5</strong>
              </div>
              <small>Fresh food, happy customers</small>
            </div>
          </div>
        </div>

        <div className="home-hero-visual">
          <div className="hero-image-backdrop" />
          <img
            className="home-hero-image"
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
            alt="Fresh fruits and vegetables"
          />

          <div className="hero-info-card hero-fresh-card">
            <span className="hero-info-icon">🌿</span>
            <div>
              <strong>Farm Fresh</strong>
              <small>Picked with care</small>
            </div>
          </div>

          <div className="hero-info-card hero-delivery-card">
            <span className="hero-info-icon delivery-circle">
              <Truck size={22} />
            </span>
            <div>
              <strong>Farm to Home</strong>
              <small>Convenient delivery</small>
            </div>
          </div>

          <div className="hero-leaf-decoration">✳</div>
        </div>
      </section>
    
      {/* BENEFITS */}
      <section className="home-benefits">
        <div className="home-benefit">
          <span className="benefit-icon"><Sprout size={24} /></span>
          <div>
            <strong>Direct from Farmers</strong>
            <p>Support local farming</p>
          </div>
        </div>

        <div className="home-benefit">
          <span className="benefit-icon"><Truck size={24} /></span>
          <div>
            <strong>Home Delivery</strong>
            <p>Freshness at your door</p>
          </div>
        </div>

        <div className="home-benefit">
          <span className="benefit-icon"><ShieldCheck size={24} /></span>
          <div>
            <strong>Quality First</strong>
            <p>Carefully selected produce</p>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="home-section categories-section" id="categories">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">EXPLORE THE MARKET</span>
            <h2>Shop by category</h2>
            <p>Find your everyday freshness in a few clicks.</p>
          </div>

          <button
            className="home-text-button"
            onClick={() => selectCategory("All")}
          >
            View all <ArrowRight size={17} />
          </button>
        </div>

        <div className="home-category-grid">
          {categories.map((category, index) => (
            <button
              className="home-category-card"
              key={category.id}
              onClick={() => selectCategory(category.filter)}
            >
              <div className="category-image-wrap">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                />
                <span className="category-number">0{index + 1}</span>
                <span className="category-image-arrow">
                  <ArrowRight size={18} />
                </span>
              </div>

              <div className="category-card-info">
                <h3>{category.name}</h3>
                <p>{category.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS, SEARCH AND FILTER */}
      <section
        className="home-section featured-section"
        id="featured-products"
      >
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">FRESH FROM THE FARM</span>
            <h2>Today's fresh picks</h2>
            <p>Search products and choose your favourite produce.</p>
          </div>

          <span className="fresh-pick-label">
            <Sprout size={16} /> Fresh picks
          </span>
        </div>

        
<div className="product-toolbar">
  <div className="product-search">
    <Search size={20} />

    <input
      type="search"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      placeholder="Search tomato, rice, dal, millets..."
      aria-label="Search products"
    />

    {search && (
      <button
        type="button"
        className="clear-search"
        onClick={() => setSearch("")}
        aria-label="Clear search"
      >
        ×
      </button>
    )}
  </div>
<VoiceAssistant
  products={products}
  onAddToCart={handleAddToCart}
  onSearch={(query) => {
    setSearch(query);
    setActiveCategory("All");
    scrollToSection("featured-products");
  }}
/>
  <div className="filter-heading">
    <SlidersHorizontal size={17} />
    <span>Category</span>
  </div>
</div>

<div className="product-filter-list">
  {filterCategories.map((category) => (
    <button
      type="button"
      key={category}
      className={`product-filter-chip ${
        activeCategory === category ? "product-filter-active" : ""
      }`}
      onClick={() => setActiveCategory(category)}
    >
      {category}
    </button>
  ))}
</div>


        <div className="product-result-count">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>

        {filteredProducts.length > 0 ? (
          <div className="home-product-grid">
            {filteredProducts.map((product) => (
              <article className="home-product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                  />
                  <span className="product-label">{product.label}</span>
                  
                  <button
  type="button"
  className={`product-wishlist ${
    likedProducts.includes(product.id) ? "liked" : ""
  }`}
  aria-label={`Add ${product.name} to wishlist`}
  onClick={() => toggleLike(product.id)}
>
  <Heart
    size={19}
    fill={likedProducts.includes(product.id) ? "currentColor" : "none"}
  />
</button>
                </div>

                <div className="home-product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  </div>

                  <div className="product-rating">
                    <Star size={15} fill="currentColor" />
                    <strong>{product.rating}</strong>
                    <span>Rating</span>
                  </div>
                  
   
   
<div className="product-bottom-row">
  <div className="product-price">
    <strong>₹{product.price}</strong>
    <span> / {product.unit}</span>
  </div>
</div>

<div className="quantity-row">
  <span className="quantity-label">Quantity</span>

  <div className="quantity-control">
    <button
      type="button"
      className="quantity-btn quantity-minus"
      onClick={() => changeQuantity(product.id, -1)}
      disabled={(quantities[product.id] || 1) <= 1}
      aria-label={`Decrease ${product.name} quantity`}
    >
      <Minus size={16} />
    </button>

    <span className="quantity-value">
      {quantities[product.id] || 1}
    </span>

    <button
      type="button"
      className="quantity-btn quantity-plus"
      onClick={() => changeQuantity(product.id, 1)}
      aria-label={`Increase ${product.name} quantity`}
    >
      <Plus size={16} />
    </button>
  </div>
</div>

<div className="product-line-total">
  Subtotal:{" "}
  <strong>
    ₹{product.price * (quantities[product.id] || 1)}
  </strong>
</div>

<button
  type="button"
  className={`add-to-cart-button ${
    addedProduct === product.id ? "added-to-cart" : ""
  }`}
  onClick={() => handleAddToCart(product)}
>
  {addedProduct === product.id ? (
    <>
      <Check size={18} /> Added to Cart
    </>
  ) : (
    <>
      <ShoppingBasket size={18} /> Add to Cart
    </>
  )}
</button>
</article>
 ))}
          </div>

        ) : (
          <div className="no-products">
            <span>🥬</span>
            <h3>No products found</h3>
            <p>Try a different search or category.</p>
            <button
              className="home-primary-button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
            >
              Show all products
            </button>
          </div>
        )}
      </section>
      


      {/* CHECKOUT BUTTON BELOW PRODUCTS */}
      {totalItems > 0 && (
        <div
          className="home-checkout-bar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
            margin: "24px 0",
            padding: "20px",
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: "16px",
          }}
        >
          <div>
            <strong>
              🛒 {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </strong>
            <p>Total: ₹{Number(totalPrice).toFixed(2)}</p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/checkout")}
            className="checkout-primary"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              padding: "12px 20px",
              background: "#15803d",
              color: "#ffffff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* FARMER BANNER */}
      <section className="home-farmer-banner">

        <div className="farmer-banner-icon">👩‍🌾</div>

        <div className="farmer-banner-copy">
          <span className="home-eyebrow">FOR OUR FARMING COMMUNITY</span>
          <h2>Are you a local farmer?</h2>
          <p>
            Showcase your harvest, reach more customers and grow your business
            with FreshMart.
          </p>
        </div>

<button
  className="home-primary-button farmer-join-button"
  onClick={() => navigate("/join-farmer")}
>
  Join FreshMart <ArrowRight size={18} />
</button>
  <Link to="/farmer-dashboard" className="dashboard-link">
    🌾 Farmer Dashboard <ArrowRight size={18} />
  </Link>


      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="home-section reviews-section" id="reviews">
        <div className="home-section-heading">
          <div>
            <span className="home-eyebrow">OUR COMMUNITY</span>
            <h2>Freshness people love</h2>
            <p>What shoppers say about their experience.</p>
          </div>
        </div>

        <div className="home-review-grid">
          {reviews.map((review) => (
            <article className="home-review-card" key={review.name}>
              <div className="review-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>

              <p className="review-quote">“{review.review}”</p>

              <div className="review-person">
                <span className="review-avatar">
                  {review.name.charAt(0)}
                </span>
                <div>
                  <strong>{review.name}</strong>
                  <small>{review.location}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* BOTTOM BANNER */}
      <section className="home-newsletter">
        <div>
          <span className="home-eyebrow">A LITTLE MORE FRESHNESS</span>
          <h2>Good food starts with good choices.</h2>
          <p>Shop local. Eat seasonal. Support our farmers.</p>
        </div>

    <button
  className="home-newsletter-button"
  onClick={() => scrollToSection("featured-products")}
>
  Find your fresh picks <ArrowRight size={18} />
</button>
      </section>
          
            {/* TRACK MY ORDER CARD - BOTTOM OF HOME PAGE */}
      <section className="track-order-section">
        <div className="track-order-card">
          <div className="track-order-icon">
            <Truck size={36} />
          </div>

          <div className="track-order-content">
            <span className="track-order-tag">
              FRESH DELIVERY
            </span>

            <h2>Track My Order</h2>

            <p>
              Your farm-fresh products are on their way!
              Track your delivery from farm to home.
            </p>

            <button
              type="button"
              className="track-order-button"
              onClick={() => {
                window.location.href = "/delivery-tracking";
              }}
            >
              Track My Order
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="track-order-decoration">🚚</div>
        </div>
      </section>

    </main>
  );
}
