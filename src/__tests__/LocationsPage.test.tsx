// src/pages/LocationsPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import LocationsPage from "../pages/LocationsPage";
import { store } from "../store";

test("renders locations page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <LocationsPage />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
