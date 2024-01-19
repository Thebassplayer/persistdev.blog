import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import Tag from "../Elements/Tag";
import Description from "../Elements/Description";

type HomeCoverSectionProps = {
  blogs: Blog[];
};

const HomeCoverSection = ({ blogs }: HomeCoverSectionProps) => {
  const sortedBlogs = sortBlogs(blogs);
  const latestBlog = sortedBlogs[0];
  const firstTag = latestBlog?.tags?.[0];

  return (
    <div className="w-full inline-block">
      <article className="flex flex-col items-start justify-end mx-10 relative h-[85vh]">
        <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-3xl z-0" />
        {latestBlog?.image ? (
          <Image
            src={latestBlog.image?.filePath.replace("../public", "")}
            alt={latestBlog.title}
            placeholder="blur"
            blurDataURL={latestBlog.image?.blurhashDataUrl}
            fill={true}
            className="w-full h-full object-center object-cover rounded-3xl -z-10"
          />
        ) : null}
        {firstTag ? (
          <div className="w-3/4 p-16 flex flex-col items-start justify-center z-0 text-light">
            <Tag link={`/categories/${firstTag}`} name={firstTag} />
            <Link href={latestBlog.url} className="mt-6">
              <h1 className="font-bold capitalize text-4xl">
                <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] hover:bg-[length:100%_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500">
                  {latestBlog?.title}
                </span>
              </h1>
            </Link>
            <Description description={latestBlog?.description} />
          </div>
        ) : null}
      </article>
    </div>
  );
};

export default HomeCoverSection;
