import { getCachedData } from './marvelApi';

describe('Marvel API Service', () => {
  beforeEach(() => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'marvelCharactersCache') {
        return JSON.stringify([{ name: 'Spider-Man' }]);
      }
      if (key === 'marvelCharactersCache_timestamp') {
        return (Date.now() - 1000).toString();
      }
      return null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return cached data if it is still valid', () => {
    jest.mock('./marvelApi.ts', () => ({
      API_URL: 'https://fake-marvel-api.com',
      API_KEY: 'fake-api-key',
    }));
    const data = getCachedData('marvelCharactersCache');
    expect(data).toEqual([{ name: 'Spider-Man' }]);
  });

  test('should return null if cached data is expired', () => {
    jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'marvelCharactersCache_timestamp') {
        return (Date.now() - 25 * 60 * 60 * 1000).toString();
      }
      return null;
    });
    const data = getCachedData('marvelCharactersCache');
    expect(data).toBeNull();
  });
});
