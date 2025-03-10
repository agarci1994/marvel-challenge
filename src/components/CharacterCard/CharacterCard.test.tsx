import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import CharacterCard from '../CharacterCard';
import { useNavigate } from 'react-router';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-router', async (importOriginal) => {
  const data = (await importOriginal()) ?? {};
  return {
    ...data,
    useNavigate: vi.fn(),
  };
});

describe('CharacterCard Component', () => {
  const character = {
    id: 10,
    name: 'Spider-Man',
    thumbnail: { path: 'https://example.com/spiderman', extension: 'jpg' },
  };

  it('renders the character name and image', () => {
    render(
      <MemoryRouter>
        {' '}
        {/* ✅ No mock, use the real MemoryRouter */}
        <CharacterCard character={character} />
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Spider-Man')).toHaveAttribute(
      'src',
      'https://example.com/spiderman.jpg',
    );
  });

  it('navigates to character detail page on click', () => {
    const mockNavigate = vi.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <CharacterCard character={character} />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByAltText('Spider-Man'));

    expect(mockNavigate).toHaveBeenCalledWith('/character/10');
  });
});
