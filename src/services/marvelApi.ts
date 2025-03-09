const API_URL = import.meta.env.VITE_MARVEL_API_URL;
const API_KEY = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

export async function fetchCharacters(name?: string) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    limit: '50',
  });

  if (name) {
    params.append('nameStartsWith', name);
  }

  try {
    const response = await fetch(`${API_URL}/characters?${params.toString()}`);
    const data = await response.json();
    return data.data.results;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
}
