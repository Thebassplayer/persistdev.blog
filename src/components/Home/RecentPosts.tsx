import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/src/utils";
import Link from "next/link";
import BlogLayoutThree from "../Blog/BlogLayoutThree";

type RecentPostProps = {
  blogs: Blog[];
};

const RecentPost = ({ blogs }: RecentPostProps) => {
  const sortedBlogs = sortBlogs(blogs);
  return (
    <section className="mt-16 flex w-full flex-col items-center justify-center px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24 sxl:px-32">
      <div className="flex w-full justify-between">
        <h2 className="inline-block w-fit  font-bold capitalize dark:text-light md:text-4xl">
          Recent Posts
        </h2>
        <Link
          href={"/categories/all"}
          className="inline-block text-base font-medium text-accent underline underline-offset-2 dark:text-accentDark md:text-lg"
        >
          view all
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-1 grid-rows-2 gap-16 sm:grid-cols-2 lg:grid-cols-3">
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
