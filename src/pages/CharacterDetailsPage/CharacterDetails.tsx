import { useCallback, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { fetchCharacterDetails, fetchComicDetails } from '../../services/marvelApi';
import CharacterHeader from '../../components/CharacterHeader/CharacterHeader';
import ComicsList from '../../components/ComicsList/ComicsList';

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
      <CharacterHeader character={character} />
      <ComicsList comics={comics} comicsRef={comicsRef} />
    </div>
  );
};

export default CharacterDetails;
