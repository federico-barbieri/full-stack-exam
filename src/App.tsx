import './App.css';
import Grid from "./components/Grid";
import CardDetail from "./components/CardDetail";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Define the shape of a Painting object
interface Painting {
  id: number;
  title: string;
  artist: string;
  acquisition_date: string;
  image_url: string;
  thumbnail_url: string;
  iiif_manifest: string;
  object_url: string;
}

function App() {
  const [paintings, setPaintings] = useState<Painting[]>([]); // State to store paintings with type definition

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/paintings'); // Adjust the URL to your backend
        if (!response.ok) {
          throw new Error('Failed to fetch paintings');
        }
        const data: Painting[] = await response.json(); // Parse the JSON response with type assertion
        setPaintings(data); // Set the fetched paintings in state
        console.log('Fetched paintings:', data); // Log the fetched paintings
      } catch (error) {
        console.error('Error fetching paintings:', error); // Log any error that occurs
      }
    };

    fetchPaintings(); // Call the function to fetch paintings
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          {/* <Route path="/" element={<Grid />} />
            <Route path="/art/:id" element={<CardDetail />} /> */}
        </Routes>

        {/* Render the list of paintings */}
        <div className="paintings-list">
          {paintings.length > 0 ? (
            paintings.map((painting) => (
              <div key={painting.id} className="painting-card">
                <img src={painting.image_url} alt={painting.title} />
                <h2>{painting.title}</h2>
                <p>By {painting.artist}</p>
              </div>
            ))
          ) : (
            <p>No paintings available</p>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;