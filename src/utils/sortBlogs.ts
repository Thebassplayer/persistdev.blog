import { Blog } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";

const today = new Date();

export const sortBlogs = (blogs: Blog[]) =>
  blogs
    .slice()
    .filter((blog) => {
      const publishedAt = parseISO(blog.publishedAt);
      return publishedAt <= today;
    })
    .sort((a: Blog, b: Blog) =>
      compareDesc(parseISO(a.publishedAt), parseISO(b.publishedAt)),
    );
