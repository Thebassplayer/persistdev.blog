"use client";
import { useMDXComponent } from "next-contentlayer/hooks";
import { Blog } from "@/.contentlayer/generated";
import Image from "next/image";

type RenderMdxProps = {
  blog: Blog;
};

const mdxComponent = {
  Image,
};

const RenderMdx = ({ blog }: RenderMdxProps) => {
  const MDXContent = useMDXComponent(blog.body.code);
  return (
    <div
      className="prose col-span-12 max-w-max font-in sm:prose-base md:prose-lg first-letter:text-3xl
    prose-blockquote:rounded-r-lg 
    prose-blockquote:border-accent
    prose-blockquote:bg-accent/20
    prose-blockquote:p-2
    prose-blockquote:px-6
    prose-blockquote:not-italic

    prose-li:marker:text-accent

   

    sm:first-letter:text-5xl
    lg:col-span-8"
    >
      <MDXContent components={mdxComponent} />
    </div>
  );
};

export default RenderMdx;
