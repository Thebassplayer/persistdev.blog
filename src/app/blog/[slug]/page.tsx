import type { Metadata } from "next";
import { ImageFieldData, allBlogs } from "@/.contentlayer/generated";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import Tag from "@/src/components/Elements/Tag";
import GithubSlugger, { slug } from "github-slugger";
import Image from "next/image";
import { siteMetadata } from "@/src/utils/siteMetadata";

type Heading = {
  level: "one" | "two" | "three" | "four" | "five" | "six";
  slug: string;
  text: string;
};

export async function generateStaticParams() {
  return allBlogs.map((blog) => ({ slug: blog._raw.flattenedPath }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | void> {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);
  if (!blog) return;

  const publishedAt = new Date(blog.publishedAt).toISOString();
  const modifiedAt = new Date(
    blog.publishedAt || blog.publishedAt,
  ).toISOString();
  let imageList: string[] = [siteMetadata.socialBanner];
  if (blog.image && typeof blog.image.filePath === "string") {
    imageList = [
      siteMetadata.siteUrl + blog.image.filePath.replace("../public", ""),
    ];
  }

  const ogImages = imageList.map((image) => {
    return {
      url: image.includes("http") ? image : siteMetadata.siteUrl + image,
    };
  });
  const authors = blog?.author ? [blog.author] : siteMetadata.author;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      url: siteMetadata.siteUrl + blog.url,
      siteName: siteMetadata.title,
      images: ogImages,
      locale: siteMetadata.locale,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      authors: authors.length > 0 ? authors : siteMetadata.author,
    },
    twitter: {
      card: "summary_large_image",
      title: siteMetadata.title,
      description: siteMetadata.description,
      creator: siteMetadata.author,
      images: ogImages,
    },
  };
}

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allBlogs.find((blog) => blog._raw.flattenedPath === params.slug);

  const firstTag = blog?.tags?.[0];

  return (
    <article>
      <div className="relative mb-8 h-[70vh] w-full bg-dark text-center">
        <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          {firstTag ? (
            <Tag
              name={firstTag}
              link={`/categories/${slug(firstTag)}`}
              className="px-6 py-2 text-sm"
            />
          ) : null}
          <h1 className="relative mt-6 inline-block w-5/6 text-5xl font-semibold capitalize leading-normal text-light">
            {blog?.title}
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-dark/60" />
        {blog?.image ? (
          <Image
            src={blog.image?.filePath.replace("../public", "")}
            alt={blog.title}
            placeholder="blur"
            blurDataURL={blog.image?.blurhashDataUrl}
            height={blog.image?.height}
            width={blog.image?.width}
            className="aspect-square h-full w-full object-cover object-center"
          />
        ) : null}
      </div>
      {blog ? <BlogDetails blog={blog} slug={params.slug} /> : null}
      <div className="mt-8 grid grid-cols-12 gap-16 px-10">
        <div className="col-span-4">
          <details
            className="sticky top-6 max-h-[80vh] overflow-hidden overflow-y-auto rounded-lg border border-solid border-dark p-4 text-dark"
            open
          >
            <summary className="ont-semibold cursor-pointer text-lg capitalize">
              Table of Content
            </summary>
            <ul className="mt-4 font-in text-base">
              {blog?.toc.map((heading: Heading) => {
                return (
                  <li key={`#${heading.slug}`} className="py-1">
                    <a
                      href={`#${heading.slug}`}
                      data-level={heading.level}
                      className="flex  items-center justify-start border-solid border-dark/40 data-[level=two]:border-t data-[level=three]:pl-4 data-[level=two]:pl-0 data-[level=two]:pt-2 sm:data-[level=three]:pl-6"
                    >
                      {heading.level === "three" ? (
                        <span className="mr-2 flex h-1 w-1 rounded-full bg-dark">
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
