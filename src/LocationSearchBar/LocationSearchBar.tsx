import { useState } from "react";
import "./LocationSearchBar.css";
import locationNamesDisplayToAPI from "../data/locationData/locationNamesDisplayToAPI.json";

export default function LocationSearchBar({
  setLocation,
  locationSearch,
  setLocationSearch,
  setLocationGame,
  setDropLocationForGame,
}) {
  function onChange(event: any) {
    setLocationSearch(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    setLocationSearch(searchTerm);
    console.log("Search", searchTerm);
  }

  function validMon(location) {
    if (Object.keys(locationNamesDisplayToAPI).includes(location)) {
      return true;
    } else {
      console.log("Move:", location, "cannot be found");
      return false;
    }
  }

  function searchClick(searchTerm: string) {
    if (searchTerm !== "" && validMon(searchTerm)) {
      setLocation(locationNamesDisplayToAPI[searchTerm]);
      setLocationSearch("");
      setLocationGame("");
      setDropLocationForGame("");
    }
  }

  return (
    <div className="LocationSearchBar-Menu">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-index">
          <input
            className="search-bar"
            type="text"
            value={locationSearch}
            onChange={onChange}
          ></input>
          <button
            className="search-btn"
            onClick={() => searchClick(locationSearch)}
          >
            Search
          </button>
        </div>
        <div className="dropdown">
          {Object.keys(locationNamesDisplayToAPI)
            .filter((item) => {
              const searchTerm = locationSearch.toLowerCase();
              const name = item.toLowerCase();
              return (
                searchTerm && name.startsWith(searchTerm) && name !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item}
              >
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
