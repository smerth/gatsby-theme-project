import React from "react";
import colors from "../tokens/colors";

export default ({ props, children }) => (
  <div
    style={{
      padding: "2rem",
      background: colors.primary
    }}
  >
    {props.title && <h2>{props.title}</h2>}
    {children}
  </div>
);
