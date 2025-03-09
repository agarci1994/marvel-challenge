import { useCharacterContext } from '../context/useCharacterContext';
import favoriteFill from '../assets/favorite-fill.svg';
import favoriteNotFill from '../assets/favorite-not-fill.svg';

export default function CharacterList() {
  const context = useCharacterContext();

  return (
    <div className="container mx-auto px-4">
      {context?.loading ? (
        <p className="text-center text-lg font-semibold mt-4">Loading characters...</p>
      ) : (
        <div>
          <p className="uppercase my-4 text-gray-700 text-sm">
            {context?.characters.length} results
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {context?.characters.map((character) => (
              <div key={character.id} className="bg-gray-900 overflow-hidden ">
                <img
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  className="w-full aspect-[2/3] object-cover border-b-4 border-red-500"
                />
                <div className="relative bg-black flex justify-between items-center h-24 px-4 py-2 clip-corner">
                  <h3 className="text-sm text-white truncate w-3/4">{character.name}</h3>
                  <button onClick={() => context.toggleFavorite(character)}>
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
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
