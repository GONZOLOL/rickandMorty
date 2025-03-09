// src/pages/NotFoundPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";

test("renders not found page", () => {
  render(
    <BrowserRouter>
      <NotFoundPage />
    </BrowserRouter>
  );

  expect(
    screen.getByText(/sorry, the page you are looking for does not exist/i)
  ).toBeInTheDocument();
  expect(screen.getByText(/go back to home/i)).toBeInTheDocument();
});
