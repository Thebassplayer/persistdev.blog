import React from "react";
import { render, screen } from "@testing-library/react";
import PostDetails from "@/src/components/Post/PostDetails";
import type { Post } from "@/src/content/generated";

// Mock the ViewCounter component
jest.mock("../../../src/components/Post/ViewCounter", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-view-counter">Mock View Counter</div>,
}));

describe("BlogDetails", () => {
  const sampleBlog: Post = {
    _id: "sample-id",
    _raw: {
      sourceFilePath: "/path/to/file.mdx",
      sourceFileName: "file.mdx",
      sourceFileDir: "/path/to",
      contentType: "mdx",
      flattenedPath: "/path/to/file",
    },
    type: "Post",
    title: "Sample Title",
    publishedAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-01-01T00:00:00Z",
    description: "Sample description",
    isPublished: true,
    author: "Sample Author",
    tags: ["Sample Tag"],
    body: { raw: "sample-mdx-raw" },
    url: "sample-url",
    readingTime: { text: "5 min read", time: 300000, words: 100, minutes: 0.5 },
    toc: [],
    content: "sample-mdx-raw",
  };

  it("renders without crashing", () => {
    render(<PostDetails post={sampleBlog} slug="sample-slug" />);
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();
    expect(screen.getByText("Mock View Counter")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
    expect(screen.getByText("#Sample Tag")).toBeInTheDocument();
  });

  it("renders with missing tags", () => {
    render(
      <PostDetails
        post={{ ...sampleBlog, tags: undefined }}
        slug="sample-slug"
      />,
    );
    expect(screen.queryByText("#Sample Tag")).not.toBeInTheDocument();
  });

  it("renders the mocked ViewCounter", () => {
    render(<PostDetails post={sampleBlog} slug="sample-slug" />);
    expect(screen.getByTestId("mock-view-counter")).toBeInTheDocument();
  });

  it("renders with empty tags array", () => {
    render(
      <PostDetails post={{ ...sampleBlog, tags: [] }} slug="sample-slug" />,
    );
    expect(screen.queryByText("#Sample Tag")).not.toBeInTheDocument();
  });
});
