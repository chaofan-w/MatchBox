import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    /* 
    --font-heading: "Segoe UI", sans-serif;
    --font-body: 'Poppins', Arial, Helvetica, sans-serif;
    --padding-page: 24px; */
    /* --firsth-font-family: 'Poppins', sans-serif;
    --heading-font-family: 'Roboto', sans-serif;
    --heading-font-family: Helvetica, sans-serif;
    --heading-font-family: "Segoe UI", sans-serif; */
    --c-navy: #0426a0;
    --c-navy-rgb: 4,38,160;
    --c-light-blue: #3004A0;
    --c-light-blue-rgb: 4,46,230;
    --c-grey-blue:#50609a;
    --c-grey-blue-rgb:80,96,154;
    --c-white: #fff;
    --c-white-rgb: 255,255,255;
    --c-dark-gold:#A07E04;
    --c-dark-gold-rgb:160,126,4;
    --c-black: #171618;
    --c-black-rgb: 23,22,24;
    --c-greytext: #707070;
    --c-greytext-rgb: 112,112,112;
    --c-tint-blue: #c0c9e7;
    --c-tint-blue-rgb: 192,201,231;
    --c-superlight: #e8e8e8;
    --c-superlight-rgb: 232,232,232;
    --c-print: #000;
    --c-print-rgb: 0,0,0;
    --c-error: #f94038;
    --c-error-rgb: 249,64,56;
    


  }

  /* http://meyerweb.com/eric/tools/css/reset/
      v2.0 | 20110126
      License: none (public domain)
  */

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  }

  html, body, div,
  input, button, select, option,
  h1, h2, h3, h4, h5, h6, p, span,
  text { transition: all 0.25s ease-out;
    font-family: 'Poppins', sans-serif, 'Roboto', sans-serif, Roboto,  -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    overflow-wrap:break-word;
  }


  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      box-sizing: border-box;
      font-size: 100%;
      vertical-align: baseline;
      
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
      display: block;
  }
  body {
      line-height: 1;
  }
  ol, ul {
      list-style: none;
  }
  blockquote, q {
      quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
      content: '';
      content: none;
  }

  h1,
h2,
h3,
label,
button {
  color: #fff;
  font-family: var(--font-heading);
  font-size: 32px;
  text-align: center;
}
p,
a,
li,
blockquote,
input {
  font-family: var(--font-body);
}

  input {
    font-size: 24px;
    height: 42px;
    border: 2px solid var(--color-orange);
    border-radius: 4px;
    padding: 0 12px;
  }
`;
