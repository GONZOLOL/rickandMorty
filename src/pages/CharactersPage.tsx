import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCharacters,
  setFilters,
} from "../features/characters/charactersSlice";
import { RootState, store } from "../store";
import { Link } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Filter from "../components/filters/Filter";

const CharactersPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { characters, info, status, error, filters } = useSelector(
    (state: RootState) => state.characters
  );

  useEffect(() => {
    dispatch(fetchCharacters({ page: 1, ...filters }));
  }, [dispatch, filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ name: e.target.value }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setFilters({ [e.target.name]: e.target.value }));
  };

  const handlePageChange = (url: string) => {
    const newPage = parseInt(url, 10);
    dispatch(fetchCharacters({ page: newPage, ...filters }));
  };

  const handleResetFilters = () => {
    dispatch(setFilters({ name: "", species: "", gender: "", status: "" }));
  };

  if (status === "failed") return <p>Oh no... {error}</p>;

  const currentPage = info.prev ? parseInt(info.prev.toString(), 10) + 1 : 1;
  const totalPages = info.pages;

  return (
    <div>
      <div className="base-title">
        <Link to="/">
          <img
            src="/assets/logo.png"
            alt="Rick and Morty Logo"
            className="base-logo"
          />
        </Link>
      </div>
      <Filter
        info={{
          ...info,
          prev: info.prev?.toString() || null,
          next: info.next?.toString() || null,
        }}
        filters={filters}
        handlePageChange={handlePageChange}
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}
        handleResetFilters={handleResetFilters}
        currentPage={currentPage}
        totalPages={totalPages}
      />
      {status === "loading" ? (
        <Loading />
      ) : characters.length === 0 ? (
        <div className="not-found">
          <p>No characters found</p>
        </div>
      ) : (
        <>
          <div className="homePage-characterList">
            {characters.map((character: any) => (
              <Link
                key={character.id}
                to={`/characterDetail/${character.id}`}
                className="homePage-characterCard"
              >
                <div>
                  <img
                    src={character.image}
                    alt={character.name}
                    className="homePage-characterImage"
                  />
                  <p>{character.name}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="homePage-navigationButtons">
            <button
              onClick={() =>
                info.prev && handlePageChange(info.prev.toString())
              }
              disabled={!info.prev}
            >
              Previous
            </button>
            <button
              onClick={() =>
                info.next && handlePageChange(info.next.toString())
              }
              disabled={!info.next}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CharactersPage;
