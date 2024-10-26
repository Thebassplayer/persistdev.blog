import type { Metadata } from "next";
import { allPosts } from "@/.contentlayer/generated";
import PostDetails from "@/src/components/Post/PostDetails";
import RenderMdx from "@/src/components/Post/RenderMdx";
import ButtonTag from "@/src/components/Elements/ButtonTag";
import { slug } from "github-slugger";
import Image from "next/image";
import { siteMetadata } from "@/src/utils/siteMetadata";
import TableOfContent from "@/src/components/Post/TableOfContent";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | void> {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) {
    notFound();
  }

  const publishedAt = new Date(post.publishedAt).toISOString();
  const modifiedAt = new Date(post.updatedAt || post.publishedAt).toISOString();
  let blogMainImageList: string[] = [siteMetadata.socialBanner];
  if (post.image && typeof post.image.filePath === "string") {
    blogMainImageList = [
      siteMetadata.siteUrl + post.image.filePath.replace("../public", ""),
    ];
  }

  const ogImages = blogMainImageList.map((image) => {
    return {
      url: image.includes("http") ? image : siteMetadata.siteUrl + image,
    };
  });
  const authors = post?.author ? [post.author] : siteMetadata.author;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: siteMetadata.siteUrl + post.url,
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
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  const firstPostTag = post?.tags?.[0];
  const datePublished = new Date(post?.publishedAt ?? "").toISOString();
  const dateModified = new Date(
    ((post?.updatedAt ?? " ") || post?.publishedAt) ?? " ",
  ).toISOString();
  const author = post?.author ? [post?.author] : siteMetadata.author;

  let blogMainImageList: string[] = [siteMetadata.socialBanner];
  if (post?.image && typeof post.image.filePath === "string") {
    blogMainImageList = [
      siteMetadata.siteUrl + post.image.filePath.replace("../public", ""),
    ];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post?.title,
    description: post?.description,
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
  if (!post) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <div className="relative mb-8 h-[30vh] w-full bg-dark text-center">
          <div className="absolute left-1/2 top-1/2 z-10 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
            {firstPostTag ? (
              <ButtonTag
                name={firstPostTag}
                link={`/categories/${slug(firstPostTag)}`}
                className="px-6 py-2 text-sm"
              />
            ) : null}
            <h1 className="relative mt-6 inline-block w-5/6 text-2xl font-semibold capitalize leading-normal text-light md:text-3xl lg:text-5xl">
              {post?.title}
            </h1>
          </div>
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full bg-dark/60 dark:bg-dark/40" />
          {post?.image ? (
            <Image
              src={post.image?.filePath.replace("../public", "")}
              alt={post.title}
              placeholder="blur"
              blurDataURL={post.image?.blurhashDataUrl}
              height={post.image?.height}
              width={post.image?.width}
              className="aspect-square h-full w-full object-cover object-center"
            />
          ) : null}
        </div>
        {post ? <PostDetails post={post} slug={params.slug} /> : null}
        <div className="mt-8 grid grid-cols-12 gap-y-8 px-5 md:px-10 lg:gap-8 sxl:gap-16">
          <div className="col-span-12 lg:col-span-2">
            <TableOfContent post={post} />
          </div>
          {post ? <RenderMdx post={post} /> : null}
        </div>
      </article>
    </>
  );
};

export default BlogPage;
