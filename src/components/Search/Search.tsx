"use client";

import { SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Search() {
  return (
    <Link href="?search=true">
      <SearchIcon className="text-gray-400 mx-2 h-5 w-5" />
    </Link>
  );
}
