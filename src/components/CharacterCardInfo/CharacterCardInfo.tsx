import { useCharacterContext } from '../../context/useCharacterContext';
import favoriteFill from '../../assets/favorite-fill.svg';
import favoriteNotFill from '../../assets/favorite-not-fill.svg';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
}

export default function CharacterCardInfo({ character }: { character: Character }) {
  const context = useCharacterContext();

  return (
    <div className="relative bg-black flex justify-between items-center h-24 px-4 py-2 clip-corner">
      <h3 className="text-sm text-white truncate w-3/4">{character.name}</h3>
      <button
        onClick={(event) => {
          event.stopPropagation();
          context?.toggleFavorite(character);
        }}
      >
        <img
          src={
            context?.favorites.some((fav) => fav.id === character.id)
              ? favoriteFill
              : favoriteNotFill
          }
          className="w-6 h-6"
          alt="Favorite"
        />
      </button>
      <div className="absolute top-22 right-0 w-6 h-6 bg-white rotate-45 origin-bottom-right"></div>
    </div>
  );
}
