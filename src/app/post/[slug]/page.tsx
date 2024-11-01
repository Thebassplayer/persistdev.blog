import { allPosts } from "@/.contentlayer/generated";
import PostDetails from "@/src/components/Post/PostDetails";
import RenderMdx from "@/src/components/Post/RenderMdx";
import ButtonTag from "@/src/components/Elements/ButtonTag";
import { slug } from "github-slugger";
import Image from "next/image";
import TableOfContent from "@/src/components/Post/TableOfContent";
import JsonLdScript from "@/src/components/SEO/JsonLdScript";

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post._raw.flattenedPath }));
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  const firstPostTag = post?.tags?.[0];
  const postImage = post?.image?.filePath.replace("../public", "") ?? "";

  if (!post)
    return (
      <div className="*:font-mono flex grow flex-col items-center justify-center">
        <h1 className=" text-white">404 - Post not found</h1>
        <a href="/" className="text-blue-400">
          Return Home
        </a>
      </div>
    );

  return (
    <>
      <JsonLdScript slug={params.slug} />
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
              src={postImage}
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

export default PostPage;
