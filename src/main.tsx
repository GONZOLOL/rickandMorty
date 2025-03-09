import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import {
  Provider as UrqlProvider,
  createClient,
  cacheExchange,
  fetchExchange,
} from "urql";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import HomePage from "./pages/HomePage";
import CharactersPage from "./pages/CharactersPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./styles/main.scss";
import EpisodesPage from "./pages/EpisodesPage";
import LocationsPage from "./pages/LocationsPage";

const client = createClient({
  url: "https://rickandmortyapi.com/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/characters", element: <CharactersPage /> },
      { path: "/characterDetail/:id", element: <CharacterDetailPage /> },
      { path: "/episodes", element: <EpisodesPage /> },
      {
        path: "/episodes/characterDetail/:id",
        element: <CharacterDetailPage />,
      },
      { path: "/locations", element: <LocationsPage /> },
      {
        path: "/locations/characterDetail/:id",
        element: <CharacterDetailPage />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UrqlProvider value={client}>
      <ReduxProvider store={store}>
        <RouterProvider router={router} />
      </ReduxProvider>
    </UrqlProvider>
  </React.StrictMode>
);
