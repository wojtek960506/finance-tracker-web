import { UseFormReturn } from "react-hook-form";
import { act, screen } from "@testing-library/react";
import { ControlledFormField } from "./controlled-form-field";
import { renderWithForm } from "@/test-utils/render-with-form";


describe("ControlledFormField", () => {

  it("show validation message (horizontal layout by default)", async () => {
    let methods: unknown;
    const message = "Email is required";
    
    renderWithForm(
      <ControlledFormField name="email" label="Email">
        {field => <input {...field} />}
      </ControlledFormField>,
      { onMethods: (m) => (methods = m) }
    );

    act(() => { (methods as UseFormReturn).setError("email", { type: "manual", message } ) });
    
    const errorMsg = await screen.findByText(message);
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toHaveClass("col-start-2");
  });

  it("show validation message (vertical layout) and label", async () => {
    let methods: unknown;
    const message = "Email is required";
    const label = "Email"
    
    renderWithForm(
      <ControlledFormField name="email" label={label} isHorizontal={false}>
        {field => <input {...field} />}
      </ControlledFormField>,
      { onMethods: (m) => (methods = m) }
    );

    act(() => { (methods as UseFormReturn).setError("email", { type: "manual", message } ) });
    
    const errorMsg = await screen.findByText(message);
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).not.toHaveClass("col-start-2");

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it("do not show label", () => {
    const label = "Email";
    
    renderWithForm(
      <ControlledFormField name="email" label={label} showLabel={false}>
        {field => <input {...field} />}
      </ControlledFormField>,
    );
    expect(screen.queryByText(label)).not.toBeInTheDocument();
  })
});
