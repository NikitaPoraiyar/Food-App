import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Dashboard from './pages/dashboard.jsx';
import TableManagement from './pages/tableManagement.jsx';
import OrderLine from './pages/orderline.jsx';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/tablemanagement' element={<TableManagement />} />
          <Route path='/orderline' element={<OrderLine />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
