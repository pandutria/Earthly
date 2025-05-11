import React, { useState } from 'react';
import "./ReviewPopup.css";

const ReviewPopup = ({ onClose, product, onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = () => {
    onSubmit(review);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Review Produk</h2> {/* Karena product adalah ID, kita tidak bisa tampilkan nama */}
        <textarea
          placeholder="Tulis review kamu di sini..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <div className="popup-buttons">
          <button onClick={onClose}>Batal</button>
          <button onClick={handleSubmit}>Kirim</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
