import type { Post } from "@/src/content/generated";
import PostLayoutThree from "./PostLayoutThree";

type RelatedPostsProps = {
  posts: Post[];
};

const RelatedPosts = ({ posts }: RelatedPostsProps) => {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 flex w-full flex-col px-5 sm:mt-24 sm:px-10 md:mt-32 md:px-24 sxl:px-32">
      <h2 className="inline-block w-fit font-bold capitalize text-dark dark:text-light md:text-4xl">
        Related Posts
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-16">
        {posts.map((post) => (
          <article key={post._id}>
            <PostLayoutThree post={post} />
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
