import { Blog } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

export const sortBlogs = (blogs: Blog[]) => {
  const today = new Date();
  return blogs
    .slice()
    .filter((blog) => {
      const publishedAt = parseISO(blog.publishedAt);
      return publishedAt <= today;
    })
    .sort((a: Blog, b: Blog) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
    );
};
