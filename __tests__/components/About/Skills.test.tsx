import Skills from "@/src/components/About/Skills";
import { render, screen } from "@testing-library/react";

it("renders skills section", () => {
  render(<Skills />);

  // Assert that the section is rendered
  const myElement = screen.getByText("I'm confortanble in...");
  expect(myElement).toBeInTheDocument();
});
