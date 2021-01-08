import React from "react";
import { useDocumentationMenu } from "../hooks/use-documentation-menu";
import { Link } from "gatsby";

export default () => {
  const { edges } = useDocumentationMenu();
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
