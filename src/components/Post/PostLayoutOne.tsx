import { Post } from "@/.contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import ButtonTag from "../Elements/ButtonTag";
import { slug } from "github-slugger";

type PostLayoutOneProps = {
  post: Post;
};

const PostLayoutOne = ({ post }: PostLayoutOneProps) => {
  const firstPostTag = post?.tags?.[0];
  return (
    <div className="group inline-block cursor-pointer overflow-hidden rounded-xl">
      <div className="absolute bottom-0 left-0 right-0 top-0 z-10 h-full rounded-3xl bg-gradient-to-b from-transparent from-0% to-dark/90" />
      {post?.image ? (
        <Image
          src={post.image?.filePath.replace("../public", "")}
          alt={post.title}
          placeholder="blur"
          blurDataURL={post.image?.blurhashDataUrl}
          height={post.image?.height}
          width={post.image?.width}
          className="ease h-full w-full rounded-xl object-cover object-center transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 1180px) 100vw, 50vw"
        />
      ) : null}
      {firstPostTag ? (
        <div className="w-fll absolute bottom-0 z-20 p-4 xs:p-6 sm:p-10">
          <ButtonTag
            link={`/categories/${slug(firstPostTag)}`}
            name={firstPostTag}
            className="!border px-6 py-1 text-xs sm:py-2 sm:text-sm"
          />
          <Link href={post.url} className="mt-6">
            <h2 className="ms:text-xl mt-2 text-sm font-bold capitalize text-light xs:text-base sm:mt-4 md:text-2xl">
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_5px]">
                {post?.title}
              </span>
            </h2>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default PostLayoutOne;
