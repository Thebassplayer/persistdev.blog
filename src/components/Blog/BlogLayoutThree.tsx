import { Blog } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type BlogLayoutThreeProps = {
  blog: Blog;
};

const BlogLayoutThree = ({ blog }: BlogLayoutThreeProps) => {
  const firstBlogTag = blog?.tags?.[0];
  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      <Link href={blog.url} className="h-full overflow-hidden rounded-xl">
        {blog?.image ? (
          <Image
            src={blog.image?.filePath.replace("../public", "")}
            alt={blog.title}
            placeholder="blur"
            blurDataURL={blog.image?.blurhashDataUrl}
            height={blog.image?.height}
            width={blog.image?.width}
            className="ease aspect-[4/3] h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw,(max-width: 1124px) 50vw, 33vw"
          />
        ) : null}
      </Link>
      {firstBlogTag ? (
        <div className="mt-4 flex w-full flex-col">
          <span className="block w-full text-xs font-semibold uppercase text-accent dark:text-accentDark sm:text-sm">
            {firstBlogTag}
          </span>
          <Link href={blog.url} className="my-1 block">
            <h2 className="text-base font-semibold capitalize sm:text-lg">
              <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_5px] dark:from-accentDark/50 dark:to-accentDark/50">
                {blog?.title}
              </span>
            </h2>
          </Link>
          <span className="block text-sm font-semibold capitalize text-dark/50 dark:text-light/50 sm:text-base">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BlogLayoutThree;
