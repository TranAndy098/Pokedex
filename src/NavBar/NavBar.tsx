import React, { useState } from "react";
import "./NavBar.css"; // Assuming you have a CSS file for styling

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  const handleMenuClick = () => {
    setIsActive(!isActive);
  };

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
            <a href="/" className="navbar_links">
              Home
            </a>
          </li>
          <li className="navbar_item">
            <a href="/" className="navbar_links">
              Entry
            </a>
          </li>
          <li className="navbar_item">
            <a href="/" className="navbar_links">
              Locations
            </a>
          </li>
          <li className="navbar_btn">
            <a href="/" className="button">
              Scan
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
