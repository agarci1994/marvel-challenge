import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Home from './Home';
import { useCharacterContext } from '../../context/useCharacterContext';
import { fetchCharacters } from '../../services/marvelApi';

vi.mock('../context/useCharacterContext', () => ({
  useCharacterContext: vi.fn(),
}));

vi.mock('../services/marvelApi', () => ({
  fetchCharacters: vi.fn(() => Promise.resolve([{ id: 1, name: 'Spider-Man' }])),
}));

describe('Home Page', () => {
  it('should render SearchBar and CharacterList', () => {
    useCharacterContext.mockReturnValue({
      characters: [],
      setCharacters: vi.fn(),
      loading: false,
      setLoading: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    // expect(screen.getByTestId('character-list')).toBeInTheDocument(); // CharacterList
  });

  it('should fetch characters on mount', async () => {
    const mockCharacters = [{ id: 1, name: 'Spider-Man' }];
    vi.mocked(fetchCharacters).mockResolvedValue(mockCharacters);

    const setCharacters = vi.fn();
    const setLoading = vi.fn();

    useCharacterContext.mockReturnValue({
      characters: [],
      setCharacters,
      loading: false,
      setLoading,
    });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );

    await waitFor(() => expect(fetchCharacters).toHaveBeenCalled());
    await waitFor(() => expect(setCharacters).toHaveBeenCalledWith(mockCharacters));
  });
});
