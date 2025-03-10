import { render, screen } from '@testing-library/react';
import ComicCard from '../ComicCard';
import { describe, expect, it } from 'vitest';

describe('ComicCard Component', () => {
  it('renders comic title and image', () => {
    const comic = { title: 'Amazing Spider-Man', image: 'spiderman.jpg' };

    render(<ComicCard comic={comic} index={0} />);

    expect(screen.getByText('Amazing Spider-Man')).toBeInTheDocument();
    expect(screen.getByAltText('Amazing Spider-Man')).toBeInTheDocument();
  });
});
