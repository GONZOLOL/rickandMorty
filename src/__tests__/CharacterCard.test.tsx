// src/components/character/CharacterCard.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CharacterCard from "../components/character/CharacterCard";
import { CharacterDetail, Episode } from "../types/characterDetailTypes";

const character: CharacterDetail = {
  id: "1",
  name: "Rick Sanchez",
  status: "Alive",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  gender: "Male",
  origin: { name: "Earth" },
  episode: [
    { id: "1", name: "Pilot", air_date: "December 2, 2013" },
    { id: "2", name: "Lawnmower Dog", air_date: "December 9, 2013" },
  ],
};

const currentEpisode: Episode = character.episode[0];

test("renders character card with details", () => {
  render(
    <BrowserRouter>
      <CharacterCard
        character={character}
        currentEpisode={currentEpisode}
        handlePrevious={() => {}}
        handleNext={() => {}}
        currentEpisodeIndex={0}
        episodesLength={character.episode.length}
      />
    </BrowserRouter>
  );

  expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
  expect(screen.getByText(/Alive/i)).toBeInTheDocument();
  expect(screen.getByText(/Male/i)).toBeInTheDocument();
  expect(screen.getByText(/Earth/i)).toBeInTheDocument();
  expect(screen.getByText(/Pilot/i)).toBeInTheDocument();
  expect(screen.getByText(/December 2, 2013/i)).toBeInTheDocument();
});
