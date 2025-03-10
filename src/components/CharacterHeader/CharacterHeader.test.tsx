import { render, screen } from '@testing-library/react';
import CharacterHeader from '../CharacterHeader';
import { describe, expect, it } from 'vitest';

describe('CharacterHeader Component', () => {
  const character = {
    name: 'Iron Man',
    thumbnail: { path: 'https://example.com/ironman', extension: 'jpg' },
    description: 'Genius billionaire playboy philanthropist.',
  };

  it('renders the character name, description, and image', () => {
    render(<CharacterHeader character={character} />);

    expect(screen.getByText('Iron Man')).toBeInTheDocument();
    expect(screen.getByText('Genius billionaire playboy philanthropist.')).toBeInTheDocument();
    expect(screen.getByAltText('Iron Man')).toHaveAttribute(
      'src',
      'https://example.com/ironman.jpg',
    );
  });

  it('displays "No description available." when description is empty', () => {
    render(<CharacterHeader character={{ ...character, description: '' }} />);

    expect(screen.getByText('No description available.')).toBeInTheDocument();
  });
});
