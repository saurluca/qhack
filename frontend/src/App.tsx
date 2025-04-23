import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Cooking from './pages/Cooking';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cooking" element={<Cooking />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
