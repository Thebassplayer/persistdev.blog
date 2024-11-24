import { useMemo, useState } from "react";
import Fuse, { FuseResult } from "fuse.js";
import { useDebouncedCallback } from "use-debounce";

export function useSearch<T>(
  items: T[],
  searchKeys: string[],
  options = { threshold: 0.1, includeMatches: true, isCaseSensitive: false },
) {
  const [searchResults, setSearchResults] = useState<FuseResult<T>[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(
    () => new Fuse(items, { keys: searchKeys, ...options }),
    [items, searchKeys, options],
  );

  const search = useDebouncedCallback((term: string) => {
    if (term) {
      setSearchResults(fuse.search(term));
    } else {
      setSearchResults([]);
    }
  }, 300);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    search(term);
  };

  return {
    searchResults,
    searchTerm,
    setSearchTerm: handleSearch,
    clearSearch: () => handleSearch(""),
  };
}
