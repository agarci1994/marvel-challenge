import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { fetchCharacterDetails } from '../services/marvelApi';
import CharacterImage from '../components/CharacterImage';

interface Character {
  id: number;
  name: string;
  thumbnail: { path: string; extension: string };
  description: string;
  comics: { items: { name: string; resourceURI: string }[] };
}

const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);
  const comicsRef = useRef<HTMLDivElement>(null);
  const [visibleComics, setVisibleComics] = useState(new Set<string>());

  const getCharacterDetails = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await fetchCharacterDetails(id);
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

  useEffect(() => {
    if (!comicsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleComics = new Set(visibleComics);
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            newVisibleComics.add(entry.target.getAttribute('data-resourceuri') || '');
          }
        });
        setVisibleComics(newVisibleComics);
      },
      { root: comicsRef.current, rootMargin: '0px', threshold: 0.5 },
    );

    comicsRef.current.querySelectorAll('.comic-item').forEach((comic) => {
      observer.observe(comic);
    });

    return () => observer.disconnect();
  }, [character]);

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
        <div className="container px-4 mx-auto flex">
          <img
            className="w-80 h-80 object-cover shadow-lg"
            src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
            alt={character.name}
          />
          <div className="ml-6 flex-1 self-center">
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
          {character.comics.items.length > 0 ? (
            character.comics.items.map((comic, index) => (
              <div
                key={index}
                data-resourceuri={comic.resourceURI}
                className="comic-item flex-shrink-0 w-48 text-center"
                style={{ scrollSnapAlign: 'center' }}
              >
                {visibleComics.has(comic.resourceURI) && (
                  <CharacterImage resourceURI={comic.resourceURI} />
                )}
                <p className="mt-2 text-sm font-semibold text-black">{comic.name}</p>
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
