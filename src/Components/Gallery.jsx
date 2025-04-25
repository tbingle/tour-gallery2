import React from 'react';
import TourCard from './TourCard'; // Make sure TourCard is correctly imported

const Gallery = ({ tours, onRemove }) => {
  return (
    <div className="tour-list">
      {tours.map((tour) => (
        <TourCard
          key={tour.id}
          id={tour.id}
          name={tour.name}
          info={tour.info}
          image={tour.image}
          price={tour.price}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default Gallery;
