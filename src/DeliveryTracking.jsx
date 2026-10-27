
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./DeliveryTracking.css";

const farmer = [11.399, 79.692];
const customer = [11.410, 79.720];

// Demo route points. Replace with actual routing coordinates later.
const route = [
  farmer,
  [11.401, 79.697],
  [11.404, 79.702],
  [11.406, 79.709],
  [11.408, 79.714],
  customer,
];

const farmerIcon = L.divIcon({
  className: "tracking-pin",
  html: '<div class="farmer-pin">🌾</div>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const customerIcon = L.divIcon({
  className: "tracking-pin",
  html: '<div class="customer-pin">🏠</div>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
});

const bikeIcon = L.divIcon({
  className: "tracking-pin",
  html: '<div class="bike-pin">🛵</div>',
  iconSize: [46, 46],
  iconAnchor: [23, 23],
});

function FitRoute() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(route, { padding: [45, 45] });
  }, [map]);

  return null;
}

export default function DeliveryTracking() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((current) => (current >= route.length - 1 ? 0 : current + 1));
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const delivered = step === route.length - 1;
  const eta = (route.length - 1 - step) * 4;

  return (
    <section className="delivery-tracking">
      <div className="tracking-heading">
        <span className="tracking-eyebrow">FRESHMART DELIVERY</span>
        <h2>Track Your Order 🚚</h2>
        <p>Your fresh produce is on its way!</p>
      </div>

      <div className="tracking-info">
        <div>
          <span className="tracking-label">Estimated arrival</span>
          <strong>{delivered ? "Delivered!" : `About ${eta} minutes`}</strong>
        </div>
        <span className={`tracking-status ${delivered ? "completed" : ""}`}>
          {delivered ? "✓ Delivered" : "● On the way"}
        </span>
      </div>

      <div className="tracking-map">
        <MapContainer
          center={farmer}
          zoom={14}
          scrollWheelZoom
          className="tracking-leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitRoute />

          <Polyline
            positions={route}
            pathOptions={{
              color: "#b8d7a8",
              weight: 7,
              lineCap: "round",
            }}
          />

          <Polyline
            positions={route.slice(0, step + 1)}
            pathOptions={{
              color: "#328344",
              weight: 5,
              lineCap: "round",
            }}
          />

          <Marker position={farmer} icon={farmerIcon}>
            <Popup>Farmer location 🌾</Popup>
          </Marker>

          <Marker position={customer} icon={customerIcon}>
            <Popup>Customer destination 🏠</Popup>
          </Marker>

          <Marker position={route[step]} icon={bikeIcon}>
            <Popup>Delivery rider 🛵</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="tracking-timeline">
        <div className="timeline-item done">
          <span>✓</span>
          <div><strong>Order confirmed</strong><p>Your order has been received</p></div>
        </div>
        <div className="timeline-item done">
          <span>✓</span>
          <div><strong>Packed by farmer</strong><p>Fresh produce is ready</p></div>
        </div>
        <div className={`timeline-item ${step > 0 ? "done" : "active"}`}>
          <span>{step > 0 ? "✓" : "3"}</span>
          <div><strong>Out for delivery</strong><p>Watch the demo bike move on the map</p></div>
        </div>
        <div className={`timeline-item ${delivered ? "done" : ""}`}>
          <span>{delivered ? "✓" : "4"}</span>
          <div><strong>Delivered</strong><p>Freshness at your doorstep</p></div>
        </div>
      </div>

      <p className="tracking-demo-note">
        Demo mode: bike position and ETA are simulated, not actual GPS tracking.
      </p>
    </section>
  );
}
