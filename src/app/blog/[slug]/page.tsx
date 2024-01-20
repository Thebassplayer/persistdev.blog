import { allBlogs } from "@/.contentlayer/generated";
import BlogDetails from "@/src/components/Blog/BlogDetails";
import RenderMdx from "@/src/components/Blog/RenderMdx";
import Tag from "@/src/components/Elements/Tag";
import Image from "next/image";

const BlogPage = ({ params }: { params: { slug: string } }) => {
  const blog = allBlogs.find(blog => blog._raw.flattenedPath === params.slug);

  const firstTag = blog?.tags?.[0];

  return (
    <article>
      <div className="mb-8 text-center relative w-full h-[70vh] bg-dark">
        <div className="w-full z-10 flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {firstTag ? (
            <Tag
              link={`/categories/${firstTag}`}
              name={firstTag}
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
        <div className="col-span-4"></div>
        {blog ? <RenderMdx blog={blog} /> : null}
      </div>
    </article>
  );
};

export default BlogPage;
