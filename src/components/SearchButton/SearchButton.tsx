"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function SearchButton() {
  return (
    <Link href="?search-modal=true">
      <SearchIcon className="text-gray-400 mx-2 h-5 w-5" />
    </Link>
  );
}
