import { useStaticQuery, graphql } from "gatsby";

export const getDocumentationMenu = () => {
  const { allFile } = useStaticQuery(
    graphql`
      query GetDocsMenu {
        allFile(
          filter: { sourceInstanceName: { eq: "docs" } }
          sort: { fields: name, order: ASC }
        ) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  );
  return allFile;
};
