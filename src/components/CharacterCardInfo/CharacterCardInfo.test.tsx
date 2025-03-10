// @ts-nocheck
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCardInfo from '../CharacterCardInfo';
import { useCharacterContext } from '../../context/useCharacterContext';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/useCharacterContext', () => ({
  useCharacterContext: vi.fn(),
}));

describe('CharacterCardInfo Component', () => {
  const character = {
    id: 1,
    name: 'Hulk',
    thumbnail: { path: 'https://example.com/hulk', extension: 'png' },
  };

  it('renders the character name', () => {
    useCharacterContext.mockReturnValue({ favorites: [] });

    render(<CharacterCardInfo character={character} />);
    expect(screen.getByText('Hulk')).toBeInTheDocument();
  });

  it('displays the favorite icon correctly', () => {
    useCharacterContext.mockReturnValue({
      favorites: [{ id: 1 }],
    });

    render(<CharacterCardInfo character={character} />);
    expect(screen.getByAltText('Favorite')).toBeInTheDocument();
  });

  it('calls toggleFavorite function on button click', () => {
    const toggleFavorite = vi.fn();
    useCharacterContext.mockReturnValue({
      favorites: [],
      toggleFavorite,
    });

    render(<CharacterCardInfo character={character} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(toggleFavorite).toHaveBeenCalledWith(character);
  });
});
