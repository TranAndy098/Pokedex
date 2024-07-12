import React, { useState } from "react";
import "./NavBar.css"; // Assuming you have a CSS file for styling

const Navbar: React.FC = ({
  curPokemon,
  setPokemon,
  pageState,
  setPageState,
  setSearch,
  setMove,
  setMoveSearch,
  setType,
  setDropType,
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

  function handleClick(value) {
    if (value === "Moves") {
      setPokemon("");
      setSearch("");
      setType("");
      setDropType("");
      setPageState(value);
      setIsActive(!isActive);
    } else if (value === "Types") {
      setPokemon("");
      setSearch("");
      setMove("");
      setMoveSearch("");
      setPageState(value);
      setIsActive(!isActive);
    } else if (value === "Scan") {
      setPokemon("");
      setSearch("");
      setMove("");
      setMoveSearch("");
      setType("");
      setDropType("");
      setPageState(value);
      setIsActive(!isActive);
    } else if (curPokemon === "") {
      handleHomeClick();
    } else if (curPokemon !== "") {
      setSearch("");
      setMove("");
      setMoveSearch("");
      setType("");
      setDropType("");
      setPageState(value);
      setIsActive(!isActive);
    }
  }

  function handleHomeClick() {
    setPokemon("");
    setSearch("");
    setMove("");
    setMoveSearch("");
    setType("");
    setDropType("");
    setPageState("");
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
              onClick={() => handleHomeClick()}
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
