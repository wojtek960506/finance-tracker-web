import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithForm } from "@/test-utils/render-with-form";
import { ControlledSelectField } from "./controlled-select-field";


describe("ControlledSelectField", () => {
  
  const NAME = "color";
  const PLACEHOLDER_KEY = "chooseColor";
  const options = {"blue": "Blue", "red": "Red", "green": "Green"};

  it("renders with label and shows options", async () => {
    renderWithForm(<ControlledSelectField
      name={NAME}
      placeholderKey={PLACEHOLDER_KEY}
      options={options}
    />);
    const label = screen.getByTestId("form-field-label");
    expect(label).toHaveTextContent(NAME);

    expect(screen.getByText(PLACEHOLDER_KEY)).toBeInTheDocument();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(PLACEHOLDER_KEY);
    await userEvent.click(trigger);

    expect(screen.getAllByRole("option")).toHaveLength(3);
    expect(screen.getByTestId("common-select-item-blue")).toBeInTheDocument();
    expect(screen.getByTestId("common-select-item-red")).toBeInTheDocument();
    expect(screen.getByTestId("common-select-item-green")).toBeInTheDocument();
  });

  it("choose one of options and clear it", async () => {
    renderWithForm(<ControlledSelectField
      name={NAME}
      placeholderKey={PLACEHOLDER_KEY}
      options={options}
    />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(PLACEHOLDER_KEY);
    await userEvent.click(trigger);

    await userEvent.click(screen.getByTestId("common-select-item-blue"));
    expect(trigger).toHaveTextContent("Blue");
    
    await userEvent.click(screen.getByTestId("clear-field-button"));
    expect(trigger).toHaveTextContent(PLACEHOLDER_KEY);
  });

  it("disabled, not clearable and without label", async () => {
    renderWithForm(<ControlledSelectField
      name={NAME}
      placeholderKey={PLACEHOLDER_KEY}
      options={options}
      isDisabled={true}
      isClearable={false}
      showLabel={false}
    />);
    expect(screen.queryByTestId("form-field-label")).not.toBeInTheDocument();
    expect(screen.queryByTestId("clear-button-field")).not.toBeInTheDocument();
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(PLACEHOLDER_KEY);
    expect(trigger).toBeDisabled();
  })
})