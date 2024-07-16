import React, { useState } from "react";
import "./NavBar.css"; // Assuming you have a CSS file for styling

const Navbar: React.FC = ({
  setPokemon,
  pageState,
  setPageState,
  setSearch,
  setMove,
  setMoveSearch,
  setType,
  setDropType,
  setLocation,

  setLocationSearch,
  setLocationGame,
  setDropLocationForGame,
  setGame,
  setGenGame,
  setDropGameForGen,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  function handleClick(value) {
    setPokemon("");
    setSearch("");
    setMove("");
    setMoveSearch("");
    setType("");
    setDropType("");
    setLocation("");

    setLocationSearch("");
    setLocationGame("");
    setDropLocationForGame("");
    setGame("");
    setGenGame("");
    setDropGameForGen("");
    setPageState(value);
    setIsActive(!isActive);
  }

  return (
    <nav className="navbar">
      <div className="navbar_container">
        <a href="/" id="navbar_logo">
          <img src="../pokedex.png" />
          Pokedex
        </a>
        <div
          className={`navbar_toggle ${isActive ? "is-active" : ""}`}
          id="mobile-menu"
          onClick={handleMenuClick}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`navbar_menu ${isActive ? "active" : ""}`}>
          <li className="navbar_item">
            <p
              className={`navbar_links ${pageState === "" ? "active" : ""}`}
              onClick={() => handleClick("")}
            >
              Home
            </p>
          </li>
          <li className="navbar_item">
            <p
              className={`navbar_links ${
                pageState === "Entry" ? "active" : ""
              }`}
              onClick={() => handleClick("Entry")}
            >
              Entry
            </p>
          </li>
          <li className="navbar_item">
            <p
              className={`navbar_links ${
                pageState === "Locations" ? "active" : ""
              }`}
              onClick={() => handleClick("Locations")}
            >
              Locations
            </p>
          </li>
          <li className="navbar_item">
            <p
              className={`navbar_links ${
                pageState === "Games" ? "active" : ""
              }`}
              onClick={() => handleClick("Games")}
            >
              Games
            </p>
          </li>
          <li className="navbar_item">
            <p
              className={`navbar_links ${
                pageState === "Moves" ? "active" : ""
              }`}
              onClick={() => handleClick("Moves")}
            >
              Moves
            </p>
          </li>
          <li className="navbar_item">
            <p
              className={`navbar_links ${
                pageState === "Types" ? "active" : ""
              }`}
              onClick={() => handleClick("Types")}
            >
              Types
            </p>
          </li>
          <li className="navbar_btn">
            <p className="button" onClick={() => handleClick("Scan")}>
              Scan
            </p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
