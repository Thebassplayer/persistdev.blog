import { Post } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

export const sortPosts = (blogs: Post[]) => {
  const today = new Date();
  return blogs
    .slice()
    .filter((blog) => {
      const publishedAt = parseISO(blog.publishedAt);
      return publishedAt <= today;
    })
    .sort((a: Post, b: Post) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
    );
};

export const numberOfPosts = (blogs: Post[]): number => {
  const today = new Date();
  return blogs.filter((blog) => {
    const publishedAt = parseISO(blog.publishedAt);
    return publishedAt <= today;
  }).length;
};
