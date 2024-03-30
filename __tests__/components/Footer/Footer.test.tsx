import Footer from "@/src/components/Footer";
import { render, screen } from "@testing-library/react";

describe("Footer Component", () => {
  it("renders footer component", () => {
    render(<Footer />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
  it("renders subscription form", () => {
    render(<Footer />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    const emailInput = screen.getByPlaceholderText("Enter your email");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "email");
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("renders copyright text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/©2024 3R\. All rights reserved\./i),
    ).toBeInTheDocument();
  });

  it("renders sitemap link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /sitemap\.xml/i }),
    ).toBeInTheDocument();
  });

  it("renders author link", () => {
    render(<Footer />);
    expect(
      screen.getByRole("link", { name: /Roy Lopez/i }),
    ).toBeInTheDocument();
  });

  it("author link redirects to correct URL", () => {
    render(<Footer />);
    const authorLink = screen.getByRole("link", { name: /Roy Lopez/i });
    expect(authorLink).toHaveAttribute("href", "https://roylopez.dev");
  });
});
