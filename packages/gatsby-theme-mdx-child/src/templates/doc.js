import React from "react";
import MDXRenderer from "gatsby-mdx/mdx-renderer";
import { Layout } from "gatsby-theme-mdx";

export default ({ pageContext }) => (
  <Layout>
    <MDXRenderer>{pageContext.body}</MDXRenderer>
  </Layout>
);
