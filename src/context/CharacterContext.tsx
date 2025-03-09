import { createContext, Dispatch, SetStateAction } from 'react';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

interface CharacterContextType {
  characters: Character[];
  favorites: Character[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCharacters: Dispatch<SetStateAction<Character[]>>;
  toggleFavorite: (character: Character) => void;
}

export const CharacterContext = createContext<CharacterContextType | undefined>(undefined);
