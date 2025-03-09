import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

test("renders home page with navigation links", () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const charactersLink = screen.getByText(/characters/i);
  const episodesLink = screen.getByText(/episodes/i);
  const locationsLink = screen.getByText(/locations/i);
  expect(charactersLink).toBeInTheDocument();
  expect(episodesLink).toBeInTheDocument();
  expect(locationsLink).toBeInTheDocument();
});
