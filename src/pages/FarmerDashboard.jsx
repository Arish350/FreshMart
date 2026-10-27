import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChartNoAxesCombined,
  UserRound,
  Settings,
  Bell,
  Leaf,
  IndianRupee,
  Clock,
  AlertTriangle,
  Plus,
  Trash2,
  Sprout,
  Box,
  TrendingUp,
  Menu,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
} from "recharts";

import "./FarmerDashboard.css";

function AnimatedStat({ title, value, icon: Icon, type, prefix = "" }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();
    const duration = 900;

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.floor(value * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon">
        <Icon size={25} />
      </div>

      <p className="stat-title">{title}</p>

      <h2>
        {prefix}
        {display.toLocaleString("en-IN")}
      </h2>

      <span className="stat-caption">
        <TrendingUp size={14} /> Farm overview
      </span>
    </div>
  );
}

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState({
  name: "Farmer",
});
  // Notification states
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState("");

  // Dashboard states
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    totalOrderValue: 0,
    revenue: 0,
    pendingPayments: 0,
    todayOrders: 0,
    todaySales: 0,
  });

  const [chartData, setChartData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  // Fetch dashboard data
  useEffect(() => {
    async function loadDashboard() {
      try {
        setApiLoading(true);
        setApiError("");

        const [ordersResponse, analyticsResponse] = await Promise.all([
          fetch("http://localhost:5000/api/orders"),
          fetch("http://localhost:5000/api/analytics"),
        ]);

        if (!ordersResponse.ok || !analyticsResponse.ok) {
          throw new Error("Unable to load dashboard data");
        }

        const orderData = await ordersResponse.json();
        const analyticsData = await analyticsResponse.json();

        const validOrders = orderData.filter(
          (order) => order.orderStatus !== "Cancelled"
        );

        const totalOrderValue = validOrders.reduce(
          (sum, order) => sum + Number(order.totalAmount || 0),
          0
        );

        const pendingPayments = validOrders
          .filter((order) => order.paymentStatus !== "Paid")
          .reduce(
            (sum, order) => sum + Number(order.totalAmount || 0),
            0
          );

        setOrders(validOrders);

        setAnalytics({
          totalOrders: validOrders.length,
          totalOrderValue,
          revenue: Number(analyticsData.revenue || 0),
          pendingPayments,
          todayOrders: Number(analyticsData.todayOrders || 0),
          todaySales: Number(analyticsData.todaySales || 0),
        });

        const daily = {};

        validOrders.forEach((order) => {
          const date = new Date(order.createdAt).toISOString().slice(0, 10);

          if (!daily[date]) {
            daily[date] = { day: date, sales: 0, orders: 0 };
          }

          daily[date].orders += 1;

          if (order.paymentStatus === "Paid") {
            daily[date].sales += Number(order.totalAmount || 0);
          }
        });

        setChartData(
          Object.values(daily).sort((a, b) => a.day.localeCompare(b.day))
        );
      } catch (error) {
        console.error("Dashboard API error:", error);
        setApiError("Dashboard data could not be loaded.");
      } finally {
        setApiLoading(false);
      }
    }

    loadDashboard();
  }, []);

  // Load notifications from the backend
  async function fetchNotifications() {
    setLoadingNotifications(true);
    setNotificationError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications"
      );

      if (!response.ok) {
        throw new Error("Failed to load notifications");
      }

      const data = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected notifications response");
      }

      setNotifications(data);
    } catch (error) {
      console.error("Notification error:", error);
      setNotificationError(
        "Could not load notifications. Please try again."
      );
    } finally {
      setLoadingNotifications(false);
    }
  }

  async function toggleNotifications() {
    if (showNotifications) {
      setShowNotifications(false);
      return;
    }

    setShowNotifications(true);
    await fetchNotifications();
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const [products, setProducts] = useState([
    { id: 1, name: "Tomato", price: 25, quantity: 10, unit: "kg" },
    { id: 2, name: "Onion", price: 35, quantity: 20, unit: "kg" },
    { id: 3, name: "Carrot", price: 40, quantity: 4, unit: "kg" },
  ]);

  const [activeNav, setActiveNav] = useState("Dashboard");
  const [chartMode, setChartMode] = useState("sales");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const stock = products.reduce(
    (sum, product) => sum + Number(product.quantity || 0),
    0
  );

  const lowStock = products.filter(
    (product) => Number(product.quantity) <= 5
  );

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Products", icon: Package },
    { label: "Orders", icon: ShoppingCart },
    { label: "Sales", icon: ChartNoAxesCombined },
    { label: "Profile", icon: UserRound },
    { label: "Settings", icon: Settings },
  ];

  function handleNavClick(label) {
    setActiveNav(label);

    if (label === "Settings" || label === "Profile") {
      setMenuOpen(false);
      navigate("/farmer-settings");
      return;
    }

    if (label === "My Products") {
      document.getElementById("my-products")?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (label === "Sales") {
      document.getElementById("analytics")?.scrollIntoView({
        behavior: "smooth",
      });
    } else if (label === "Dashboard") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (label === "Orders") {
      alert("Orders page is not connected yet.");
    }

    setMenuOpen(false);
  }

  function addProduct(e) {
    e.preventDefault();

    if (
      !newProduct.name.trim() ||
      newProduct.price === "" ||
      newProduct.quantity === "" ||
      Number(newProduct.price) < 0 ||
      Number(newProduct.quantity) < 0
    ) {
      alert("Please enter valid product details.");
      return;
    }

    setProducts((current) => [
      ...current,
      {
        id: Date.now(),
        name: newProduct.name.trim(),
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        unit: "kg",
      },
    ]);

    setNewProduct({ name: "", price: "", quantity: "" });
    setShowForm(false);
  }

  function removeProduct(id) {
    setProducts((current) => current.filter((product) => product.id !== id));
  }

  return (
    <div className="farmer-dashboard">
      <aside
        className={`farmer-sidebar ${menuOpen ? "sidebar-open" : ""}`}
      >
        <div className="brand">
          <div className="brand-mark">
            <Sprout size={35} />
          </div>

          <div>
            <h2>MART</h2>
            <span>FARMER PORTAL</span>
          </div>

          <button
            type="button"
            className="mobile-close"
            aria-label="Close navigation"
            onClick={() => setMenuOpen(false)}
          >
            <X size={21} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              className={`nav-item ${activeNav === label ? "active" : ""}`}
              onClick={() => handleNavClick(label)}
            >
              <Icon size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-farm-art">
          <div className="farm-sun" />
          <div className="farm-hills" />

          <div className="farm-lines">
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>

          <p>
            Better Farming,
            <br />
            Brighter Future
          </p>

          <Leaf size={28} />
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Close navigation"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <main className="farmer-main">
        <header className="dashboard-header">
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={24} />
          </button>

          <div className="page-heading">
            <Leaf className="heading-leaf" size={42} />

            <div>
              <h1>Farmer Dashboard</h1>
              <p>Manage your products and monitor your farm.</p>
            </div>
          </div>

          {/* Notification bell and dropdown */}
          <div className="farmer-account">
            <div className="notification-wrapper">
              <button
                type="button"
                className="notification-button"
                aria-label="Notifications"
                aria-expanded={showNotifications}
                onClick={toggleNotifications}
              >
                <Bell size={22} />

                {unreadCount > 0 && (
                  <span className="notification-badge">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <strong>Notifications</strong>

                    <button
                      type="button"
                      onClick={fetchNotifications}
                      disabled={loadingNotifications}
                    >
                      Refresh
                    </button>
                  </div>

                  {loadingNotifications ? (
                    <p className="notification-empty">
                      Loading notifications...
                    </p>
                  ) : notificationError ? (
                    <div className="notification-empty">
                      <p>{notificationError}</p>
                      <button
                        type="button"
                        onClick={fetchNotifications}
                      >
                        Try again
                      </button>
                    </div>
                  ) : notifications.length === 0 ? (
                    <p className="notification-empty">
                      No notifications yet.
                    </p>
                  ) : (
                    <div className="notification-list">
                      {notifications.map((notification) => (
                        <div
                          className={`notification-item ${
                            notification.isRead ? "is-read" : "is-unread"
                          }`}
                          key={notification._id}
                        >
                          <span
                            className={`notification-dot ${
                              notification.isRead ? "read" : ""
                            }`}
                          />

                          <div className="notification-content">
                            <strong>{notification.title}</strong>
                            <p>{notification.message}</p>

                            <small>
                              {notification.createdAt
                                ? new Date(
                                    notification.createdAt
                                  ).toLocaleString("en-IN")
                                : ""}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>


<button
  type="button"
  className="farmer-profile-button"
  onClick={() => navigate("/farmer-profile")}
  aria-label="Open farmer profile"
>
  <span className="farmer-profile-avatar">
    <UserRound size={22} />
  </span>

  <span className="farmer-profile-info">
    <strong>{farmer?.name || "Farmer"}</strong>
    <span>Farmer Account</span>
  </span>

  <span className="farmer-profile-arrow">↗</span>
</button>
</div>
</header>



        <section className="stats-grid">
          <section className="stats-grid payment-stats">
            <AnimatedStat
              title="Paid Revenue"
              value={analytics.revenue}
              icon={IndianRupee}
              type="stat-green"
              prefix="₹"
            />

            <AnimatedStat
              title="Pending Payments"
              value={analytics.pendingPayments}
              icon={Clock}
              type="stat-orange"
              prefix="₹"
            />

            <AnimatedStat
              title="Today's Orders"
              value={analytics.todayOrders}
              icon={ShoppingCart}
              type="stat-blue"
            />

            <AnimatedStat
              title="Today's Paid Sales"
              value={analytics.todaySales}
              icon={TrendingUp}
              type="stat-purple"
              prefix="₹"
            />
          </section>

          {apiLoading && <p>Loading dashboard data...</p>}
          {apiError && <p role="alert">{apiError}</p>}

          <AnimatedStat
            title="Total Products"
            value={products.length}
            icon={Leaf}
            type="stat-green"
          />

          <AnimatedStat
            title="Total Orders"
            value={analytics.totalOrders}
            icon={Box}
            type="stat-blue"
          />

          <AnimatedStat
            title="Total Order Value"
            value={analytics.totalOrderValue}
            icon={IndianRupee}
            type="stat-orange"
            prefix="₹"
          />

          <AnimatedStat
            title="Available Stock"
            value={stock}
            icon={ShoppingCart}
            type="stat-purple"
          />
        </section>

        <section className="dashboard-middle" id="analytics">
          <div className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <h3>Sales &amp; Orders Overview</h3>
                <p>Real-time sales and order trends</p>
              </div>

              <div className="chart-tabs">
                <button
                  type="button"
                  className={chartMode === "sales" ? "selected" : ""}
                  onClick={() => setChartMode("sales")}
                >
                  Sales
                </button>

                <button
                  type="button"
                  className={chartMode === "orders" ? "selected" : ""}
                  onClick={() => setChartMode("orders")}
                >
                  Orders
                </button>
              </div>
            </div>

            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 15, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid stroke="#e8efeb" vertical={false} />

                  <XAxis
                    dataKey="day"
                    tick={{ fill: "#718b85", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    yAxisId="main"
                    tick={{ fill: "#718b85", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={48}
                    tickFormatter={(value) =>
                      chartMode === "sales"
                        ? value === 0
                          ? "0"
                          : `${value / 1000}K`
                        : value
                    }
                  />

                  <Tooltip
                    formatter={(value, name) => [
                      name.includes("Sales")
                        ? `₹${Number(value).toLocaleString("en-IN")}`
                        : value,
                      name,
                    ]}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e3eee7",
                    }}
                  />

                  <Bar
                    yAxisId="main"
                    dataKey={chartMode === "sales" ? "orders" : "sales"}
                    name={chartMode === "sales" ? "Orders" : "Sales"}
                    fill="#16a34a"
                    radius={[4, 4, 0, 0]}
                    barSize={22}
                    isAnimationActive
                  />

                  <Line
                    yAxisId="main"
                    type="monotone"
                    dataKey={chartMode === "sales" ? "sales" : "orders"}
                    name={chartMode === "sales" ? "Sales" : "Orders"}
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#2563eb" }}
                    activeDot={{ r: 6 }}
                    isAnimationActive
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="chart-legend">
              <span>
                <i className="legend-green" />
                {chartMode === "sales" ? "Orders" : "Sales (₹)"}
              </span>

              <span>
                <i className="legend-blue" />
                {chartMode === "sales" ? "Sales (₹)" : "Orders"}
              </span>
            </div>

            {!apiLoading && chartData.length === 0 && (
              <p className="sample-note">
                No order data available for the chart yet.
              </p>
            )}
          </div>

          <div className="panel activity-panel">
            <div className="activity-heading">
              <h3>
                <Clock size={21} /> Recent Activity
              </h3>
              <span>Overview</span>
            </div>

            <div className="activity-list">
              <div className="activity-row">
                <div className="activity-icon activity-leaf">
                  <Leaf size={19} />
                </div>

                <div className="activity-copy">
                  <strong>Product inventory</strong>
                  <span>{products.length} products listed</span>
                </div>

                <time>Now</time>
              </div>

              <div className="activity-row">
                <div className="activity-icon activity-cart">
                  <ShoppingCart size={19} />
                </div>

                <div className="activity-copy">
                  <strong>Order summary</strong>
                  <span>{orders.length} orders recorded</span>
                </div>

                <time>Now</time>
              </div>

              <div className="activity-row">
                <div className="activity-icon activity-rupee">
                  <IndianRupee size={19} />
                </div>

                <div className="activity-copy">
                  <strong>Sales summary</strong>
                  <span>
                    ₹{analytics.revenue.toLocaleString("en-IN")} paid revenue
                  </span>
                </div>

                <time>Now</time>
              </div>

              <div className="activity-row">
                <div className="activity-icon activity-box">
                  <Package size={19} />
                </div>

                <div className="activity-copy">
                  <strong>Stock check</strong>
                  <span>{stock} units in current inventory</span>
                </div>

                <time>Now</time>
              </div>
            </div>

            <div
              className={`low-stock-alert ${
                lowStock.length ? "has-low-stock" : ""
              }`}
            >
              <AlertTriangle size={23} />

              <div>
                <strong>
                  {lowStock.length} low-stock product
                  {lowStock.length !== 1 ? "s" : ""}
                </strong>

                <span>Products with 5 or fewer units remaining.</span>

                {lowStock.length > 0 && (
                  <p>{lowStock.map((product) => product.name).join(", ")}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="panel products-panel" id="my-products">
          <div className="products-heading">
            <h3>
              <Package size={22} /> My Products{" "}
              <span>({products.length})</span>
            </h3>

            <button
              type="button"
              className="add-product-button"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? <X size={17} /> : <Plus size={17} />}
              {showForm ? "Cancel" : "Add Product"}
            </button>
          </div>

          {showForm && (
            <form className="add-product-form" onSubmit={addProduct}>
              <label>
                Product name
                <input
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  placeholder="e.g. Fresh Tomato"
                  required
                />
              </label>

              <label>
                Price (₹/kg)
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  placeholder="25"
                  required
                />
              </label>

              <label>
                Quantity (kg)
                <input
                  type="number"
                  min="0"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  placeholder="10"
                  required
                />
              </label>

              <button type="submit" className="add-product-button">
                <Plus size={17} /> Save Product
              </button>
            </form>
          )}

          <div className="table-scroll">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-cell">
                        <div className="product-thumb">
                          <Sprout size={23} />
                        </div>

                        <div>
                          <strong>{product.name}</strong>
                          <span>Fresh &amp; Organic</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      ₹{Number(product.price).toFixed(2)} / {product.unit}
                    </td>

                    <td>
                      {product.quantity} {product.unit}
                    </td>

                    <td>
                      <span
                        className={`stock-badge ${
                          product.quantity <= 5 ? "stock-low" : "stock-good"
                        }`}
                      >
                        {product.quantity <= 5 ? "Low Stock" : "In Stock"}
                      </span>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => removeProduct(product.id)}
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </td>
                  </tr>
                ))}

                {products.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-products">
                      No products yet. Click “Add Product” to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="dashboard-footer">
          <Leaf size={16} /> FreshMart Farmer Portal
          <span>Growing a brighter future</span>
        </footer>
      </main>
    </div>
  );
}
