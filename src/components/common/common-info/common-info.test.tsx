import { render, screen } from "@testing-library/react"
import { CommonInfo } from "./common-info";


describe("CommonInfo", () => {
  it("label and value are shown", () => {
    const [LABEL, VALUE] = ["label", "value"];
    render(<CommonInfo label={LABEL} value={VALUE} />);
    expect(screen.getByText(LABEL)).toBeInTheDocument();
    expect(screen.getByText(VALUE)).toBeInTheDocument();
  });
});
