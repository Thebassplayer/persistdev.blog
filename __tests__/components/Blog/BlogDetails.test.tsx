import React from "react";
import { render, screen } from "@testing-library/react";
import PostDetails from "@/src/components/Post/PostDetails";
import { Post } from "@/.contentlayer/generated";

// Mock the ViewCounter component
jest.mock("../../../src/components/Post/ViewCounter", () => (
  <div data-testid="mock-view-counter">Mock View Counter</div>
));

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
    body: { code: "sample-mdx-code", raw: "sample-mdx-raw" },
    url: "sample-url",
    readingTime: {},
    toc: {},
  };

  it("renders without crashing", () => {
    render(<PostDetails post={sampleBlog} slug="sample-slug" />);
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();
    expect(screen.getByText("Mock View Counter")).toBeInTheDocument();
    expect(screen.getByText("5 min read")).toBeInTheDocument();
    expect(screen.getByText("#Technology")).toBeInTheDocument();
  });

  it("renders with missing tags", () => {
    render(
      <PostDetails
        post={{ ...sampleBlog, tags: undefined }}
        slug="sample-slug"
      />,
    );
    expect(screen.queryByText("#Technology")).not.toBeInTheDocument();
  });

  it("renders with missing ViewCounter", () => {
    render(<PostDetails post={sampleBlog} slug="sample-slug" />);
    expect(screen.queryByTestId("mock-view-counter")).not.toBeInTheDocument();
  });

  it("renders with empty tags array", () => {
    render(
      <PostDetails post={{ ...sampleBlog, tags: [] }} slug="sample-slug" />,
    );
    expect(screen.queryByText("#Technology")).not.toBeInTheDocument();
  });
});
