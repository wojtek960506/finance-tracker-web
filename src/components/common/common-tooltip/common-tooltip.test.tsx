import { CommonTooltip } from "./common-tooltip";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";


describe("CommonTooltip", () => {
  it("render and show tooltip content", async () => {
    const user = userEvent.setup();
    
    render(<CommonTooltip
      triggerValue={<div data-testid="test-trigger" />}
      contentValue={<div data-testid="test-content" />}
    />);
    expect(screen.queryByTestId("test-content")).not.toBeInTheDocument();

    await user.hover(screen.getByTestId("test-trigger"));

    const portalTooltip = document.body.querySelector('[data-testid="test-content"]')
    expect(portalTooltip).toBeInTheDocument()
  });
});
