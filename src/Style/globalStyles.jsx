import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

const GlobalStyles = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700&family=Sigmar+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap');

${normalize}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
font-family: 'Poppins', sans-serif;
}

  ul{
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6,p, button, a, input, label {
  color: ${p => p.theme.textBlackMain};
  
  }

  html {
    scroll-behavior: smooth;
    min-height: 100vh;
  }

  body
  {
    background-color: #fff;
    padding:0;
    margin:0;
      height: 100%;
  }

h1, h2, h3, h4, h5, h6 {
    margin: 0;
  padding: 0;

}



button, input {
  font-family: inherit;
}


button {
  cursor: pointer;
border: none;
background-color: transparent;
}

  a {
    text-decoration: none; 
}
`;

export default GlobalStyles;
