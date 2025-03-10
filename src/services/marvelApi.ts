const API_URL = import.meta.env.VITE_MARVEL_API_URL;
const API_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

const CACHE_KEY = 'marvelCharactersCache';
const SEARCH_CACHE_KEY = 'marvelSearchCache';
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

const getCachedData = (key: string) => {
  const cachedData = localStorage.getItem(key);
  const cacheTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (cachedData && cacheTimestamp) {
    const now = Date.now();
    if (now - parseInt(cacheTimestamp, 10) < CACHE_EXPIRATION) {
      return JSON.parse(cachedData);
    }
  }
  return null;
};

const savedCachedData = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, Date.now().toString());
};

export async function fetchCharacters(name?: string) {
  const cacheKey = name ? `${SEARCH_CACHE_KEY}_${name.toLowerCase()}` : CACHE_KEY;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const params = new URLSearchParams({
      apikey: API_KEY,
      limit: '50',
    });

    if (name) {
      params.append('nameStartsWith', name);
    }

    const response = await fetch(`${API_URL}/characters?${params.toString()}`);

    clearTimeout(timeoutId);

    const data = await response.json();

    savedCachedData(cacheKey, data.data.results);

    return data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}

export async function fetchCharacterDetails(id: string) {
  try {
    const url = `${API_URL}/characters/${id}?apikey=${API_KEY}`;
    const response = await fetch(url);

    const data = await response.json();
    return data.data.results[0];
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}

export const fetchCharacterImage = async (resourceURI: string) => {
  try {
    const response = await fetch(`${resourceURI}?apikey=${API_KEY}`);

    const data = await response.json();
    if (data?.data?.results?.length > 0) {
      const thumbnail = data.data.results[0].thumbnail;
      return `${thumbnail.path}.${thumbnail.extension}`;
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const fetchComicDetails = async (comicURI: string) => {
  try {
    const response = await fetch(comicURI + `?apikey=${API_KEY}&orderBy=onsaleDate&limit=20`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching comic details:', error);
    return null;
  }
};
