import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { fetchCharacterDetails, fetchComicDetails } from '../services/marvelApi';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description: string;
  comics: { items: { name: string; resourceURI: string }[] };
}

const CharacterDetails = () => {
  const { id } = useParams();
  const [comics, setComics] = useState<{ title: string; image: string }[]>([]);
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);
  const comicsRef = useRef<HTMLDivElement>(null);

  const getCharacterDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await fetchCharacterDetails(id);
      const comics = await fetchComicDetails(data.comics.collectionURI);

      setComics(
        comics.map((comic: { title: string; thumbnail: { path: string; extension: string } }) => ({
          title: comic.title,
          image: `${comic?.thumbnail?.path}.${comic?.thumbnail.extension}`,
        })),
      );
      setCharacter(data);
    } catch (err) {
      console.error('Error', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getCharacterDetails();
  }, [id, getCharacterDetails]);

  if (loading)
    return (
      <div className="container px-4 mx-auto">
        <p>Loading..</p>
      </div>
    );

  if (!character) return null;

  return (
    <div className="text-white">
      <div className="relative flex items-center bg-black px-8">
        <div className="container px-4 mx-auto md:flex">
          <img
            className="w-80 h-80 object-cover shadow-lg"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="ml-6 flex-1 self-center my-4 md:mt-0">
            <h1 className="text-4xl font-bold">{character.name}</h1>
            <p className="mt-2 text-gray-300">
              {character.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 container px-4 mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-black">COMICS</h2>
        <div
          ref={comicsRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {comics.length > 0 ? (
            comics.map((comic, index) => (
              <div
                key={index}
                data-resourceuri={comic.image}
                className="comic-item flex-shrink-0 w-48 text-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                <img src={comic.image} alt={comic.title} className="w-full" />

                <p className="mt-2 text-sm font-semibold text-black">{comic.title}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comics available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetails;
