import React, { useState } from "react";
import "./NavBar.css"; // Assuming you have a CSS file for styling
import { Link } from "react-router-dom";

const Navbar: React.FC = ({
  pageState,
  setPageState,
  setSearch,
  setMoveSearch,
  setDropType,

  setLocationSearch,
  setLocationGame,
  setDropLocationForGame,
  setGenGame,
  setDropGameForGen,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  function handleClick(value) {
    setSearch("");
    setMoveSearch("");
    setDropType("");

    setLocationSearch("");
    setLocationGame("");
    setDropLocationForGame("");
    setGenGame("");
    setDropGameForGen("");
    setPageState(value);
    setIsActive(!isActive);

    window.scrollTo(0, 0);
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
          <li className="navbar_item" key={"home-tab"}>
            <Link
              className={`navbar_links ${pageState === "" ? "active" : ""}`}
              onClick={() => handleClick("")}
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="navbar_item" key={"entry-tab"}>
            <Link
              className={`navbar_links ${
                pageState === "Entry" ? "active" : ""
              }`}
              onClick={() => handleClick("Entry")}
              to="/entry/home"
            >
              Entry
            </Link>
          </li>
          <li className="navbar_item" key={"location-tab"}>
            <Link
              className={`navbar_links ${
                pageState === "Locations" ? "active" : ""
              }`}
              onClick={() => handleClick("Locations")}
              to="/location/home"
            >
              Locations
            </Link>
          </li>
          <li className="navbar_item" key={"game-tab"}>
            <Link
              className={`navbar_links ${
                pageState === "Games" ? "active" : ""
              }`}
              onClick={() => handleClick("Games")}
              to="/game/home"
            >
              Games
            </Link>
          </li>
          <li className="navbar_item" key={"move-tab"}>
            <Link
              className={`navbar_links ${
                pageState === "Moves" ? "active" : ""
              }`}
              onClick={() => handleClick("Moves")}
              to="/move/home"
            >
              Moves
            </Link>
          </li>
          <li className="navbar_item" key={"type-tab"}>
            <Link
              className={`navbar_links ${
                pageState === "Types" ? "active" : ""
              }`}
              onClick={() => handleClick("Types")}
              to="/type/home"
            >
              Types
            </Link>
          </li>
          <li className="navbar_btn" key={"scan-button"}>
            <Link
              className="button"
              onClick={() => handleClick("Scan")}
              to="/scan"
            >
              Scan
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
