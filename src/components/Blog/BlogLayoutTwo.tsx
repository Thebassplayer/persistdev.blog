import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

type BlogLayoutTwoProps = {
  blog: Blog;
};

const BlogLayoutTwo = ({ blog }: BlogLayoutTwoProps) => {
  const firstTag = blog?.tags?.[0];
  return (
    <div className="grid grid-cols-12 gap-4 items-center text-dark">
      <Link
        href={blog.url}
        className="col-span-4 h-full rounded-xl overflow-hidden"
      >
        {blog?.image ? (
          <Image
            src={blog.image?.filePath.replace("../public", "")}
            alt={blog.title}
            placeholder="blur"
            blurDataURL={blog.image?.blurhashDataUrl}
            height={blog.image?.height}
            width={blog.image?.width}
            className="aspect-square w-full h-full object-center object-cover"
          />
        ) : null}
      </Link>
      {firstTag ? (
        <div className="col-span-12 lg:col-span-8 w-full">
          <span className="block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
            {firstTag}
          </span>
          <Link href={blog.url} className="block my-1">
            <h2 className="font-semibold capitalize text-lg">
              <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_5px] hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {blog?.title}
              </span>
            </h2>
          </Link>
          <span className="block capitalize text-dark/50 font-semibold text-base">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default BlogLayoutTwo;
