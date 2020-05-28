import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, button {
    font-family: 'Arial', sans-serif;
  }

  body, div, dl, dt, dd, ul, li, h1, h2, h3, h4, h5, h6, pre, code, form, figure, fieldset,
  input, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
  }

  main {
    padding: 16px;
  }

  table {
    border-spacing: 0;
    border-collapse: collapse;
  }

  fieldset, img, abbr {
    border: none;
  }

  address, caption, cite, code, dfn, em, strong, th, var {
    font-weight: normal;
    font-style: normal;
  }

  ul li {
    list-style: none;
  }

  caption, th {
    text-align: left;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
    font-size: 100%;
  }

  sup {
    vertical-align: text-top;
  }

  sub {
    vertical-align: text-bottom;
  }

  button, input, textarea, select {
    font-weight: inherit;
    font-size: inherit;
    font-family: inherit;
  }

  legend {
    color: black;
  }

  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section, main {
    display: block;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle;
