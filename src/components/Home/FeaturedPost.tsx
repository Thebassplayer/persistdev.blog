import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/src/utils";
import BlogLayoutOne from "../Blog/BlogLayoutOne";
import BlogLayoutTwo from "../Blog/BlogLayoutTwo";

type FeaturedPostProps = {
  blogs: Blog[];
};

const FeaturedPost = ({ blogs }: FeaturedPostProps) => {
  const sortedBlogs = sortBlogs(blogs);
  return (
    <section className="sxg:px-32 mt-16 flex w-full flex-col items-center justify-center px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24">
      <h2 className="inline-block w-full font-bold capitalize dark:text-light md:text-4xl">
        Featured Posts
      </h2>

      <div className="mt:10 grid grid-cols-2 grid-rows-2 gap-6 sm:mt-16">
        <article className="relative col-span-2 row-span-2 sxl:col-span-1">
          <BlogLayoutOne blog={sortedBlogs[1]} />
        </article>
        <article className="relative col-span-2 row-span-1 sm:col-span-1">
          <BlogLayoutTwo blog={sortedBlogs[2]} />
        </article>
        <article className="relative col-span-2 row-span-1 sm:col-span-1">
          <BlogLayoutTwo blog={sortedBlogs[3]} />
        </article>
      </div>
    </section>
  );
};

export default FeaturedPost;
