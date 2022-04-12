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
    /* --c-navy: #0426a0; */
    /* --c-navy: #E5E4E2;
    --c-navy-rgb: 4,38,160;
    --c-light-blue: #4169E1;
    --c-light-blue-rgb: 4,46,230;
    --c-grey-blue:#50609a;
    --c-pastel-blue:#89CFF0;
    --c-pastel-blue-rgb:137, 207, 240;
    --c-purple-blue:#CCCCFF;
    --c-purple-blue-rgb:204, 204, 255;
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
    --c-light-grey:#D3D3D3;
    --c-light-grey-rgb:211,211,211;
    --c-background-platinum:#E5E4E2;
    --c-background-platinum-rgb:229, 228, 226; */
    
    --c-print: #000;
    --c-print-rgb: 0,0,0;
    --c-error: #f94038;
    --c-error-rgb: 249,64,56;

    --c-light-background:#E5E4E2;
    --c-light-background-rgb:229, 228, 226;
    --c-primary-grey:#a9a9a9;
    --c-primary-grey-rgb:169,169,169;
    --c-primary-blue:#2779a7;
    --c-primary-blue-rgb:39,120,167;
    --c-primary-yellow:#ecd06f;
    --c-primary-yellow-rbg:236,209,111;
    --c-primary-green:#30B9C1;
    --c-primary-green-rgb:48,186,193;
    --c-primary-purple:#8f5b78;
    --c-primary-purple-rgb:143,91,120;
    --c-black: #171618;
    --c-black-rgb: 23,22,24;

    --c-secondary-grey:#d3d3d3;
    --c-secondary-grey-rgb:211,211,211;
    --c-secondary-green:#b7dfaa;
    --c-secondary-green-rgb:183,223,170;
    --c-secondary-yellow:#fcb830;
    --c-secondary-yellow-rgb:252,184,48;
    --c-secondary-purple:#e884a9;
    --c-secondary-purple-rgb:232,132,169;
    --c-secondary-orange:#e27b4f;
    --c-secondary-orange-rgb:226,123,79;
    --fontcolor-primary:#848484;
    --fontcolor-primary-rgb:132,131,132;
    --fontcolor-white:#fff;
    --fontcolor-white-rgb:255,255,255;



    


    
    
    


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
