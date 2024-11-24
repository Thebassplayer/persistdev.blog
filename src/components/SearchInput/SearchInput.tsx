"use client";

import { XIcon, SearchIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export function SearchInput({ value, onChange, onClear }: SearchInputProps) {
  const searchParams = useSearchParams();
  const searchModal = searchParams.get("search-modal");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchModal]);
  return (
    <div className="relative pb-4">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search posts..."
        className="text-gray-700 w-full rounded-md px-4 py-2 pl-10 shadow-light focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-dark dark:text-light"
      />
      <button
        onClick={onClear}
        title="Clear search"
        className="text-gray-500 hover:text-gray-700 absolute right-3 top-2 dark:text-light/50 dark:hover:text-light"
      >
        <XIcon className="h-6 w-6" />
      </button>
      <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 dark:text-light" />
    </div>
  );
}
