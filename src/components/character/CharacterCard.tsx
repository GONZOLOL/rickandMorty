import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { CharacterDetail, Episode } from "../../types/characterDetailTypes";

interface CharacterProps {
  character: CharacterDetail;
  currentEpisode: Episode;
  handlePrevious: () => void;
  handleNext: () => void;
  currentEpisodeIndex: number;
  episodesLength: number;
}

const CharacterCard: React.FC<CharacterProps> = ({
  character,
  currentEpisode,
  handlePrevious,
  handleNext,
  currentEpisodeIndex,
  episodesLength,
}) => {
  const characterName = character?.name || "Unknown";
  const characterStatus = character?.status || "Unknown";
  const characterGender = character?.gender || "Unknown";
  const characterOrigin = character?.origin?.name || "Unknown";
  const episodeName = currentEpisode?.name || "Unknown";
  const episodeAirDate = currentEpisode?.air_date || "Unknown";

  const currentLocation = useLocation().pathname;

  const handleGoBack = () => {
    if (currentLocation.includes("episodes")) {
      return "/episodes";
    } else if (currentLocation.includes("locations")) {
      return "/locations";
    } else {
      return "/characters";
    }
  };

  return (
    <div className="charactersPage__characterCard" data-name={characterName}>
      <div className="charactersPage__goBackButtonContainer">
        <Link to={handleGoBack()} className="charactersPage__goBackButton">
          Go Back
        </Link>
      </div>
      <div className="charactersPage__characterContainer">
        <div className="charactersPage__characterImage">
          <img src={character.image} alt={characterName} />
        </div>
        <div className="charactersPage__characterInfo">
          <h1 className="charactersPage__characterName">{characterName}</h1>
          <div className="charactersPage__characterDetails">
            <div className="charactersPage__characterDetail">
              <p className="charactersPage__detailTitle">Status:</p>
              <p className="charactersPage__detailValue">{characterStatus}</p>
            </div>
            <div className="charactersPage__characterDetail">
              <p className="charactersPage__detailTitle">Gender:</p>
              <p className="charactersPage__detailValue">{characterGender}</p>
            </div>
            <div className="charactersPage__characterDetail">
              <p className="charactersPage__detailTitle">Origin:</p>
              <p className="charactersPage__detailValue">{characterOrigin}</p>
            </div>
          </div>
          <h2>Episodes</h2>
          <div className="charactersPage__episodeNavigation">
            <button
              onClick={handlePrevious}
              disabled={currentEpisodeIndex === 0}
              className="charactersPage__navigationButton"
            >
              <FaArrowLeft />
            </button>
            <div className="charactersPage__episode">
              <p className="charactersPage__episodeName">
                <strong>{episodeName}</strong> <br />
                <span className="charactersPage__episodeAirDate">
                  Air date: {episodeAirDate}
                </span>
              </p>
            </div>
            <button
              onClick={handleNext}
              disabled={currentEpisodeIndex === episodesLength - 1}
              className="charactersPage__navigationButton"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
