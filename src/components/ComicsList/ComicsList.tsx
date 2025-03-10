import { RefObject } from 'react';
import ComicCard from '../ComicCard';

interface ComicsListProps {
  comics: { title: string; image: string }[];
  comicsRef: RefObject<HTMLDivElement | null>;
}

const ComicsList = ({ comics, comicsRef }: ComicsListProps) => (
  <div className="mt-10 container px-4 mx-auto">
    <h2 className="text-2xl font-bold mb-4 text-black">COMICS</h2>
    <div
      ref={comicsRef}
      className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-2"
      style={{ scrollSnapType: 'x mandatory' }}
    >
      {comics.length > 0 ? (
        comics.map((comic, index) => <ComicCard comic={comic} index={index} key={comic.title} />)
      ) : (
        <p className="text-center text-gray-500">No comics available.</p>
      )}
    </div>
  </div>
);

export default ComicsList;
