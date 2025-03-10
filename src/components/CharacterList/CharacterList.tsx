import { useCharacterContext } from '../../context/useCharacterContext';

import CharacterCard from '../CharacterCard';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

export default function CharacterList({ characters }: { characters: Character[] | undefined }) {
  const context = useCharacterContext();

  return (
    <div className="container mx-auto px-4">
      {context?.loading ? (
        <p className="text-center text-lg font-semibold mt-4">Loading characters...</p>
      ) : (
        <div>
          <p className="uppercase my-4 text-gray-700 text-sm">{characters?.length} results</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {characters?.map((character) => (
              <CharacterCard character={character} key={character.name} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
