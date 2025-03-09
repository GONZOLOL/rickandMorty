import React from "react";
import { FaRedo } from "react-icons/fa";

interface FilterProps {
  info: { prev: string | null; next: string | null };
  filters: { name: string; species: string; gender: string; status: string };
  handlePageChange: (url: string) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleResetFilters: () => void;
  currentPage: number;
  totalPages: number;
}

const Filter: React.FC<FilterProps> = ({
  info,
  filters,
  handlePageChange,
  handleSearchChange,
  handleFilterChange,
  handleResetFilters,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="homePage-topNavigation">
      <div className="homePage-topNavigationButtons">
        <button
          onClick={() => info.prev && handlePageChange(info.prev)}
          disabled={!info.prev}
        >
          Previous
        </button>
        <button
          onClick={() => info.next && handlePageChange(info.next)}
          disabled={!info.next}
        >
          Next
        </button>
        <div className="homePage-pageInfo">
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>
      <div className="homePage-filters">
        <input
          type="text"
          placeholder="Search characters..."
          value={filters.name}
          onChange={handleSearchChange}
        />
        <select
          name="species"
          value={filters.species}
          onChange={handleFilterChange}
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <button className="resetButton" onClick={handleResetFilters}>
          <FaRedo />
        </button>
      </div>
    </div>
  );
};

export default Filter;
