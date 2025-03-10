import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterList from './CharacterList';

const mockCharacters = [
  { id: 1, name: 'Spider-Man', thumbnail: { path: 'spiderman', extension: 'jpg' } },
  { id: 2, name: 'Iron Man', thumbnail: { path: 'ironman', extension: 'jpg' } },
];

describe('CharacterList', () => {
  it('render list', () => {
    render(<CharacterList characters={mockCharacters} />);

    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    expect(screen.getByText('Iron Man')).toBeInTheDocument();
  });
});
