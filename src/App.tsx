import { CharacterProvider } from './context/CharacterProvider';
import NavBar from './components/NavBar/NavBar';
import Home from './pages/HomePage/Home';
import { BrowserRouter, Routes, Route } from 'react-router';
import Favorites from './pages/FavoritesPage/Favorites';
import CharacterDetails from './pages/CharacterDetailsPage/CharacterDetails';

export default function App() {
  return (
    <BrowserRouter>
      <CharacterProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
      </CharacterProvider>
    </BrowserRouter>
  );
}
