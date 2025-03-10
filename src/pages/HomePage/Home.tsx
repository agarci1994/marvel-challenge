import { useCallback, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import CharacterList from '../../components/CharacterList/CharacterList';
import { useCharacterContext } from '../../context/useCharacterContext';
import { fetchCharacters } from '../../services/marvelApi';

export default function Home() {
  const context = useCharacterContext();

  const getCharacter = useCallback(async () => {
    context?.setLoading(true);
    const characters = await fetchCharacters();
    context?.setCharacters(characters);
    context?.setLoading(false);
  }, []);

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="container mx-auto px-4 mt-4">
      <SearchBar />
      <CharacterList characters={context?.characters} />
    </div>
  );
}
