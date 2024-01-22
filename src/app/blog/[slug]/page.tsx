import { allBlogs } from "@/.contentlayer/generated";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import Tag from "@/src/components/Elements/Tag";
import GithubSlugger, { slug } from "github-slugger";
import Image from "next/image";

type Heading = {
  level: "one" | "two" | "three" | "four" | "five" | "six";
  slug: string;
  text: string;
};

const slugger = new GithubSlugger();

export async function generateStaticParams() {
  return allBlogs.map(blog => ({ slug: blog._raw.flattenedPath }));
}

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allBlogs.find(blog => blog._raw.flattenedPath === params.slug);

  const firstTag = blog?.tags?.[0];

  return (
    <article>
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {firstTag ? (
            <Tag
              name={firstTag}
              link={`/categories/${slug(firstTag)}`}
              className="px-6 text-sm py-2"
            />
          ) : null}
          <h1 className="inline-block mt-6 font-semibold capitalize text-light text-5xl leading-normal relative w-5/6">
            {blog?.title}
          </h1>
        </div>
        <div className="absolute top-0 left-0 right-0 bottom-0 h-full bg-dark/60" />
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
      </div>
      {blog ? <BlogDetails blog={blog} slug={params.slug} /> : null}
      <div className="grid grid-cols-12 gap-16 mt-8 px-10">
        <div className="col-span-4">
          <details
            className="border border-solid border-dark text-dark rounded-lg p-4 sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto"
            open
          >
            <summary className="text-lg ont-semibold capitalize cursor-pointer">
              Table of Content
            </summary>
            <ul className="mt-4 font-in text-base">
              {blog?.toc.map((heading: Heading) => {
                return (
                  <li key={`#${heading.slug}`} className="py-1">
                    <a
                      href={`#${heading.slug}`}
                      data-level={heading.level}
                      className="data-[level=two]:pl-0  data-[level=two]:pt-2 data-[level=two]:border-t border-solid border-dark/40 data-[level=three]:pl-4 sm:data-[level=three]:pl-6 flex items-center justify-start"
                    >
                      {heading.level === "three" ? (
                        <span className="flex w-1 h-1 rounded-full bg-dark mr-2">
                          &nbsp;
                        </span>
                      ) : null}

                      <span className="hover:underline">{heading.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </details>
        </div>
        {blog ? <RenderMdx blog={blog} /> : null}
      </div>
    </article>
  );
};

export default BlogPage;
