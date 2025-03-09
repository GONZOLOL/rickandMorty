import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { useParams, useLocation, Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import CharacterCard from "../components/character/CharacterCard";
import {
  fetchCharacterDetail,
  setCurrentEpisodeIndex,
} from "../features/characterDetail/characterDetailSlice";
import { RootState } from "../store";

const CharacterDetailPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { character, status, error, currentEpisodeIndex } = useSelector(
    (state: RootState) => state.characterDetail
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCharacterDetail(id));
    }
  }, [dispatch, id]);

  if (status === "failed") return <p>Oh no... {error}</p>;

  const episodes = character?.episode || [];
  const currentEpisode = episodes[currentEpisodeIndex];

  const handlePrevious = () => {
    dispatch(setCurrentEpisodeIndex(Math.max(currentEpisodeIndex - 1, 0)));
  };

  const handleNext = () => {
    dispatch(
      setCurrentEpisodeIndex(
        Math.min(currentEpisodeIndex + 1, episodes.length - 1)
      )
    );
  };

  return (
    <div className="charactersPage">
      {status === "loading" ? (
        <Loading />
      ) : (
        character && (
          <>
            <CharacterCard
              character={character}
              currentEpisode={currentEpisode}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
              currentEpisodeIndex={currentEpisodeIndex}
              episodesLength={episodes.length}
            />
          </>
        )
      )}
    </div>
  );
};

export default CharacterDetailPage;
