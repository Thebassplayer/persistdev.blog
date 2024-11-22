"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Fuse, { FuseResult, FuseResultMatch } from "fuse.js";
import { Post } from "@/.contentlayer/generated";
import { XIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

type SearchModalProps = {
  posts: Post[];
};

export function SearchModal({ posts }: SearchModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const [searchResults, setSearchResults] = useState<FuseResult<Post>[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "content"],
        threshold: 0.3, // Adjust for fuzziness
        includeMatches: true, // Include match details for highlighting
      }),
    [posts],
  );

  const getHighlightedContent = (
    matches: FuseResultMatch[],
    contentKey: string,
    trimLength = 100,
  ): React.ReactNode | null => {
    const match = matches.find((m) => m.key === contentKey);
    if (match && match.value) {
      const value = match.value as string;

      // Trim the content for context display
      const start = Math.max(match.indices[0][0] - trimLength / 2, 0);
      const end = Math.min(match.indices[0][1] + trimLength / 2, value.length);
      const content = value.slice(start, end);

      let lastIndex = start;
      const highlightedContent: React.ReactNode[] = [];

      // Filter and sort the match indices to ensure they represent a valid sequence
      const contiguousMatches = match.indices.filter(([startIdx, endIdx]) => {
        // Check if the match length is > 1 (no single-character matches)
        return endIdx - startIdx > 0;
      });

      // Process matches
      contiguousMatches.forEach(([matchStart, matchEnd]) => {
        if (matchStart > lastIndex) {
          // Add non-highlighted content before the match
          highlightedContent.push(
            content.slice(lastIndex - start, matchStart - start),
          );
        }

        // Add the entire matching substring as highlighted
        highlightedContent.push(
          <mark key={matchStart} className="bg-accent dark:bg-accentDark">
            {content.slice(matchStart - start, matchEnd + 1 - start)}
          </mark>,
        );
        lastIndex = matchEnd + 1; // Move the pointer after the current match
      });

      // Add remaining non-highlighted content
      if (lastIndex < end) {
        highlightedContent.push(content.slice(lastIndex - start));
      }

      return (
        <>
          {start > 0 && "..."}
          {highlightedContent}
          {end < value.length && "..."}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    if (search && inputRef.current) {
      inputRef.current.focus();
    }
  }, [search]);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
      const results = fuse.search(term);
      setSearchResults(results);
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
      {search && (
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
                <div className="relative">
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
                    <ul className="space-y-4 first:pt-4">
                      {searchResults.map(({ item, matches }) => {
                        const highlightedExcerpt = getHighlightedContent(
                          matches?.slice() || [],
                          "content",
                        );

                        return (
                          <li key={item.url || item.title}>
                            <Link href={item.url}>
                              <h2 className="text-gray-700 line-clamp-1 bg-gradient-to-r from-accent to-accent bg-[length:0px_5px] bg-left-bottom bg-no-repeat font-bold transition-[background-size] duration-500 hover:bg-[length:100%_5px] dark:from-accentDark dark:to-accentDark/50 dark:text-light sm:line-clamp-2 sm:text-xl">
                                {item.title}
                              </h2>
                            </Link>
                            {highlightedExcerpt && (
                              <p className="text-gray-600 text-xs dark:text-light">
                                {highlightedExcerpt}
                              </p>
                            )}
                          </li>
                        );
                      })}
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
