import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../store";
import { fetchLocations } from "../features/locations/locationsSlice";
import Loading from "../components/loading/Loading";
import { Link } from "react-router-dom";

const LocationsPage = () => {
  const dispatch = useDispatch<typeof store.dispatch>();
  const { locations, info, status, error } = useSelector(
    (state: RootState) => state.locations
  );
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchLocations({ page: currentPage }));
  }, [dispatch, currentPage]);

  useEffect(() => {
    if (locations.length > 0) {
      setCurrentLocationIndex(0);
    }
  }, [locations]);

  const handlePreviousLocation = () => {
    if (currentLocationIndex === 0 && info.prev) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else {
      setCurrentLocationIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  const handleNextLocation = () => {
    if (currentLocationIndex === locations.length - 1 && info.next) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentLocationIndex((prevIndex) =>
        Math.min(prevIndex + 1, locations.length - 1)
      );
    }
  };

  if (status === "failed") return <p>Oh no... {error}</p>;

  const currentLocation = locations[currentLocationIndex];
  const residents = currentLocation?.residents || [];

  return (
    <div className="locationsPage">
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
          {locations.length === 0 ? (
            <div className="not-found">
              <span>No locations found.</span>
            </div>
          ) : (
            <>
              {currentLocation ? (
                <>
                  <div className="currentLocation">
                    <div className="locationPage-navigation">
                      <button
                        onClick={handlePreviousLocation}
                        disabled={currentLocationIndex === 0 && !info.prev}
                      >
                        Previous
                      </button>
                      <button
                        onClick={handleNextLocation}
                        disabled={
                          currentLocationIndex === locations.length - 1 &&
                          !info.next
                        }
                      >
                        Next
                      </button>
                    </div>
                    <div className="locationDetails">
                      <h2>{currentLocation.name || "Unknown"}</h2>
                      <p>Type: {currentLocation.type || "Unknown"}</p>
                      <p>Dimension: {currentLocation.dimension || "Unknown"}</p>
                    </div>
                  </div>
                  {residents.length === 0 ? (
                    <div className="not-found">
                      <p>No residents found.</p>
                    </div>
                  ) : (
                    <div className="locationPage-characterList">
                      {residents.map((resident) => {
                        return (
                          <Link
                            key={resident.id}
                            to={`/locations/characterDetail/${resident.id}`}
                            className="locationPage-characterCard"
                          >
                            <div>
                              <img
                                src={`https://rickandmortyapi.com/api/character/avatar/${resident.id}.jpeg`}
                                alt={`Character ${resident.id}`}
                                className="locationPage-characterImage"
                              />
                              <p>Character {resident.id}</p>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <div className="not-found">
                  <span>No location data available.</span>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default LocationsPage;
