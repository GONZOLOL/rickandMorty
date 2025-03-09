// src/components/filters/Filter.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter from "../components/filters/Filter";

const filters = {
  name: "",
  species: "",
  gender: "",
  status: "",
};

const info = {
  prev: null,
  next: "2",
};

test("renders filter component", () => {
  render(
    <Filter
      info={info}
      filters={filters}
      handlePageChange={() => {}}
      handleSearchChange={() => {}}
      handleFilterChange={() => {}}
      handleResetFilters={() => {}}
      currentPage={1}
      totalPages={10}
    />
  );

  expect(screen.getByPlaceholderText(/search characters/i)).toBeInTheDocument();
  expect(screen.getByText(/page 1 of 10/i)).toBeInTheDocument();
});

test("calls handlePageChange on button click", () => {
  const handlePageChange = jest.fn();

  render(
    <Filter
      info={info}
      filters={filters}
      handlePageChange={handlePageChange}
      handleSearchChange={() => {}}
      handleFilterChange={() => {}}
      handleResetFilters={() => {}}
      currentPage={1}
      totalPages={10}
    />
  );

  fireEvent.click(screen.getByText(/next/i));
  expect(handlePageChange).toHaveBeenCalledWith("2");
});
