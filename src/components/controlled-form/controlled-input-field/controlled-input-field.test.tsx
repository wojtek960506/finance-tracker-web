import { renderWithForm } from "@/test-utils/render-with-form";
import { ControlledInputField } from "./controlled-input-field";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("ControlledInputField", () => {

  it("render text input", async () => {
    const value = "my name";
    renderWithForm(<ControlledInputField name="firstName" type="text" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveValue("");
    await userEvent.type(input, value);
    expect(input).toHaveValue(value);
    expect(screen.getByText("firstName")).toBeInTheDocument();
  });

  it("render number input with less decimal places accepted than provided", async () => {
    const value = "1.234";
    renderWithForm(<ControlledInputField name="amount" type="number" decimalPlaces={2} />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveValue(null);
    await userEvent.type(input, value);
    expect(input).toHaveValue(1.23);
    expect(screen.getByText("amount")).toBeInTheDocument();
  });

  it("render number input with negative decimal places what throws an error", async () => {
    expect(() =>
      renderWithForm(<ControlledInputField name="amount" type="number" decimalPlaces={-1} />)
    ).toThrow("Number of decimal places in input cannot be less than 0");
  })
})