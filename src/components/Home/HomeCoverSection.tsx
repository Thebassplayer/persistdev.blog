import { Blog } from "@/.contentlayer/generated";
import { sortBlogs } from "@/src/utils";
import Image from "next/image";
import Link from "next/link";
import Tag from "../Elements/Tag";
import Description from "../Elements/Description";
import { slug } from "github-slugger";

type HomeCoverSectionProps = {
  blogs: Blog[];
};

const HomeCoverSection = ({ blogs }: HomeCoverSectionProps) => {
  const sortedBlogs = sortBlogs(blogs);
  const latestBlog = sortedBlogs[0];
  const firstTag = latestBlog?.tags?.[0];

  return (
    <div className="inline-block w-full">
      <article className="relative mx-5 flex h-[60vh] flex-col items-start justify-end sm:mx-10 sm:h-[85vh]">
        <div className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full rounded-3xl bg-gradient-to-b from-transparent from-0% to-dark/90" />
        {latestBlog?.image ? (
          <Image
            src={latestBlog.image?.filePath.replace("../public", "")}
            alt={latestBlog.title}
            placeholder="blur"
            blurDataURL={latestBlog.image?.blurhashDataUrl}
            fill={true}
            className="-z-10 h-full w-full rounded-3xl object-cover object-center"
            priority
            sizes="100vw"
          />
        ) : null}
        {firstTag ? (
          <div className="z-0 flex w-full flex-col items-start justify-center p-6 text-light sm:p-8 md:p-12 lg:w-3/4 lg:p-16">
            <Tag link={`/categories/${slug(firstTag)}`} name={firstTag} />
            <Link href={latestBlog.url} className="mt-6">
              <h1 className="md-text-3xl text-lg font-bold capitalize sm:text-xl lg:text-4xl">
                <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_5px] dark:from-accentDark dark:to-accentDark/50">
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
