import { render, screen } from "@testing-library/react";
import type { Post } from "@/src/content/generated";
import RelatedPosts from "@/src/components/Post/RelatedPosts";

jest.mock("../../../src/components/Post/PostLayoutThree", () => ({
  __esModule: true,
  default: ({ post }: { post: Post }) => <a href={post.url}>{post.title}</a>,
}));

const post: Post = {
  _id: "related-post",
  _raw: {
    sourceFilePath: "content/related-post/index.mdx",
    sourceFileName: "index.mdx",
    sourceFileDir: "content/related-post",
    contentType: "mdx",
    flattenedPath: "related-post",
  },
  type: "Post",
  title: "Related post",
  publishedAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
  description: "Related post description",
  isPublished: true,
  author: "Test Author",
  tags: ["TypeScript"],
  body: { raw: "" },
  url: "/post/related-post",
  readingTime: { text: "1 min read", time: 60000, words: 100, minutes: 1 },
  toc: [],
  content: "",
};

describe("RelatedPosts", () => {
  it("renders a related-post grid", () => {
    render(<RelatedPosts posts={[post]} />);

    expect(
      screen.getByRole("heading", { name: "Related Posts" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("article")).toContainElement(
      screen.getByRole("link", { name: "Related post" }),
    );
  });

  it("omits the section without related posts", () => {
    const { container } = render(<RelatedPosts posts={[]} />);

    expect(container).toBeEmptyDOMElement();
  });
});
