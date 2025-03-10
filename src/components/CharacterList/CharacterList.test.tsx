// @ts-nocheck
import { render, screen } from '@testing-library/react';
import CharacterList from '../CharacterList';
import { useCharacterContext } from '../../context/useCharacterContext';
import { describe, expect, it, vi } from 'vitest';

vi.mock('../../context/useCharacterContext', () => ({
  useCharacterContext: vi.fn(),
}));

describe('CharacterList Component', () => {
  it('shows loading message when characters are being fetched', () => {
    useCharacterContext.mockReturnValue({ loading: true });

    render(<CharacterList characters={[]} />);

    expect(screen.getByText('Loading characters...')).toBeInTheDocument();
  });
});
