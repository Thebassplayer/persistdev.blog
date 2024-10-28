import { Post } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

export const sortPosts = (posts: Post[]) => {
  const today = new Date();
  return posts
    .slice()
    .filter((post) => {
      const publishedAt = parseISO(post.publishedAt);
      return publishedAt <= today;
    })
    .sort((a: Post, b: Post) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
    );
};

export const numberOfPosts = (posts: Post[]): number => {
  const today = new Date();
  return posts.filter((post) => {
    const publishedAt = parseISO(post.publishedAt);
    return publishedAt <= today;
  }).length;
};
