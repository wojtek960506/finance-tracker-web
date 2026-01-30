import { CommonSelect } from "./common-select";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


describe("CommonSelect", () => {

  const options = { b: "2", c: "3", a: "1" }
  const setValue = jest.fn();

  afterEach(() => { jest.clearAllMocks() });

  const getCommonSelect = (isClearable=true, isDisabled=false, value="a") => (
    <CommonSelect
      value={value}
      setValue={setValue}
      placeholderKey="tmpKey"
      options={options}
      isDisabled={isDisabled}
      isClearable={isClearable}
    />
  );

  it("show options on click in trigger", async () => {
    render(getCommonSelect());
    const trigger = screen.getByRole("combobox");
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("1");

    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
    
    await userEvent.click(trigger);

    expect(screen.getAllByText("1")).toHaveLength(2);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();

    await userEvent.click(screen.getByText("2"));
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith("b");

    // options are closed after click on one of them
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("sets value as empty string when clicking clear button", async () => {
    render(getCommonSelect());
    await userEvent.click(screen.getByTestId("clear-field-button"));
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith("");
  });

  it("do not show clear button when not clearable", () => {
    render(getCommonSelect(false));
    expect(screen.queryByTestId("clear-field-button")).not.toBeInTheDocument();
  });

  it("clear button and trigger cannot be clicked when select is disabled", () => {
    render(getCommonSelect(true, true));
    const trigger = screen.getAllByRole("combobox").find(el => el.textContent === "1");
    const clearButton = screen.getByTestId("clear-field-button");
    expect(trigger).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("trigger has empty text when value is not in options", () => {
    render(getCommonSelect(true, true, "d"));
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent("");
  });
});