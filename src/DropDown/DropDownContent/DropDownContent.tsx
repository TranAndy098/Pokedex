import React, { forwardRef } from "react";
import "./DropDownContent.css";

const DropDownContent = forwardRef((props, ref) => {
  const { open, content, top } = props;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`dropdown-content ${open ? "content-open" : null}`}
      style={{ top: top ? `${top}px` : "100%" }}
    >
      {content}
    </div>
  );
});

export default DropDownContent;
