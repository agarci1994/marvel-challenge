import { useNavigate } from 'react-router';
import CharacterCardInfo from '../CharacterCardInfo';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

export default function CharacterCard({ character }: { character: Character }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/character/${character.id}`)}
      key={character.id}
      className="bg-gray-900 overflow-hidden "
    >
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
        className="w-full aspect-[2/3] object-cover border-b-4 border-red-500"
      />
      <CharacterCardInfo character={character} />
    </div>
  );
}
