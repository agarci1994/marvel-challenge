import { useContext } from 'react';
import { CharacterContext } from '../../context/CharacterContext';
import logo from '../../assets/logo.svg';
import favoriteIcon from '../../assets/favorite-fill.svg';
import { Link } from 'react-router';

const NavBar = () => {
  const context = useContext(CharacterContext);

  return (
    <nav className="bg-black flex items-center px-10 py-4 justify-between">
      <Link to={'/'}>
        <img src={logo} alt="Logo" className="h-13" />
      </Link>
      <Link to={'/favorites'} className="flex items-center text-white">
        <img src={favoriteIcon} alt="Favorites" className="h-6" />
        <span className="ml-1">{context?.favorites.length}</span>
      </Link>
    </nav>
  );
};

export default NavBar;
