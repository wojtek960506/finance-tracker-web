import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
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
  });

  it("cannot click when disabled", async () => {
    const setValue = jest.fn();
    render(<ClearFieldButton setValue={setValue} isDisabled={true} />);
    await userEvent.click(screen.getByTestId('clear-field-button'));
    expect(setValue).toHaveBeenCalledTimes(0);
  });
})