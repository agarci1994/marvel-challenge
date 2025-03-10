import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { useCharacterContext } from '../context/useCharacterContext';
import Home from './Home';

jest.mock('../context/useCharacterContext', () => ({
  useCharacterContext: jest.fn(),
}));

jest.mock('../services/marvelApi', () => ({
  fetchCharacters: jest.fn(),
}));

const mockSetCharacters = jest.fn();
const mockSetLoading = jest.fn();

describe('Home Page', () => {
  beforeEach(() => {
    (useCharacterContext as jest.Mock).mockReturnValue({
      setCharacters: mockSetCharacters,
      setLoading: mockSetLoading,
      characters: [],
      loading: false,
    });
  });

  test('renders SearchBar and CharacterList', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
  });
});
