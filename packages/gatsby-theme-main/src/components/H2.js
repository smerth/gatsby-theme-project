import React from "react";
import colors from "../tokens/colors";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default ({ children }) => (
  <h2
    style={{
      fontFamily: systemFont,
      fontSize: "3rem",
      color: colors.secondary
    }}
  >
    {children}
  </h2>
);
