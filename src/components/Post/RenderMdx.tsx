"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Post } from "@/.contentlayer/generated";
import Image from "next/image";

type RenderMdxProps = {
  post: Post;
};

const mdxComponent = {
  Image,
};

const RenderMdx = ({ post }: RenderMdxProps) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <div
      className="prose prose-sm col-span-12 max-w-max font-in dark:prose-invert sm:prose-base md:prose-lg first-letter:text-3xl
    prose-blockquote:rounded-r-lg 
    prose-blockquote:border-accent
    prose-blockquote:bg-accent/20
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:not-italic
  prose-li:marker:text-accent
    dark:prose-blockquote:border-accentDark
    dark:prose-blockquote:bg-accentDark/20 dark:prose-li:marker:text-accentDark sm:first-letter:text-5xl lg:col-span-10"
    >
      <MDXContent components={mdxComponent} />
    </div>
  );
};

export default RenderMdx;
