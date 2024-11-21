"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Fuse from "fuse.js";
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
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "content"],
        threshold: 0.3,
      }),
    [posts],
  );

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("query", term);
      const results = fuse.search(term);
      setSearchResults(results.map((result) => result.item));
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
              className="dark:bg-gray-800 h-min w-5/6 cursor-default  rounded-lg bg-white shadow-lg sm:w-1/2"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <div className="p-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200 w-full rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <SearchIcon className="text-gray-400 absolute left-3 top-2.5 h-5 w-5" />
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul className="space-y-2">
                      {searchResults.map((post) => (
                        <li
                          key={post.url || post.title}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                        >
                          {post.url ? (
                            <Link
                              href={post.url}
                              className="text-gray-700 dark:text-gray-200 block px-3 py-2 hover:text-blue-500"
                            >
                              {post.title}
                            </Link>
                          ) : (
                            <span className="text-gray-700 dark:text-gray-200 block px-3 py-2">
                              {post.title}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : searchTerm ? (
                    <p className="text-gray-500 dark:text-gray-400 py-4 text-center">
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
