exports.createPages = async ({ graphql, actions }) => {
  const results = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "docs" } }) {
        edges {
          node {
            name
            relativePath
            childMdx {
              body
            }
          }
        }
      }
    }
  `);

  // console.log(Object.keys(results));

  const pages = results.data.allFile.edges.map(({ node }) => node);

  pages.forEach((page) => {
    actions.createPage({
      path: `documentation/${page.name}`,
      component: require.resolve("./src/templates/doc.js"),
      context: {
        body: page.childMdx.body,
      },
    });
  });
};
