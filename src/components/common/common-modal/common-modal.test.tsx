import { render, screen } from "@testing-library/react";
import { CommonModal } from "./common-modal";
import userEvent from "@testing-library/user-event";

describe("CommonModal", () => {

  const onOpenChange = jest.fn();

  it("do not show modal", () => {
    render(
      <CommonModal
        open={false}
        onOpenChange={onOpenChange}
        title="title"
        description="description"
      >
        <div data-testid="test-content" />
      </CommonModal>
    );
    expect(screen.queryByTestId("test-content")).not.toBeInTheDocument();
    expect(screen.queryByTestId("test-trigger")).not.toBeInTheDocument();
  })

  it("show modal", async () => {
    render(
      <CommonModal
        open={true}
        onOpenChange={onOpenChange}
        title="title"
        description="description"
        trigger={<div data-testid="test-trigger"/>}
      >
        <div data-testid="test-content" />
      </CommonModal>
    );
    expect(screen.getByTestId("test-content")).toBeInTheDocument();
    expect(screen.getByTestId("test-trigger")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button"));
    expect(onOpenChange).toHaveBeenCalledTimes(1);
  })
});