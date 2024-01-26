import { Blog } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import { slug } from "github-slugger";
import Link from "next/link";
import ViewCounter from "./ViewCounter";

type BlogDetailsProps = {
  blog: Blog;
  slug: string;
};

const BlogDetails = ({ blog, slug: blogSlug }: BlogDetailsProps) => {
  console.log("blog: ", blog);
  console.log("flattenedPath: ", blog._raw.flattenedPath);
  console.log("blogSlug: ", blogSlug);

  return (
    <div
      className="bg-ccent mx-10 flex flex-wrap items-center
    justify-around rounded-lg bg-accent px-10 py-2 text-xl font-medium text-light"
    >
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <span className="m-3">
        <ViewCounter slug={blogSlug} />
      </span>
      <div className="m-3">{blog.readingTime.text}</div>
      {blog?.tags ? (
        <Link href={`/categories/${slug(blog.tags[0])}`} className="m-3">
          #{blog.tags[0]}
        </Link>
      ) : null}
    </div>
  );
};

export default BlogDetails;
