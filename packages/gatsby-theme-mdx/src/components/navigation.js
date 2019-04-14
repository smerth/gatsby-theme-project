import React from "react";
import { getDocumentationMenu } from "../hooks/get-documentation-menu";
import { Link } from "gatsby";

export default () => {
  const { edges } = getDocumentationMenu();
  // console.log(edges);
  return (
    <ul>
      {edges.map(({ node }) => (
        <li key={node.name}>
          <Link to={`/documentation/${node.name}`}>{node.name}</Link>
        </li>
      ))}
    </ul>
  );
};
