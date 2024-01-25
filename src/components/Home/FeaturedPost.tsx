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
    <section className="w-full mt-16 sm:mt-24 md:mt-32 sm:px-10 px-5 md:px-24 sxg:px-32 flex flex-col items-center justify-center">
      <h2 className="w-full inline-block font-bold capitalize md:text-4xl dark:text-light">
        Featured Posts
      </h2>
      <div className="grid grid-cols-2 grid-rows-2 gap-6 mt-16">
        <article className="col-span-1 row-span-2 relative">
          <BlogLayoutOne blog={sortedBlogs[1]} />
        </article>
        <article className="col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={sortedBlogs[2]} />
        </article>
        <article className="col-span-1 row-span-1 relative">
          <BlogLayoutTwo blog={sortedBlogs[3]} />
        </article>
      </div>
    </section>
  );
};

export default FeaturedPost;
