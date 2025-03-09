// src/pages/EpisodesPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import EpisodesPage from "../pages/EpisodesPage";
import { store } from "../store";

test("renders episodes page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <EpisodesPage />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
