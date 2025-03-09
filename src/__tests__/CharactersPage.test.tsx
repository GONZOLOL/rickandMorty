// src/pages/CharactersPage.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import CharactersPage from "../pages/CharactersPage";
import { store } from "../store";

test("renders characters page", () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <CharactersPage />
      </BrowserRouter>
    </Provider>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
