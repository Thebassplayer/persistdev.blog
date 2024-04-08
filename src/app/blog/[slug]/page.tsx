import type { Metadata } from "next";
import { allBlogs } from "@/.contentlayer/generated";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import ButtonTag from "@/src/components/Elements/ButtonTag";
import { slug } from "github-slugger";
import Image from "next/image";
import { siteMetadata } from "@/src/utils/siteMetadata";
import TableOfContent from "@/src/components/Blog/TableOfContent";

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
  const modifiedAt = new Date(blog.updatedAt || blog.publishedAt).toISOString();
  let blogMainImageList: string[] = [siteMetadata.socialBanner];
  if (blog.image && typeof blog.image.filePath === "string") {
    blogMainImageList = [
      siteMetadata.siteUrl + blog.image.filePath.replace("../public", ""),
    ];
  }

  const ogImages = blogMainImageList.map((image) => {
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
  const firstBlogTag = blog?.tags?.[0];
  const datePublished = new Date(blog?.publishedAt ?? "").toISOString();
  const dateModified = new Date(
    ((blog?.updatedAt ?? " ") || blog?.publishedAt) ?? " ",
  ).toISOString();
  const author = blog?.author ? [blog?.author] : siteMetadata.author;

  let blogMainImageList: string[] = [siteMetadata.socialBanner];
  if (blog?.image && typeof blog.image.filePath === "string") {
    blogMainImageList = [
      siteMetadata.siteUrl + blog.image.filePath.replace("../public", ""),
    ];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: blog?.title,
    description: blog?.description,
    image: blogMainImageList,
    datePublished: datePublished,
    dateModified: dateModified,
    author: [
      {
        "@type": "Person",
        name: author,
        url: "https://www.roylopez.dev",
      },
    ],
  };
  if (!blog) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="relative mb-8 h-[30vh] w-full bg-dark text-center">
          <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            {firstBlogTag ? (
              <ButtonTag
                name={firstBlogTag}
                link={`/categories/${slug(firstBlogTag)}`}
                className="px-6 py-2 text-sm"
              />
            ) : null}
            <h1 className="relative mt-6 inline-block w-5/6 text-2xl font-semibold capitalize leading-normal text-light md:text-3xl lg:text-5xl">
              {blog?.title}
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-dark/60 dark:bg-dark/40" />
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
        <div className="mt-8 grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8 sxl:gap-16">
          <div className="col-span-12 lg:col-span-2">
            <TableOfContent blog={blog} />
          </div>
          {blog ? <RenderMdx blog={blog} /> : null}
        </div>
      </article>
    </>
  );
};

export default BlogPage;
