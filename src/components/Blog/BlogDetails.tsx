import { Blog } from "@/.contentlayer/generated";
import { format, parseISO } from "date-fns";
import { slug } from "github-slugger";
import Link from "next/link";

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
      className="px-10 bg-ccent text-light py-2 flex
    items-center justify-around flex-wrap text-xl font-medium mx-10 rounded-lg bg-accent"
    >
      <time className="m-3">
        {format(parseISO(blog.publishedAt), "LLLL d, yyyy")}
      </time>
      <span className="m-3">10 views</span>
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
