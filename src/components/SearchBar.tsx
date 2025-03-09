import { useCallback, useEffect, useState } from 'react';
import { useCharacterContext } from '../context/useCharacterContext';
import searchIcon from '../assets/search.svg';
import { fetchCharacters } from '../services/marvelApi';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const context = useCharacterContext();

  const getCharacter = useCallback(async (name: string) => {
    context?.setLoading(true);
    const searchCharacters = await fetchCharacters(name);
    context?.setCharacters(searchCharacters);
    context?.setLoading(false);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getCharacter(search);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="relative w-full flex items-center border-b-2 border-gray-400">
      <img src={searchIcon} alt="Search icon" className="h-6" />
      <input
        type="text"
        placeholder="Search a character..."
        className=" placeholder:text-gray-300 pl-5 pr-4 py-2 w-full text-3xl focus:outline-none uppercase"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
