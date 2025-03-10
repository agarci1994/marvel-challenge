import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/useCharacterContext', () => ({
  useCharacterContext: vi.fn(),
}));

vi.mock('../../services/marvelApi', () => ({
  fetchCharacters: vi.fn(() => Promise.resolve([])),
}));

describe('SearchBar Component', () => {
  it('renders input field and search icon', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText('Search a character...')).toBeInTheDocument();
    expect(screen.getByAltText('Search icon')).toBeInTheDocument();
  });
});
