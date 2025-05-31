import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import LandingApp from './pages/landingApp.jsx';
import Cartpage from './pages/Cartpage.jsx';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<LandingApp />} />
          <Route path='/cart' element={<Cartpage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
