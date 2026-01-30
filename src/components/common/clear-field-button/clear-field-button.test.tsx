import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ClearFieldButton } from './clear-field-button';


describe('clearFieldButton', () => {

  it("renders button", () => {
    render(<ClearFieldButton setValue={jest.fn()}/>);
    expect(screen.getByText('✕')).toBeInTheDocument();
  });

  it("calls passed function on click", async () => {
    const setValue = jest.fn();
    render(<ClearFieldButton setValue={setValue}/>);
    await userEvent.click(screen.getByTestId('clear-field-button'));
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith("");
  })
})