import React, { useState, useEffect } from 'react';
import Gallery from './Components/Gallery';
import './App.css';

const App = () => {
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTour, setSelectedTour] = useState('All');

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.allorigins.win/raw?url=https://course-api.com/react-tours-project');
        if (!response.ok) {
          throw new Error('Failed to fetch tours');
        }
        const data = await response.json();
        setTours(data);
        setFilteredTours(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  const removeTour = (id) => {
    setFilteredTours(filteredTours.filter((tour) => tour.id !== id));
  };

  const handleDropdownChange = (event) => {
    const selected = event.target.value;
    setSelectedTour(selected);

    if (selected === 'All') {
      setFilteredTours(tours);
    } else {
      setFilteredTours(tours.filter((tour) => tour.name === selected));
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (filteredTours.length === 0) {
    return (
      <div>
        <h2>No Tours Left</h2>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Tours</h1>
      <div>
        <label htmlFor="tour-select">Select a Tour: </label>
        <select id="tour-select" value={selectedTour} onChange={handleDropdownChange}>
          <option value="All">All</option>
          {tours.map((tour) => (
            <option key={tour.id} value={tour.name}>
              {tour.name}
            </option>
          ))}
        </select>
      </div>
      <Gallery tours={filteredTours} onRemove={removeTour} />
    </div>
  );
};

export default App;