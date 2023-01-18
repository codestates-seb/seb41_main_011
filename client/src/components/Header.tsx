import { Link } from 'react-router-dom';
import styled from 'styled-components';

import NavBar from './NavBar';
import SignButtons from './SignButtons';
import MyPageButton from './MyPageButton';
import { useState } from 'react';

const Contents = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  background: #f7f9ed;
  border-bottom: 2px solid #b3d2b0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 32px;
  padding: 0 20px;

  a {
    color: inherit;
    display: block;
  }

  h1 {
    font-size: 1.63rem;
    font-weight: 700;
    color: #b3b3b3;
  }

  @media screen and (min-width: 768px) {
    height: 64px;
    line-height: 64px;
  }

  @media screen and (min-width: 1200px) {
    height: 70px;
    line-height: 70px;
    padding: 0 40px;
  }
`;

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Contents>
      <h1>
        <Link to='/'>LOGO TEXT</Link>
      </h1>
      <NavBar />
      {isLoggedIn ? <MyPageButton /> : <SignButtons />}
    </Contents>
  );
};

export default Header;
