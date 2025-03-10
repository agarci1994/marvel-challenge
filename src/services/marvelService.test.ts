import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCharacters, getCachedData, savedCachedData } from './marvelApi';

const mockCharacterData = { data: { results: [{ id: 1, name: 'Spider-Man' }] } };
const CACHE_KEY = 'marvelCharactersCache';
const SEARCH_CACHE_KEY = 'marvelSearchCache';

describe('marvelApi Service', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('should return cached data if available', async () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockCharacterData.data.results));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

    const data = await fetchCharacters();
    expect(data).toEqual(mockCharacterData.data.results);
  });

  it('should fetch data from API if cache is expired or unavailable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ json: () => Promise.resolve(mockCharacterData) })),
    );

    const data = await fetchCharacters();
    expect(data).toEqual(mockCharacterData.data.results);
    expect(fetch).toHaveBeenCalled();
  });

  it('should handle API errors gracefully', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('API Error'))),
    );

    try {
      await fetchCharacters();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it('should return null if cache data is expired', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockCharacterData.data));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, (Date.now() - 25 * 60 * 60 * 1000).toString());

    const data = getCachedData(CACHE_KEY);
    expect(data).toBeNull();
  });

  it('should return cached data if valid', () => {
    localStorage.setItem(CACHE_KEY, JSON.stringify(mockCharacterData.data));
    localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());

    const data = getCachedData(CACHE_KEY);
    expect(data).toEqual(mockCharacterData.data);
  });

  it('should save data correctly in localStorage', () => {
    savedCachedData(CACHE_KEY, mockCharacterData.data);
    const data = localStorage.getItem(CACHE_KEY);
    if (!data) return;
    const storedData = JSON.parse(data);
    expect(storedData).toEqual(mockCharacterData.data);
  });

  it('should generate correct cache key for searches', async () => {
    const searchKey = `${SEARCH_CACHE_KEY}_spider-man`;
    savedCachedData(searchKey, mockCharacterData.data);

    const data = getCachedData(searchKey);
    expect(data).toEqual(mockCharacterData.data);
  });
});
