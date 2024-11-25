import Link from "next/link";
import Image from "next/image";
import SearchRaulIcon from "../SearchRaulIcon/SearchRaulIcon";
import { getHighlightedContent } from "@/src/utils/fuse/highlightText";
import { FuseResult } from "fuse.js";
import { Post } from "@/.contentlayer/generated";

type SearchResultsProps = {
  searchResults: FuseResult<Post>[];
  searchTerm: string;
};

export function SearchResults({
  searchResults,
  searchTerm,
}: SearchResultsProps) {
  const highlightedContent = getHighlightedContent(searchResults, "content");

  return (
    <div className="max-h-96 overflow-y-auto">
      {searchResults.length > 0 ? (
        <ul className="w-full space-y-6 first:pt-4">
          {searchResults.map((result, index) => (
            <li key={index}>
              <Link href={result.item.url || "#"}>
                <div className="mb-2 flex items-center gap-2">
                  {result.item.image ? (
                    <Image
                      src={
                        result?.item?.image?.filePath.replace(
                          "../public",
                          "",
                        ) ?? ""
                      }
                      alt={result.item.title}
                      placeholder="blur"
                      blurDataURL={result.item?.image?.blurhashDataUrl}
                      width={10}
                      height={10}
                      className="w-8 rounded-sm object-cover object-center"
                      priority
                    />
                  ) : null}
                  <h2 className="text-gray-700 line-clamp-1 w-full bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] bg-left-bottom bg-no-repeat font-bold transition-[background-size] duration-500 hover:bg-[length:100%_5px] dark:from-accentDark dark:to-accentDark/50 dark:text-light sm:text-xl">
                    {result.item.title}
                  </h2>
                </div>
                <p className="text-gray-600 line-clamp-1 text-xs dark:text-light">
                  {highlightedContent}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : searchTerm ? (
        <p className="text-gray-500 py-4 text-center dark:text-light">
          No results found
        </p>
      ) : null}
    </div>
  );
}
