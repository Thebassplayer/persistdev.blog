import React from "react";
import { render, screen } from "@testing-library/react";
import AboutCoverSection from "@/src/components/About/AboutCoverSection";

describe("AboutCoverSection", () => {
  it("renders without crashing", () => {
    render(<AboutCoverSection />);
  });

  it("displays the correct text content", () => {
    render(<AboutCoverSection />);
    expect(
      screen.getByText(
        /Talent is cheaper than table salt\./i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Hello! I´m Roy Lopez/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Hope you enjoy my blog and find it useful/i),
    ).toBeInTheDocument();
  });

  it("displays the image with correct alt text", () => {
    render(<AboutCoverSection />);
    expect(screen.getByAltText("Roy codign in a laptop")).toBeInTheDocument();
  });
});
