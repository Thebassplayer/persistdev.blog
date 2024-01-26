import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import Tag from "../Elements/Tag";
import { slug } from "github-slugger";

type BlogLayoutOneProps = {
  blog: Blog;
};

const BlogLayoutOne = ({ blog }: BlogLayoutOneProps) => {
  const firstTag = blog?.tags?.[0];
  return (
    <div className="group inline-block cursor-pointer overflow-hidden rounded-xl">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full rounded-3xl bg-gradient-to-b from-transparent from-0% to-dark/90" />
      {blog?.image ? (
        <Image
          src={blog.image?.filePath.replace("../public", "")}
          alt={blog.title}
          placeholder="blur"
          blurDataURL={blog.image?.blurhashDataUrl}
          height={blog.image?.height}
          width={blog.image?.width}
          className="ease h-full w-full rounded-xl object-cover object-center transition-all duration-300 group-hover:scale-105"
        />
      ) : null}
      {firstTag ? (
        <div className="w-fll absolute bottom-0 z-20 p-4 xs:p-6 sm:p-10">
          <Tag
            link={`/categories/${slug(firstTag)}`}
            name={firstTag}
            className="!border px-6 py-1 text-xs sm:py-2 sm:text-sm"
          />
          <Link href={blog.url} className="mt-6">
            <h2 className="ms:text-xl mt-2 text-sm font-bold capitalize text-light xs:text-base sm:mt-4 md:text-2xl">
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_5px]">
                {blog?.title}
              </span>
            </h2>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default BlogLayoutOne;
