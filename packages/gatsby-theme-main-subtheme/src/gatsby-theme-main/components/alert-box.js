import React from "react";
import { colors } from "gatsby-theme-main";

function AlertBox(props) {
  const { children } = props;
  return (
    <div
      style={{
        padding: "2rem",
        background: colors.alert,
      }}
    >
      {props.title && <h2>{props.title}</h2>}
      {children}
    </div>
  );
}

export default AlertBox;
