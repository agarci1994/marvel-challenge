// @ts-nocheck
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router';
import CharacterDetails from './CharacterDetails';
import { fetchCharacterDetails, fetchComicDetails } from '../../services/marvelApi';

vi.mock('../../services/marvelApi', () => ({
  fetchCharacterDetails: vi.fn(),
  fetchComicDetails: vi.fn(),
}));

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('CharacterDetails Page', () => {
  it('should display loading state initially', () => {
    useParams.mockReturnValue({ id: '1001' });
    fetchCharacterDetails.mockResolvedValueOnce(null);
    fetchComicDetails.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('should fetch and display character details', async () => {
    useParams.mockReturnValue({ id: '1001' });

    const mockCharacter = {
      id: 1001,
      name: 'Iron Man',
      description: 'Genius billionaire',
      thumbnail: { path: 'https://example.com/image', extension: 'jpg' },
      comics: { collectionURI: 'https://api.example.com/comics' },
    };

    const mockComics = [
      { title: 'Iron Man #1', thumbnail: { path: 'https://example.com/comic1', extension: 'jpg' } },
      { title: 'Iron Man #2', thumbnail: { path: 'https://example.com/comic2', extension: 'jpg' } },
    ];

    fetchCharacterDetails.mockResolvedValueOnce(mockCharacter);
    fetchComicDetails.mockResolvedValueOnce(mockComics);

    render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>,
    );

    await waitFor(() => expect(fetchCharacterDetails).toHaveBeenCalledWith('1001'));
    await waitFor(() =>
      expect(fetchComicDetails).toHaveBeenCalledWith(mockCharacter.comics.collectionURI),
    );

    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('Genius billionaire')).toBeInTheDocument();
    expect(screen.getByAltText('Iron Man')).toBeInTheDocument(); // Asumiendo que `CharacterHeader` muestra la imagen
  });

  it('should return null if no character is found', async () => {
    useParams.mockReturnValue({ id: '1001' });

    fetchCharacterDetails.mockResolvedValueOnce(null);
    fetchComicDetails.mockResolvedValueOnce([]);

    const { container } = render(
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>,
    );

    await waitFor(() => expect(fetchCharacterDetails).toHaveBeenCalledWith('1001'));

    expect(container.firstChild).toBeNull();
  });
});
