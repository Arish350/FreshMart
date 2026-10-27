
import { useState } from "react";
import {
  Settings as SettingsIcon,
  UserRound,
  Bell,
  LockKeyhole,
  Leaf,
  Save,
  ArrowLeft,
} from "lucide-react";
import "./Settings.css";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: "Farmer",
    email: "",
    phone: "",
    farmName: "",
    location: "",
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    stock: true,
    offers: false,
  });

  const [password, setPassword] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  function handleSave(e) {
    e.preventDefault();

    if (
      activeTab === "password" &&
      password.next !== password.confirm
    ) {
      alert("New password and confirm password do not match.");
      return;
    }

    if (activeTab === "password" && !password.current) {
      alert("Please enter your current password.");
      return;
    }

    // UI demo only: connect backend to persist settings securely.
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="settings-page">
      <header className="settings-header">
        <div className="settings-title">
          <SettingsIcon size={30} />
          <div>
            <h1>Settings</h1>
            <p>Manage your farmer account and preferences.</p>
          </div>
        </div>

        <button
          className="settings-back"
          onClick={() => (window.location.href = "/farmer-dashboard")}
        >
          <ArrowLeft size={17} /> Dashboard
        </button>
      </header>

      <div className="settings-layout">
        <aside className="settings-menu">
          <h3>Account Settings</h3>

          <button
            className={activeTab === "profile" ? "chosen" : ""}
            onClick={() => setActiveTab("profile")}
          >
            <UserRound size={19} /> Profile Settings
          </button>

          <button
            className={activeTab === "notifications" ? "chosen" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell size={19} /> Notifications
          </button>

          <button
            className={activeTab === "password" ? "chosen" : ""}
            onClick={() => setActiveTab("password")}
          >
            <LockKeyhole size={19} /> Change Password
          </button>
        </aside>

        <main className="settings-content">
          {activeTab === "profile" && (
            <form onSubmit={handleSave}>
              <div className="settings-section-title">
                <UserRound size={23} />
                <div>
                  <h2>Profile Settings</h2>
                  <p>Update your personal and farm information.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label>
                  Full Name
                  <input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Email Address
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    placeholder="farmer@example.com"
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                  />
                </label>

                <label>
                  Farm Name
                  <input
                    value={profile.farmName}
                    onChange={(e) =>
                      setProfile({ ...profile, farmName: e.target.value })
                    }
                    placeholder="Enter your farm name"
                  />
                </label>

                <label className="settings-full-width">
                  Farm Location
                  <input
                    value={profile.location}
                    onChange={(e) =>
                      setProfile({ ...profile, location: e.target.value })
                    }
                    placeholder="Village, district"
                  />
                </label>
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleSave}>
              <div className="settings-section-title">
                <Bell size={23} />
                <div>
                  <h2>Notification Settings</h2>
                  <p>Choose which updates you want to receive.</p>
                </div>
              </div>

              <div className="notification-options">
                <SettingToggle
                  title="New Orders"
                  description="Get notified when a customer places an order."
                  checked={notifications.orders}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, orders: checked })
                  }
                />

                <SettingToggle
                  title="Low Stock Alerts"
                  description="Get notified when a product has low stock."
                  checked={notifications.stock}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, stock: checked })
                  }
                />

                <SettingToggle
                  title="Offers and Updates"
                  description="Receive marketplace announcements and offers."
                  checked={notifications.offers}
                  onChange={(checked) =>
                    setNotifications({ ...notifications, offers: checked })
                  }
                />
              </div>

              <SaveButton saved={saved} />
            </form>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleSave}>
              <div className="settings-section-title">
                <LockKeyhole size={23} />
                <div>
                  <h2>Change Password</h2>
                  <p>Keep your account secure.</p>
                </div>
              </div>

              <div className="password-fields">
                <label>
                  Current Password
                  <input
                    type="password"
                    value={password.current}
                    onChange={(e) =>
                      setPassword({ ...password, current: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  New Password
                  <input
                    type="password"
                    minLength={8}
                    value={password.next}
                    onChange={(e) =>
                      setPassword({ ...password, next: e.target.value })
                    }
                    required
                  />
                </label>

                <label>
                  Confirm New Password
                  <input
                    type="password"
                    minLength={8}
                    value={password.confirm}
                    onChange={(e) =>
                      setPassword({ ...password, confirm: e.target.value })
                    }
                    required
                  />
                </label>
              </div>

              <p className="password-note">
                Password changes require secure backend authentication.
              </p>
              <SaveButton saved={saved} label="Update Password" />
            </form>
          )}

          <div className="settings-tip">
            <Leaf size={20} />
            <span>Your farm, your preferences. Keep your information up to date.</span>
          </div>
        </main>
      </div>
    </div>
  );
}

function SaveButton({ saved, label = "Save Changes" }) {
  return (
    <div className="settings-save-row">
      <button type="submit" className="settings-save">
        <Save size={17} /> {saved ? "Saved (demo)" : label}
      </button>
    </div>
  );
}

function SettingToggle({ title, description, checked, onChange }) {
  return (
    <div className="setting-toggle-row">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`toggle-switch ${checked ? "toggle-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}
