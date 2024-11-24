"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { SearchInput } from "../SearchInput/SearchInput";
import { SearchResults } from "../SearchResults/SearchResults";
import { useSearch } from "@/src/Hooks/useSearch";
import { Post } from "@/.contentlayer/generated";
import Link from "next/link";

type SearchModalProps = {
  posts: Post[];
};

export function SearchModal({ posts }: SearchModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchModal = searchParams.get("search-modal");

  const { searchResults, searchTerm, setSearchTerm, clearSearch } = useSearch(
    posts,
    ["title", "content"],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("query", e.target.value);
    router.replace(`${pathname}?${params.toString()}`);
  };

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
                <SearchInput
                  value={searchTerm}
                  onChange={handleInputChange}
                  onClear={clearSearch}
                />
                <SearchResults results={searchResults} />
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
}
