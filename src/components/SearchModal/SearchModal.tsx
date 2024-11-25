"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Fuse, { FuseResult } from "fuse.js";
import { Post } from "@/.contentlayer/generated";
import { XIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchResults } from "../SearchResults/SearchResults";

type SearchModalProps = {
  posts: Post[];
};

export function SearchModal({ posts }: SearchModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchModal = searchParams.get("search-modal");
  const [searchResults, setSearchResults] = useState<FuseResult<Post>[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: ["title", "content"],
        threshold: 0.4, // Adjust for fuzziness
        includeMatches: true, // Include match details for highlighting
        isCaseSensitive: false,
      }),
    [posts],
  );

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

  const clearSearchInput = useCallback(() => {
    if (searchTerm === "") {
      router.replace(pathname);
    }
    setSearchTerm("");
    handleSearch("");
  }, [handleSearch, setSearchTerm, searchTerm, router, pathname]);

  const handleCloseModal = useCallback(() => {
    router.replace(pathname);
    setSearchTerm("");
  }, [router, setSearchTerm, pathname]);

  return (
    <>
      {searchModal && (
        <div
          className="fixed left-1/2 z-50 flex h-screen w-screen -translate-x-1/2 justify-center bg-black bg-opacity-50 py-20"
          role="dialog"
          aria-modal="true"
          aria-labelledby="search-modal-title"
          onClick={handleCloseModal}
        >
          <div
            className="h-min w-5/6 cursor-default rounded-lg bg-white shadow-lg dark:bg-dark sm:w-1/2"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div className="p-6">
              <SearchInput
                value={searchTerm}
                onChange={handleInputChange}
                onClear={clearSearchInput}
              />
              <SearchResults
                searchResults={searchResults}
                searchTerm={searchTerm}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
