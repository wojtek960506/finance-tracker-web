import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { CommonExcludeSelect, MultiOption } from "./common-exclude-select";


describe("CommonExcludeSelect", () => {

  const options: MultiOption[] = [
    { label: "c", value: "3" },
    { label: "a", value: "1" },
    { label: "b", value: "2" },
  ];
  const ALL_INVOLVED_LABEL_KEY = "allInvolved";
  const EXCLUDED_LABEL_KEY = "excluded";
  const onChange = jest.fn();

  afterEach(() => { jest.clearAllMocks() });

  const getCommonExcludeSelect = (
    options: MultiOption[],
    excluded: string[],
    isDisabled=false
  ) => (<CommonExcludeSelect
    options={options}
    excluded={excluded}
    onChange={onChange}
    allInvolvedLabelKey={ALL_INVOLVED_LABEL_KEY}
    excludedLabelKey={EXCLUDED_LABEL_KEY}
    isDisabled={isDisabled ? isDisabled : undefined} // to cover default argument
  />);

  it("render and open options", async () => {
    render(getCommonExcludeSelect(options, ["1"]));

    const selectLabel = screen.getByTestId('exclude-select-label');
    expect(selectLabel).toHaveTextContent(`1 ${EXCLUDED_LABEL_KEY}`);

    expect(screen.queryAllByTestId("exclude-select-option-label")).toHaveLength(0);

    expect(screen.queryByText("a")).not.toBeInTheDocument();
    expect(screen.queryByText("b")).not.toBeInTheDocument();
    expect(screen.queryByText("c")).not.toBeInTheDocument();
    
    await userEvent.click(screen.getByRole("combobox"));

    expect(screen.getAllByTestId("exclude-select-option-label")).toHaveLength(3);
    expect(screen.queryByText("a")).toBeInTheDocument();
    expect(screen.queryByText("b")).toBeInTheDocument();
    expect(screen.queryByText("c")).toBeInTheDocument();

    expect(screen.getByTestId("exclude-select-checkbox-1")).toBeChecked();
    expect(screen.getByTestId("exclude-select-checkbox-2")).not.toBeChecked();
    expect(screen.getByTestId("exclude-select-checkbox-3")).not.toBeChecked();
  });

  it("choose option which is not excluded", async () => {
    render(getCommonExcludeSelect(options, []));

    const selectLabel = screen.getByTestId('exclude-select-label');
    expect(selectLabel).toHaveTextContent(ALL_INVOLVED_LABEL_KEY);

    const trigger = screen.getByRole("combobox");
    expect(trigger).not.toBeDisabled();
    await userEvent.click(trigger);

    const checkbox1 = screen.getByTestId("exclude-select-checkbox-2");
    expect(checkbox1).not.toBeChecked();
    await userEvent.click(checkbox1);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(["2"]);
  });

  it("choose option which is excluded", async () => {
    render(getCommonExcludeSelect(options, ["1", "2", "3"]));

    const selectLabel = screen.getByTestId('exclude-select-label');
    expect(selectLabel).toHaveTextContent(`3 ${EXCLUDED_LABEL_KEY}`);

    await userEvent.click(screen.getByRole("combobox"));
    
    const checkbox3 = screen.getByTestId("exclude-select-checkbox-3");
    expect(checkbox3).toBeChecked();
    await userEvent.click(checkbox3);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(["1", "2"]);
  });

  it("include all options", async () => {
    render(getCommonExcludeSelect(options, ["1", "2", "3"]));

    await userEvent.click(screen.getByRole("combobox"));

    const includeAllButton = screen.getByTestId("exclude-select-include-all-button");
    await userEvent.click(includeAllButton);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("disabled", () => {
    render(getCommonExcludeSelect(options, [], true));

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(ALL_INVOLVED_LABEL_KEY);
    expect(trigger).toBeDisabled();
  });
});
