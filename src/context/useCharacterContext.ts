import { useContext } from 'react';
import { CharacterContext } from './CharacterContext';

export function useCharacterContext() {
  const context = useContext(CharacterContext);
  return context;
}
