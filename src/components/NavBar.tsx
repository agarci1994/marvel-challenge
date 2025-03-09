import { useContext } from 'react';
import { CharacterContext } from '../context/CharacterContext';
import logo from '../assets/logo.svg';
import favoriteIcon from '../assets/favorite-fill.svg';

export const NavBar = () => {
  const context = useContext(CharacterContext);

  return (
    <nav className="bg-black flex items-center px-10 py-4 justify-between">
      <img src={logo} alt="Logo" className="h-13" />
      <div className="flex items-center text-white">
        <img src={favoriteIcon} alt="Favorites" className="h-6" />
        <span className="ml-1">{context?.favorites.length}</span>
      </div>
    </nav>
  );
};
