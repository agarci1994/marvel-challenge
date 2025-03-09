import { useState, useEffect, useMemo } from 'react';
import CharacterList from '../components/CharacterList';
import SearchBar from '../components/SearchBar';
import { useCharacterContext } from '../context/useCharacterContext';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

const Favorites = () => {
  const context = useCharacterContext();
  const [favorites, setFavorites] = useState<Character[]>([]);

  const favoriteFilter = useMemo(() => {
    if (!context) return;
    return favorites.filter((character) =>
      character.name.toLowerCase().includes(context.search.toLowerCase()),
    );
  }, [favorites, context]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="uppercase font-bold mt-4 text-2xl">favorites</h1>
      <SearchBar />
      {favorites.length === 0 ? (
        <p>You don't have any favorite characters yet.</p>
      ) : (
        <CharacterList characters={favoriteFilter} />
      )}
    </div>
  );
};

export default Favorites;
