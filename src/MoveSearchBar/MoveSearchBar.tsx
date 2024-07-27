import { useState } from "react";
import "./MoveSearchBar.css";
import allMoves from "../data/moveData/allMoves.json";
import moveDisplayToAPI from "../data/moveData/moveDisplayToAPI.json";
import { useNavigate } from "react-router-dom";

export default function MoveSearchBar({ moveSearch, setMoveSearch }) {
  const navigate = useNavigate();

  function onChange(event: any) {
    setMoveSearch(event?.target?.value);
  }

  function onSearch(searchTerm: string) {
    setMoveSearch(searchTerm);
    console.log("Search", searchTerm);
  }

  function validMon(move) {
    if (Object.keys(moveDisplayToAPI).includes(move)) {
      return true;
    } else {
      console.log("Move:", move, "cannot be found");
      return false;
    }
  }

  function searchClick(searchTerm: string) {
    if (searchTerm !== "" && validMon(searchTerm)) {
      window.scrollTo(0, 0);
      navigate(`/move/${moveDisplayToAPI[searchTerm]}`);
      setMoveSearch("");
    }
  }

  return (
    <div className="MoveSearchBar-Menu">
      <h1>Search</h1>

      <div className="move-search-container">
        <div className="move-search-index">
          <input
            className="move-search-bar"
            type="text"
            value={moveSearch}
            onChange={onChange}
          ></input>
          <button
            className="move-search-btn"
            onClick={() => searchClick(moveSearch)}
          >
            Search
          </button>
        </div>
        <div className="move-search-dropdown">
          {allMoves
            .filter((item) => {
              const searchTerm = moveSearch.toLowerCase();
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
