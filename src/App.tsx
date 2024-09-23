import './App.css'
import Grid from "./components/Grid";
import CardDetail from "./components/CardDetail";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>
     
      <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/art/:id" element={<CardDetail />} />  {/* Dynamic route for card details */}
      </Routes>
    </Router>
      
    </>
  )
}

export default App
