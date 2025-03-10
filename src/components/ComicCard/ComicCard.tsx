interface ComicsListProps {
  comic: { title: string; image: string };
  index: number;
}

const ComicCard = ({ comic, index }: ComicsListProps) => (
  <div
    key={index}
    data-resourceuri={comic.image}
    className="comic-item flex-shrink-0 w-48 text-center"
    style={{ scrollSnapAlign: 'center' }}
  >
    <img src={comic.image} alt={comic.title} className="w-full" />
    <p className="mt-2 text-sm font-semibold text-black">{comic.title}</p>
  </div>
);

export default ComicCard;
