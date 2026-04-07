import { evaluate } from "@mdx-js/mdx";
import Image from "next/image";
import * as runtime from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

type RenderMdxProps = {
  source: string;
};

const mdxComponent = {
  Image,
};

const codeOptions = {
  theme: "github-dark",
  grid: false,
};

const RenderMdx = async ({ source }: RenderMdxProps) => {
  const { default: MDXContent } = await evaluate(
    source,
    {
      ...(runtime as any),
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "append" }],
        [rehypePrettyCode, codeOptions],
      ],
    } as any,
  );

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
