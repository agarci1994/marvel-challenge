interface CharacterHeaderProps {
  character: {
    name: string;
    thumbnail: { path: string; extension: string };
    description: string;
  };
}

const CharacterHeader = ({ character }: CharacterHeaderProps) => (
  <div className="relative flex items-center bg-black px-8">
    <div className="container px-4 mx-auto md:flex">
      <img
        className="w-80 h-80 object-cover shadow-lg"
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <div className="ml-6 flex-1 self-center my-4 md:mt-0">
        <h1 className="text-4xl font-bold">{character.name}</h1>
        <p className="mt-2 text-gray-300">{character.description || 'No description available.'}</p>
      </div>
    </div>
  </div>
);

export default CharacterHeader;
