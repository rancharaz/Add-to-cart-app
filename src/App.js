import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Pages/Home';
import Card from './Components/Pages/Card';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/card" element={<Card />} />

      </Routes>
    </Router>
  );
}

export default App;
