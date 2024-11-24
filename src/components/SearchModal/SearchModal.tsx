"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Fuse, { FuseResult } from "fuse.js";
import { Post } from "@/.contentlayer/generated";
import { XIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type SearchModalProps = {
  posts: Post[];
};

export function SearchModal({ posts }: SearchModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchModal = searchParams.get("search-modal");
  const [searchResults, setSearchResults] = useState<FuseResult<Post>[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "content"],
        threshold: 0.1, // Adjust for fuzziness
        includeMatches: true, // Include match details for highlighting
        isCaseSensitive: false,
      }),
    [posts],
  );

  const highlight = (
    fuseSearchResults: FuseResult<Post>[],
    highlightClassName: string = "bg-accent dark:bg-accentDark dark:text-dark",
    minMatchLength: number = 3, // Add this parameter
  ) => {
    const generateHighlightedText = (
      inputText: string,
      regions: [number, number][] = [],
    ) => {
      let content = "";
      let nextUnhighlightedRegionStartingIndex = 0;

      regions.forEach(([start, end]) => {
        // Only highlight if the match length is greater than or equal to minMatchLength
        if (end - start + 1 >= minMatchLength) {
          content += [
            inputText.substring(nextUnhighlightedRegionStartingIndex, start),
            `<span class="${highlightClassName}">`,
            inputText.substring(start, end + 1),
            "</span>",
          ].join("");
          nextUnhighlightedRegionStartingIndex = end + 1;
        }
      });

      content += inputText.substring(nextUnhighlightedRegionStartingIndex);
      return content;
    };

    return fuseSearchResults
      .filter(({ matches }) => matches && matches.length)
      .map(({ item, matches }) => {
        const highlightedItem: any = { ...item };
        matches?.forEach((match) => {
          if (match?.key) {
            highlightedItem[match.key as keyof Post] = generateHighlightedText(
              match.value || "",
              match.indices as [number, number][],
            );
          }
        });
        return highlightedItem;
      });
  };

  const getHighlightedContent = (
    fuseSearchResults: FuseResult<Post>[],
    contentKey: string,
  ) => {
    const highlightedResults = highlight(fuseSearchResults);

    return highlightedResults.map((result) => {
      const highlightedContent = result[contentKey];
      if (highlightedContent) {
        return (
          <span
            key={result._id || result.title} // Ensure a unique key
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        );
      }
      return null;
    });
  };

  useEffect(() => {
    if (searchModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchModal]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
      const results = fuse.search(term);
      setSearchResults(results); // Original Fuse results
    } else {
      params.delete("query");
      setSearchResults([]);
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value;
      setSearchTerm(term);
      handleSearch(term);
    },
    [handleSearch],
  );

  const clearSearch = useCallback(() => {
    setSearchTerm("");
    handleSearch("");
  }, [handleSearch, setSearchTerm]);

  return (
    <>
      {searchModal && (
        <Link href={pathname} className="fixed inset-0 z-50 cursor-default">
          <div
            className="fixed left-1/2 z-50 flex h-screen w-screen -translate-x-1/2 justify-center bg-black bg-opacity-50 py-20"
            role="dialog"
            aria-modal="true"
            aria-labelledby="search-modal-title"
          >
            <div
              className="h-min w-5/6 cursor-default rounded-lg bg-white shadow-lg dark:bg-dark sm:w-1/2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="p-6">
                <div className="relative pb-4">
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="text-gray-700 
                    w-full rounded-md px-4 py-2 pl-10 shadow-[rgba(0,_0,_0,_0)_0px_0px_8px] shadow-light focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark dark:text-light"
                  />
                  <button
                    title="Clear search"
                    onClick={clearSearch}
                    className="text-gray-500 hover:text-gray-700 absolute right-3 top-2 dark:text-light/50 dark:hover:text-light"
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                  <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 dark:text-light" />
                </div>
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
                                  blurDataURL={
                                    result.item?.image?.blurhashDataUrl
                                  }
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
                              {
                                getHighlightedContent(searchResults, "content")[
                                  index
                                ]
                              }
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
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
