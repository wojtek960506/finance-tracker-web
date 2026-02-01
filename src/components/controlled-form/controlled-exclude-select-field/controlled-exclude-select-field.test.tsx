import userEvent from "@testing-library/user-event";
import { screen, within } from "@testing-library/react";
import { renderWithForm } from "@/test-utils/render-with-form";
import { ControlledExcludeSelectField } from "./controlled-exclude-select-field";


describe("ControlledExcludeSelectField", () => {
  const ALL_INVOLVED_LABEL_KEY = "allInvolvedLabelKey";
  const EXCLUDED_LABEL_KEY = "excludedLabelKey";
  const NAME = "color"
  const OPTIONS = [
    { value: "blue", label: "Blue" },
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
  ]
  const OPTIONS_OBJ = OPTIONS.reduce<Record<string, string>>(
    (acc, item) => {
      acc[item.value] = item.label
      return acc;
    },
    {}
  );

  const verifyOption = (name: string, label: string, shouldBeChecked: boolean) => {
    const option = screen.getByTestId(`exclude-select-option-${name}`);
    expect(option).toHaveTextContent(label);
    if (shouldBeChecked) expect(within(option).getByRole("checkbox")).toBeChecked();
    else expect(within(option).getByRole("checkbox")).not.toBeChecked();
  }

  const verifyOptions = (expected: [string, boolean][]) => {
    for (const [name, shouldBeChecked] of expected) {
      verifyOption(name, OPTIONS_OBJ[name], shouldBeChecked)
    }
  }

  it("render", async () => {
    renderWithForm(<ControlledExcludeSelectField
      name={NAME}
      options={OPTIONS}
      allInvolvedLabelKey={ALL_INVOLVED_LABEL_KEY}
      excludedLabelKey={EXCLUDED_LABEL_KEY}
    />, {}, { color: ["blue"] })

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(`1 ${EXCLUDED_LABEL_KEY}`);

    await userEvent.click(trigger);
    verifyOptions([["blue", true], ["red", false], ["green", false]]);
  });

  it("check, uncheck and uncheck all", async () => {
    renderWithForm(<ControlledExcludeSelectField
      name={NAME}
      options={OPTIONS}
      allInvolvedLabelKey={ALL_INVOLVED_LABEL_KEY}
      excludedLabelKey={EXCLUDED_LABEL_KEY}
    />, {}, { color: [] });

    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveTextContent(ALL_INVOLVED_LABEL_KEY);
    await userEvent.click(trigger);

    verifyOptions([["blue", false], ["red", false], ["green", false]]);

    await userEvent.click(screen.getByTestId('exclude-select-option-blue'));
    verifyOptions([["blue", true], ["red", false], ["green", false]]);

    await userEvent.click(screen.getByTestId('exclude-select-option-red'));
    verifyOptions([["blue", true], ["red", true], ["green", false]]);

    await userEvent.click(screen.getByTestId('exclude-select-option-green'));
    verifyOptions([["blue", true], ["red", true], ["green", true]]);

    await userEvent.click(screen.getByTestId('exclude-select-option-blue'));
    verifyOptions([["blue", false], ["red", true], ["green", true]]);

    await userEvent.click(screen.getByTestId('exclude-select-include-all-button'));
    verifyOptions([["blue", false], ["red", false], ["green", false]]);
  });

  it("disabled", () => {
    renderWithForm(<ControlledExcludeSelectField
      name={NAME}
      options={OPTIONS}
      allInvolvedLabelKey={ALL_INVOLVED_LABEL_KEY}
      excludedLabelKey={EXCLUDED_LABEL_KEY}
      isDisabled={true}
    />);
    expect(screen.getByRole("combobox")).toBeDisabled();
  })
})