import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function UPIPayment({ amount = 100 }) {
  const [scanned, setScanned] = useState(false);

  // Replace this placeholder with your verified merchant UPI ID.
  const merchantUPI = "YOUR_MERCHANT_UPI_ID";
  const merchantName = "Farmer Marketplace";

  const upiLink =
    `upi://pay?pa=${encodeURIComponent(merchantUPI)}` +
    `&pn=${encodeURIComponent(merchantName)}` +
    `&am=${Number(amount).toFixed(2)}&cu=INR`;

  return (
    <div className="upi-payment">
      <h2>Scan & Pay with UPI</h2>
      <p>Amount to pay: ₹{Number(amount).toFixed(2)}</p>

      <div className="upi-qr">
        <QRCodeSVG
          value={upiLink}
          size={220}
          level="H"
          includeMargin
        />
      </div>

      <p>Scan using Google Pay, PhonePe or another UPI app.</p>

      <button
        type="button"
        onClick={() => setScanned(true)}
      >
        I have completed the payment
      </button>

      {scanned && (
        <p>
          Payment verification pending. Your order will be
          confirmed after the server verifies the payment.
        </p>
      )}
    </div>
  );
}