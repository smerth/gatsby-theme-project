import React from "react";
import { MDXProvider } from "@mdx-js/tag";
import H1 from "./H1";
import H2 from "./H2";
import styled from "styled-components";
import Navigation from "./navigation";

const systemFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const P = styled.p`
  font-family: ${systemFont};
  font-size: 20px;
`;

const components = {
  h1: H1,
  h2: H2,
  p: P
};

export default ({ children, className }) => (
  <MDXProvider components={components}>
    <div class="centered">
      <div class="site-branding">
        <h1 class="site-title">GatsbyJS: Theme Development Demo</h1>
      </div>
    </div>
    <Content>
      <main class="main-area">
        <article class="post-content">{children}</article>
      </main>
      <div class="sidebar">
        <div class="squish-container">
          <h3>Explore the Demos:</h3>
          <nav class="example-menu">
            <Navigation />
          </nav>
        </div>
      </div>
    </Content>
    <footer class="footer-area">
      <p>
        The footer usually appears on the bottom of the page. That's why it's
        called the "footer".
      </p>
    </footer>
  </MDXProvider>
);

const Content = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  .main-area {
    grid-column: 2/3;
  }
  .sidebar {
    grid-column: 1/2;
    grid-row: 1;
  }
`;
