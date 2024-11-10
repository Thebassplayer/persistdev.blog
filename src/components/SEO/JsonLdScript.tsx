import type { Metadata } from "next";
import { allPosts } from "@/.contentlayer/generated";
import { notFound } from "next/navigation";
import { siteMetadata } from "@/src/utils/siteMetadata";

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

  const ogImages =
    post.image && typeof post.image === "string"
      ? [
          {
            url: `${siteMetadata.siteUrl}${(post.image as string).replace("../public", "")}`,
          },
        ]
      : [{ url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}` }];

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

const JsonLdScript = ({ slug }: { slug: string }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === slug);
  const author = post?.author ? [post?.author] : siteMetadata.author;
  const datePublished = new Date(post?.publishedAt ?? "").toISOString();
  const dateModified = new Date(
    ((post?.updatedAt ?? " ") || post?.publishedAt) ?? " ",
  ).toISOString();
  let postMainImageList: string[] = [siteMetadata.socialBanner];
  if (post?.image && typeof post.image.filePath === "string") {
    postMainImageList = [
      siteMetadata.siteUrl + post.image.filePath.replace("../../public", ""),
    ];
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: post?.title,
    description: post?.description,
    image: postMainImageList,
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JsonLdScript;
