"use client";

import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        placeholder="Search products..."
        className="
          w-full
          border
          rounded-full
          py-2
          pl-10
          pr-4
          outline-none
          focus:ring-2
          focus:ring-black
        "
      />

      <Search
        size={18}
        className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />
    </div>
  );
};

export default SearchBar;