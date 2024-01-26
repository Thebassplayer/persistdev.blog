import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/src/utils";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";
import Link from "next/link";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

type RecentPostProps = {
  blogs: Blog[];
};

const RecentPost = ({ blogs }: RecentPostProps) => {
  const sortedBlogs = sortBlogs(blogs);
  return (
    <section className="mt-32 flex w-full flex-col items-center justify-center px-32">
      <div className="flex w-full justify-between">
        <h2 className="inline-block text-4xl font-bold capitalize">
          Recent Posts
        </h2>
        <Link
          href={"/categories/all"}
          className="inline-block text-lg font-medium text-accent underline underline-offset-2"
        >
          view all
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-3 grid-rows-2 gap-16">
        {sortedBlogs.slice(4, 10).map((blog) => (
          <article key={blog._id} className="relative col-span-1 row-span-1">
            <BlogLayoutThree blog={blog} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentPost;
