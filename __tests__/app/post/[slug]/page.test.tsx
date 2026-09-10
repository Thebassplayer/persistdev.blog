import { render, screen } from "@testing-library/react";
import type { Post } from "@/src/content/generated";
import { getAllPosts, getPostBySlug } from "@/src/content/generated";
import PostPage from "@/src/app/post/[slug]/page";

jest.mock("@/src/content/generated", () => ({
  getAllPosts: jest.fn(),
  getPostBySlug: jest.fn(),
}));

jest.mock("@/src/components/Post/PostLayoutThree", () => ({
  __esModule: true,
  default: ({ post }: { post: Post }) => <a href={post.url}>{post.title}</a>,
}));

jest.mock("@/src/components/Post/PostDetails", () => ({
  __esModule: true,
  default: () => <div data-testid="post-details" />,
}));

jest.mock("@/src/components/Post/RenderMdx", () => ({
  __esModule: true,
  default: () => <div data-testid="post-body" />,
}));

jest.mock("@/src/components/Post/TableOfContent", () => ({
  __esModule: true,
  default: () => <div data-testid="table-of-contents" />,
}));

jest.mock("@/src/components/Elements/ButtonTag", () => ({
  __esModule: true,
  default: () => <div data-testid="post-tag" />,
}));

const createPost = (
  id: string,
  tags: string[] | undefined,
  publishedAt: string,
  overrides: Partial<Post> = {},
): Post => ({
  _id: id,
  _raw: {
    sourceFilePath: `content/${id}/index.mdx`,
    sourceFileName: "index.mdx",
    sourceFileDir: `content/${id}`,
    contentType: "mdx",
    flattenedPath: id,
  },
  type: "Post",
  title: id,
  publishedAt,
  updatedAt: publishedAt,
  description: `${id} description`,
  isPublished: true,
  author: "Test Author",
  tags,
  body: { raw: "" },
  url: `/post/${id}`,
  readingTime: { text: "1 min read", time: 60000, words: 100, minutes: 1 },
  toc: [],
  content: "",
  ...overrides,
});

const renderPostPage = async () => {
  render(
    await PostPage({
      params: Promise.resolve({ slug: "current" }),
    }),
  );
};

describe("PostPage related posts", () => {
  const mockedGetAllPosts = jest.mocked(getAllPosts);
  const mockedGetPostBySlug = jest.mocked(getPostBySlug);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("derives related posts from the content collection and passes them to the section", async () => {
    const currentPost = createPost(
      "current",
      ["TypeScript"],
      "2024-01-01T00:00:00Z",
    );
    const relatedPost = createPost(
      "related",
      ["typescript"],
      "2024-02-01T00:00:00Z",
    );
    const unrelatedPost = createPost(
      "unrelated",
      ["React"],
      "2024-03-01T00:00:00Z",
    );
    mockedGetPostBySlug.mockResolvedValue(currentPost);
    mockedGetAllPosts.mockResolvedValue([
      currentPost,
      unrelatedPost,
      relatedPost,
    ]);

    await renderPostPage();

    expect(mockedGetAllPosts).toHaveBeenCalledTimes(1);
    expect(
      screen.getByRole("heading", { name: "Related Posts" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "related" })).toHaveAttribute(
      "href",
      "/post/related",
    );
  });

  it("passes an empty result to the related-posts section when no post shares a tag", async () => {
    const currentPost = createPost(
      "current",
      ["TypeScript"],
      "2024-01-01T00:00:00Z",
    );
    const unrelatedPost = createPost(
      "unrelated",
      ["React"],
      "2024-03-01T00:00:00Z",
    );
    mockedGetPostBySlug.mockResolvedValue(currentPost);
    mockedGetAllPosts.mockResolvedValue([currentPost, unrelatedPost]);

    await renderPostPage();

    expect(
      screen.queryByRole("heading", { name: "Related Posts" }),
    ).not.toBeInTheDocument();
  });
});
