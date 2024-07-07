import React from "react";
import { useLocation } from "react-router-dom";

function Locations() {
  const query = new URLSearchParams(useLocation().search);
  const param = query.get("param");

  return (
    <div>
      <h1>Locations Page</h1>
      <p>String parameter: {param}</p>
    </div>
  );
}

export default Locations;
