import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithForm } from "@/test-utils/render-with-form";
import { ControlledRadioField } from "./controlled-radio-field";


describe("ControlledRadioField", () => {

  const NAME = "type";
  const OPTIONS_KEYS = new Set(["expense", "income"]);

  it("render with no option to clear", () => {
    renderWithForm(
      <ControlledRadioField name={NAME} optionsKeys={OPTIONS_KEYS} isClearable={false}/>
    );

    const expenseRadio = screen.getByTestId("radio-field-expense");
    const incomeRadio = screen.getByTestId("radio-field-income");

    expect(expenseRadio).not.toBeChecked();
    expect(incomeRadio).not.toBeChecked();

    const expenseLabel = document.querySelector(`label[for="${expenseRadio.id}"]`);
    const incomeLabel = document.querySelector(`label[for="${incomeRadio.id}"]`);

    expect(expenseLabel).toHaveTextContent(`${NAME}_options.expense`);
    expect(incomeLabel).toHaveTextContent(`${NAME}_options.income`);

    expect(screen.queryByTestId("clear-field-button")).not.toBeInTheDocument();
  });

  it("choose different options and clear", async () => {
    renderWithForm(<ControlledRadioField name={NAME} optionsKeys={OPTIONS_KEYS} />);

    const expenseOptionRadio = screen.getByTestId("radio-field-expense");
    const incomeOptionRadio = screen.getByTestId("radio-field-income");

    expect(expenseOptionRadio).not.toBeChecked();
    expect(incomeOptionRadio).not.toBeChecked();
    
    await userEvent.click(expenseOptionRadio);
    
    expect(expenseOptionRadio).toBeChecked();
    expect(incomeOptionRadio).not.toBeChecked();


    await userEvent.click(expenseOptionRadio);
    
    expect(expenseOptionRadio).toBeChecked();
    expect(incomeOptionRadio).not.toBeChecked();

    await userEvent.click(incomeOptionRadio);
    
    expect(expenseOptionRadio).not.toBeChecked();
    expect(incomeOptionRadio).toBeChecked();

    await userEvent.click(screen.getByTestId("clear-field-button"));
    
    expect(expenseOptionRadio).not.toBeChecked();
    expect(incomeOptionRadio).not.toBeChecked();
  });

  it("disabled", () => {
    renderWithForm(
      <ControlledRadioField name={NAME} optionsKeys={OPTIONS_KEYS} isDisabled={true} />,
      {},
      { [NAME]: "expense" },
    );
    expect(screen.getByTestId("clear-field-button")).toBeDisabled();
    expect(screen.getByTestId("radio-field-expense")).toBeDisabled();
    expect(screen.getByTestId("radio-field-income")).toBeDisabled();
  });

  it("proper classes when horizontal layout", () => {
    renderWithForm(<ControlledRadioField name={NAME} optionsKeys={OPTIONS_KEYS} />);

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).toHaveClass("h-7");
    const childDiv = radioGroup.children[0];
    expect(childDiv).toHaveClass("flex-row");
  });

  it("proper classes when vertical layout", () => {
    renderWithForm(
      <ControlledRadioField name={NAME} optionsKeys={OPTIONS_KEYS} isHorizontal={false} />
    );

    const radioGroup = screen.getByRole("radiogroup");
    expect(radioGroup).not.toHaveClass("h-7");
    const childDiv = radioGroup.children[0];
    expect(childDiv).toHaveClass("flex-col");
  });
});
