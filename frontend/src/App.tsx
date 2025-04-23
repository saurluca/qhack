import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Cooking from './pages/Cooking';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Test from './pages/Test';
import Dashboard3 from './pages/Dashboard3';
import Recipe from './pages/Recipe';

import { onOpenUrl } from '@tauri-apps/plugin-deep-link'
import { useState } from "react";


function App() {
    const [youtubeUrl, setYoutubeUrl] = useState<string>('');
    if (window.__TAURI__) {
        onOpenUrl((urls) => {
            setYoutubeUrl(urls[0]);
            console.log('deep link:', urls)
        })
    }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cooking" element={<Cooking youtubeUrl={youtubeUrl} setYoutubeUrl={setYoutubeUrl}/>} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/test" element={<Test />} />
        <Route path="/dashboard3" element={<Dashboard3 />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
