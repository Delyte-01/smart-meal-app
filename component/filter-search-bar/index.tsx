// components/SearchAndFilterBar.tsx
"use client";

import { useState } from "react";

export default function SearchAndFilterBar({
  onSearch,
  onFilter,
}: {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedFilter(value);
    onFilter(value);
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search recipes..."
        className="w-full sm:w-1/2 px-4 py-2 border rounded-lg"
      />

      <select
        value={selectedFilter}
        onChange={handleFilter}
        className="w-full sm:w-1/3 px-4 py-2 border rounded-lg"
      >
        <option value="all">All</option>
        <option value="quick">Quick (≤ 20 mins)</option>
        <option value="lowCal">Low Cal (≤ 300 cal)</option>
      </select>
    </div>
  );
}
