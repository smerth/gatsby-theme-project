import React from "react";
import { colors } from "gatsby-theme-mdx";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

export default ({ children }) => (
  <h1
    style={{
      fontFamily: systemFont,
      fontSize: "4rem",
      color: colors.primary
    }}
  >
    {children}
  </h1>
);
