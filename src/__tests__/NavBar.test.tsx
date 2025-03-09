import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";

test("renders navigation links", () => {
  render(
    <BrowserRouter>
      <NavBar />
    </BrowserRouter>
  );

  expect(screen.getByText(/characters/i)).toBeInTheDocument();
  expect(screen.getByText(/episodes/i)).toBeInTheDocument();
  expect(screen.getByText(/locations/i)).toBeInTheDocument();
});
