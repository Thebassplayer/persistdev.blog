import { Blog } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type BlogLayoutThreeProps = {
  blog: Blog;
};

const BlogLayoutThree = ({ blog }: BlogLayoutThreeProps) => {
  const firstTag = blog?.tags?.[0];
  return (
    <div className="group flex flex-col items-center text-dark">
      <Link href={blog.url} className="h-full rounded-xl overflow-hidden">
        {blog?.image ? (
          <Image
            src={blog.image?.filePath.replace("../public", "")}
            alt={blog.title}
            placeholder="blur"
            blurDataURL={blog.image?.blurhashDataUrl}
            height={blog.image?.height}
            width={blog.image?.width}
            className="aspect-[4/3] w-full h-full object-center object-cover group-hover:scale-105 transition-all ease duration-300"
          />
        ) : null}
      </Link>
      {firstTag ? (
        <div className="flex flex-col w-full mt-4">
          <span className="block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
            {firstTag}
          </span>
          <Link href={blog.url} className="block my-1">
            <h2 className="font-semibold capitalize text-lg">
              <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_5px] group-hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
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

export default BlogLayoutThree;
