import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store";
import { fetchEpisodes } from "../features/episodes/episodesSlice";
import Loading from "../components/loading/Loading";
import { Link } from "react-router-dom";

const EpisodesPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { episodes, info, status, error } = useSelector(
    (state: RootState) => state.episodes
  );
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchEpisodes({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (episodes.length > 0) {
      setCurrentEpisodeIndex(0);
    }
  }, [episodes]);

  const handlePreviousEpisode = () => {
    if (currentEpisodeIndex === 0 && info.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setCurrentEpisodeIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisodeIndex === episodes.length - 1 && info.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentEpisodeIndex((prevIndex) =>
        Math.min(prevIndex + 1, episodes.length - 1)
      );
    }
  };

  if (status === "failed") return <p>Oh no... {error}</p>;

  const currentEpisode = episodes[currentEpisodeIndex];
  const characters = currentEpisode?.characters || [];

  return (
    <div className="episodesPage">
      <div className="base-title">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Rick and Morty Logo"
            className="base-logo"
          />
        </Link>
      </div>
      {status === "loading" ? (
        <Loading />
      ) : (
        <>
          {currentEpisode ? (
            <>
              <div className="currentEpisode">
                <div className="locationPage-navigation">
                  <button
                    onClick={handlePreviousEpisode}
                    disabled={currentEpisodeIndex === 0 && !info.prev}
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleNextEpisode}
                    disabled={
                      currentEpisodeIndex === episodes.length - 1 && !info.next
                    }
                  >
                    Next
                  </button>
                </div>
                <div className="episodeDetails">
                  <h2>{currentEpisode.name || "Unknown"}</h2>
                  <p>Air date: {currentEpisode.air_date || "Unknown"}</p>
                </div>
              </div>
              <div className="homePage-characterList">
                {characters.map((character) => {
                  return (
                    <Link
                      key={character.id}
                      to={`/episodes/characterDetail/${character.id}`}
                      className="homePage-characterCard"
                    >
                      <div>
                        <img
                          src={`https://rickandmortyapi.com/api/character/avatar/${character.id}.jpeg`}
                          alt={`Character ${character.id}`}
                          className="homePage-characterImage"
                        />
                        <p>Character {character.id}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          ) : (
            <p>No episode data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default EpisodesPage;
