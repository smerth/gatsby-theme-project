import React from "react";
// import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { Layout } from "gatsby-theme-main";

export default ({ pageContext }) => (
  <Layout>
    <MDXRenderer>{pageContext.body}</MDXRenderer>
  </Layout>
);
