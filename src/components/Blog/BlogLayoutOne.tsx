import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import Tag from "../Elements/Tag";

type BlogLayoutOneProps = {
  blog: Blog;
};

const BlogLayoutOne = ({ blog }: BlogLayoutOneProps) => {
  const firstTag = blog?.tags?.[0];
  return (
    <div className="inline-block overflow-hidden rounded-xl">
      <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-10" />
      {blog?.image ? (
        <Image
          src={blog.image?.filePath.replace("../public", "")}
          alt={blog.title}
          placeholder="blur"
          blurDataURL={blog.image?.blurhashDataUrl}
          height={blog.image?.height}
          width={blog.image?.width}
          className="w-full h-full object-center object-cover rounded-xl"
        />
      ) : null}
      {firstTag ? (
        <div className="absolute bottom-0 p-10 z-20 w-fll">
          <Tag
            link={`/categories/${firstTag}`}
            name={firstTag}
            className="px-6 text-sm py-2 !border"
          />
          <Link href={blog.url} className="mt-6">
            <h1 className="font-bold capitalize text-2xl text-light mt-4">
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                {blog?.title}
              </span>
            </h1>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default BlogLayoutOne;
