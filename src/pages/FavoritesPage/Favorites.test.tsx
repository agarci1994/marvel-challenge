import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Favorites from './Favorites';
import { useCharacterContext } from '../../context/useCharacterContext';
import { MemoryRouter } from 'react-router';

vi.mock('../../context/useCharacterContext', () => ({
  useCharacterContext: vi.fn(),
}));

describe('Favorites Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Displays message when no favorite characters exist', () => {
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    expect(screen.getByText("You don't have any favorite characters yet.")).toBeInTheDocument();
  });

  test('Renders the list of favorite characters if stored in localStorage', async () => {
    const mockFavorites = [
      { id: 1, name: 'Spider-Man', thumbnail: { path: 'spidey', extension: 'jpg' } },
      { id: 2, name: 'Iron Man', thumbnail: { path: 'ironman', extension: 'jpg' } },
    ];

    localStorage.setItem('favorites', JSON.stringify(mockFavorites));

    useCharacterContext.mockReturnValue({
      search: '',
      favorites: mockFavorites,
    });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    expect(await screen.findByText('Spider-Man')).toBeInTheDocument();
    expect(await screen.findByText('Iron Man')).toBeInTheDocument();
  });

  test('Filters favorite characters based on search context', () => {
    const mockFavorites = [
      { id: 1, name: 'Spider-Man', thumbnail: { path: 'spidey', extension: 'jpg' } },
      { id: 2, name: 'Iron Man', thumbnail: { path: 'ironman', extension: 'jpg' } },
    ];

    localStorage.setItem('favorites', JSON.stringify(mockFavorites));

    useCharacterContext.mockReturnValue({
      search: 'Iron',
      favorites: mockFavorites,
    });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.queryByText('Spider-Man')).not.toBeInTheDocument();
  });
});
