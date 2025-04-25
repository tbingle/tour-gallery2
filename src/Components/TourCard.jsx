import React, { useState } from "react";
import "./TourCard.css"; // Make sure this file exists and contains styles

const TourCard = ({ id, name, info, image, price, onRemove }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="tour-card">
      <img src={image} alt={name} className="tour-image" />
      <div className="tour-details">
        <h2 className="tour-name">{name}</h2>
        <p className="tour-price">${price}</p>
        
        <p className="tour-info">
          {readMore ? info : `${info.substring(0, 100)}...`}
        </p>
        <button
          className="read-more-btn"
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? "Show Less" : "Read More"}
        </button>

        <button className="remove-btn" onClick={() => onRemove(id)}>
          Not Interested
        </button>
      </div>
    </div>
  );
};

export default TourCard;
