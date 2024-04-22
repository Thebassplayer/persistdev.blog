import { render, screen } from "@testing-library/react";
import InsightRoll from "@/src/components/About/InsightRoll";

it("renders insights correctly", () => {
  const insights = ["Insight 1", "Insight 2", "Insight 3"];
  render(<InsightRoll insights={insights} />);

  // Assert that the insights are rendered
  insights.forEach((insight) => {
    const insightElement = screen.getByText(insight);
    expect(insightElement).toBeInTheDocument();
  });
});

it("renders pipe separators correctly", () => {
  const insights = ["Insight 1", "Insight 2", "Insight 3"];
  render(<InsightRoll insights={insights} />);

  // Assert that the pipe separators are rendered
  const pipeSeparators = screen.getAllByText("|");
  expect(pipeSeparators.length).toBe(insights.length);
});
