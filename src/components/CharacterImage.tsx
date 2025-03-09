import { useState, useEffect, useCallback } from 'react';
import { fetchCharacterImage } from '../services/marvelApi';

const CharacterImage = ({ resourceURI }: { resourceURI: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const getImage = useCallback(async () => {
    const image = await fetchCharacterImage(resourceURI);
    if (image) {
      setImageUrl(image);
    }
  }, [resourceURI]);

  useEffect(() => {
    getImage();
  }, [resourceURI, getImage]);

  if (!imageUrl) return;

  return <img src={imageUrl} alt="Character" className="w-full" />;
};

export default CharacterImage;
