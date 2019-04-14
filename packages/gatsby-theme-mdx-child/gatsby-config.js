module.exports = {
  __experimentalThemes: ["gatsby-theme-mdx"],
  plugins: [
    // You can have multiple instances of this plugin
    // to create pages from React components in different directories.
    //
    // The following sets up the pattern of having multiple
    // "pages" directories in your project
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`
      }
    },
    // source files
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "docs",
        // this path is relative to the gatsby site running the child theme
        path: `docs`
      }
    }
  ]
};
