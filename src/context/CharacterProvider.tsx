import { useEffect, useState } from 'react';

import { CharacterContext } from './CharacterContext';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

export function CharacterProvider({ children }: { children: React.ReactNode }) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [favorites, setFavorites] = useState<Character[]>(
    JSON.parse(localStorage.getItem('favorites') || '[]'),
  );
  const [loading, setLoading] = useState<boolean>(false);

  // const getCharacter = useCallback(async (name?: string) => {
  //   setLoading(true);
  //   const characters = await fetchCharacters(name);
  //   console.log('callback', characters);
  //   setCharacters(characters);
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (character: Character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== character.id)
      : [...favorites, character];

    setFavorites(updatedFavorites);
  };

  return (
    <CharacterContext.Provider
      value={{ characters, favorites, loading, setLoading, setCharacters, toggleFavorite }}
    >
      {children}
    </CharacterContext.Provider>
  );
}
