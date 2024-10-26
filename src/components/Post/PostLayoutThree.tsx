import { Post } from "@/.contentlayer/generated";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

type PostLayoutThreeProps = {
  post: Post;
};

const PostLayoutThree = ({ post }: PostLayoutThreeProps) => {
  const firstPostTag = post?.tags?.[0];
  return (
    <div className="group flex flex-col items-center text-dark dark:text-light">
      <Link href={post.url} className="h-full overflow-hidden rounded-xl">
        {post?.image ? (
          <Image
            src={post.image?.filePath.replace("../public", "")}
            alt={post.title}
            placeholder="blur"
            blurDataURL={post.image?.blurhashDataUrl}
            height={post.image?.height}
            width={post.image?.width}
            className="ease aspect-[4/3] h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw,(max-width: 1124px) 50vw, 33vw"
          />
        ) : null}
      </Link>
      {firstPostTag ? (
        <div className="mt-4 flex w-full flex-col">
          <span className="block w-full text-xs font-semibold uppercase text-accent dark:text-accentDark sm:text-sm">
            {firstPostTag}
          </span>
          <Link href={post.url} className="my-1 block">
            <h2 className="text-base font-semibold capitalize sm:text-lg">
              <span className="bg-gradient-to-r from-accent/50 to-accent/50 bg-[length:0px_5px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_5px] dark:from-accentDark/50 dark:to-accentDark/50">
                {post?.title}
              </span>
            </h2>
          </Link>
          <span className="block text-sm font-semibold capitalize text-dark/50 dark:text-light/50 sm:text-base">
            {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default PostLayoutThree;
