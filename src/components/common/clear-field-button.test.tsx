import { render, screen } from '@testing-library/react';
import { ClearFieldButton } from './clear-field-button';

describe('clearFieldButton', () => {

  it("renders button", () => {
    render(<ClearFieldButton setValue={jest.fn()}/>);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });
})