import { Post } from "@/.contentlayer/generated";
import { sortPosts } from "@/src/utils/Post";
import PostLayoutOne from "../Post/PostLayoutOne";
import PostLayoutTwo from "../Post/PostLayoutTwo";

type FeaturedPostProps = {
  posts: Post[];
};

const FeaturedPost = ({ posts }: FeaturedPostProps) => {
  const sortedBlogs = sortPosts(posts);
  return (
    <section className="mt-16 flex w-full flex-col items-center justify-center px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24 sxl:px-32">
      <h2 className="inline-block w-full font-bold capitalize dark:text-light md:text-4xl">
        Featured Posts
      </h2>

      <div className="mt:10 grid grid-cols-2 grid-rows-2 gap-6 sm:mt-16">
        <article className="relative col-span-2 row-span-2 sxl:col-span-1">
          <PostLayoutOne post={sortedBlogs[1]} />
        </article>
        <article className="relative col-span-2 row-span-1 sm:col-span-1">
          <PostLayoutTwo post={sortedBlogs[2]} />
        </article>
        <article className="relative col-span-2 row-span-1 sm:col-span-1">
          <PostLayoutTwo post={sortedBlogs[3]} />
        </article>
      </div>
    </section>
  );
};

export default FeaturedPost;
