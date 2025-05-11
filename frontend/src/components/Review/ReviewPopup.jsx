import React, { useState } from "react";
import "./ReviewPopup.css";
import rating from "../../assets/images/rating.png";

const ReviewPopup = ({ onClose, product, onSubmit }) => {
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    onSubmit(review);
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-section">
          <h1>Add a Review</h1>
          <p>Add Your Rating</p>
          <img src={rating} alt="" />
          <p>Write Your Review</p>
          <textarea
            placeholder="Write here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
