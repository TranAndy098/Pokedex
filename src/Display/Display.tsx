import React from "react";
import "./Display.css";

const Display = ({ curPokemon }) => {
  return (
    <>
      <h1 className="pokemon-box">{curPokemon}</h1>
    </>
  );
};

export default Display;
