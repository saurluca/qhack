import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from "react";

// Tauri plugins 
import { onOpenUrl } from '@tauri-apps/plugin-deep-link';
import { isTauri } from "@tauri-apps/api/core"

// Pages
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Cooking from './pages/Cooking';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Test from './pages/Test';
import Dashboard3 from './pages/Dashboard3';
import Recipe from './pages/Recipe';

// Add Tauri global type
// declare global {
//   interface Window {
//     __TAURI__?: {
//       // Add any specific Tauri properties if needed
//     }
//   }
// }

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState<string>('');
  if (isTauri()) {
    onOpenUrl((urls: string[]) => {
      console.log('deep link:', urls)
      setYoutubeUrl(urls[0]);
    })
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cooking" element={<Cooking youtubeUrl={youtubeUrl} setYoutubeUrl={setYoutubeUrl} />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/recipe" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
