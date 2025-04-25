import React, { useState, useEffect } from 'react';
import Gallery from './Components/Gallery';  // Import Gallery component
import './App.css'; // Make sure to import App.css for general styling

const App = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    setTours(tours.filter((tour) => tour.id !== id));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error: {error}</h2>;
  }

  if (tours.length === 0) {
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
      {/* Render the Gallery component and pass tours and removeTour as props */}
      <Gallery tours={tours} onRemove={removeTour} />
    </div>
  );
};

export default App;
// This is the main App component that fetches data and manages state