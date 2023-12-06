import { Button } from 'antd';
import React from 'react';

type Filters = {
  searchText: string;
  location: string;
};

interface FiltersProps {
  filters: Filters;
  setFilters: (credentials: Filters) => void;
  getData: () => void;
}

export default function Filters({
  filters,
  setFilters,
  getData,
}: FiltersProps) {
  return (
    <div className="flex gap-3 my-3 items-end p-2">
      <div>
        <span>Search Jobs</span>
        <input
          type="text"
          value={filters.searchText}
          onChange={(e) =>
            setFilters({ ...filters, searchText: e.target.value })
          }
          placeholder="Search Jobs"
        />
      </div>

      <div>
        <span>Location</span>
        <select
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <option value=""></option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Brasil">Brasil</option>
          <option value="Canada">Canada</option>
        </select>
      </div>

      <Button type="primary" onClick={getData}>
        Filter
      </Button>
    </div>
  );
}
