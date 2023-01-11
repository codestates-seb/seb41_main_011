import './App.css';
import './font.css';
import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

import AllPrograms from './pages/all_programs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
 ${reset}
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    font-size: 13px; //1 rem = 13px. 모바일 화면 사이즈 기준
  }

  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
  }

  @media screen and (min-width: 768px) {
  html {
    font-size: 16px; //1 rem = 13px. 태블릿 이상 화면 사이즈 기준
  }
}
`;

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path='/' element={<AllPrograms />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
