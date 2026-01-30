import { ExpandableItem } from "./expandable-item";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


describe("expandableItem", () => {

  const component = (
    <ExpandableItem trigger={<div data-testid="test-trigger"/>} contentClassName="m-1">
      <div data-testid="test-content"/>
    </ExpandableItem>
  );

  it("on render the content is not visible", () => {
    render(component);
    expect(screen.queryByTestId("test-content")).not.toBeInTheDocument();
  });

  it("after clicking trigger, the content is visible", async () => {
    render(component);
    await userEvent.click(screen.getByTestId("test-trigger"));
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
  });
})