import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type BlogLayoutTwoProps = {
  blog: Blog;
};

const BlogLayoutTwo = ({ blog }: BlogLayoutTwoProps) => {
  const firstBlogTag = blog?.tags?.[0];
  return (
    <div className="group grid grid-cols-12 items-center gap-4 text-dark dark:text-light">
      <Link
        href={blog.url}
        className="col-span-12 h-full overflow-hidden rounded-xl lg:col-span-4"
      >
        {blog?.image ? (
          <Image
            src={blog.image?.filePath.replace("../public", "")}
            alt={blog.title}
            placeholder="blur"
            blurDataURL={blog.image?.blurhashDataUrl}
            height={blog.image?.height}
            width={blog.image?.width}
            className="ease aspect-square h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw,(max-width: 1124px) 50vw, 33vw"
          />
        ) : null}
      </Link>
      {firstBlogTag ? (
        <div className="col-span-12 w-full lg:col-span-8">
          <span className="block w-full text-xs font-semibold uppercase text-accent dark:text-accentDark sm:text-sm">
            {firstBlogTag}
          </span>
          <Link href={blog.url} className="my-1 block">
            <h2 className="text-bse font-semibold capitalize sm:text-lg">
              <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_5px] dark:from-accentDark/50 dark:to-accentDark/50">
                {blog?.title}
              </span>
            </h2>
          </Link>
          <span className="block w-full text-xs font-semibold capitalize text-dark/50 dark:text-light/50 sm:text-base">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BlogLayoutTwo;
