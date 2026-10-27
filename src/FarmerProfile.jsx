
import { useNavigate } from "react-router-dom";
import "./FarmerProfile.css";

export default function FarmerProfile() {
  const navigate = useNavigate();

  return (
    <div className="farmer-profile-page">
      <div className="profile-card">
        <div className="profile-avatar">F</div>

        <h1>Farmer Profile</h1>
        <p className="profile-subtitle">
          Manage your farmer account
        </p>

        <div className="profile-details">
          <div>
            <span>Full Name</span>
            <strong>Farmer</strong>
          </div>
          <div>
            <span>Account Type</span>
            <strong>Farmer Account</strong>
          </div>
          <div>
            <span>Account Status</span>
            <strong className="active-status">Active</strong>
          </div>
        </div>

        <button
          className="profile-back-button"
          onClick={() => navigate("/farmer-dashboard")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
