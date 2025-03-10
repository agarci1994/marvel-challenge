import { render, screen } from '@testing-library/react';
import NavBar from '../NavBar';
import { CharacterContext } from '../../context/CharacterContext';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router';

describe('NavBar Component', () => {
  it('renders logo and favorites icon', () => {
    render(
      <MemoryRouter>
        <CharacterContext.Provider
          value={{
            favorites: [],
            characters: [],
            loading: false,
            search: '',
            setLoading: jest.fn(),
            setCharacters: jest.fn(),
            setSearch: jest.fn(),
            toggleFavorite: jest.fn(),
          }}
        >
          <NavBar />
        </CharacterContext.Provider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByAltText('Favorites')).toBeInTheDocument();
  });

  it('displays the correct number of favorites', () => {
    render(
      <MemoryRouter>
        <CharacterContext.Provider
          value={{
            favorites: [
              { id: 1, name: 'spiderman', thumbnail: { path: 'http://', extension: 'jpg' } },
            ],
            characters: [],
            loading: false,
            search: '',
            setLoading: jest.fn(),
            setCharacters: jest.fn(),
            setSearch: jest.fn(),
            toggleFavorite: jest.fn(),
          }}
        >
          <NavBar />
        </CharacterContext.Provider>
        ,
      </MemoryRouter>,
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
