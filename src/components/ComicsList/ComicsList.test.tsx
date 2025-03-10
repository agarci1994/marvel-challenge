import { render, screen } from '@testing-library/react';
import ComicsList from '../ComicsList';
import { describe, expect, it } from 'vitest';

describe('ComicsList Component', () => {
  it('renders title and list of comics', () => {
    const comics = [
      { title: 'Comic 1', image: 'image1.jpg' },
      { title: 'Comic 2', image: 'image2.jpg' },
    ];

    render(<ComicsList comics={comics} comicsRef={{ current: null }} />);

    expect(screen.getByText('COMICS')).toBeInTheDocument();
    expect(screen.getByText('Comic 1')).toBeInTheDocument();
    expect(screen.getByText('Comic 2')).toBeInTheDocument();
  });

  it('displays a message when no comics are available', () => {
    render(<ComicsList comics={[]} comicsRef={{ current: null }} />);
    expect(screen.getByText('No comics available.')).toBeInTheDocument();
  });
});
