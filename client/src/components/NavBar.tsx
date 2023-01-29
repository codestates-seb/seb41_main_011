import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router';

const Content = styled.nav`
  display: none;

  > ul {
    display: flex;
    flex-direction: row;
    gap: 20px;

    > li {
      font-weight: 500;
      font-size: 1.15rem;
      color: #333;
      position: relative;

      a.active {
        color: #009779;
        position: relative;
        &::after {
          width: 110%;
          height: 8px;
          bottom: 24px;
          left: -5%;
          display: block;
          content: '';
          position: absolute;
          z-index: -1;
          background: #f2ff8d;
          transform: skewX(-40deg);
        }
      }
    }
  }

  @media screen and (min-width: 768px) {
    display: flex;
    flex-grow: 100;
  }
`;

const SubNav = styled.ul`
  display: ${({ isShow }: { isShow: boolean }) => (isShow ? 'block' : 'none')};
  position: absolute;
  top: 64px;
  left: -20px;
  width: max-content;
  min-width: 140px;
  background: #f9f9f5;
  border-bottom-right-radius: 12px;
  padding: 4px 0;
  border-right: 1px solid #9db5af;
  border-bottom: 1px solid #9db5af;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  > li {
    padding: 4px 16px;
    font-size: 1rem;
    color: #666;
    text-align: left;
    line-height: 1.5;
    transition: all 0.2s;
    :not(:last-child) {
      border-bottom: 1px solid #e2e2e2;
    }
    :hover,
    :active {
      color: #333;
    }
  }
  @media screen and (min-width: 1200px) {
    top: 70px;

    > li {
      a {
        padding-right: 8px;
      }
    }
  }
`;

const NavBar = () => {
  const location: string = useLocation().pathname;
  const [isProgram, setIsProgram] = useState(false);
  useEffect(() => {
    if (location.includes('/program')) {
      setIsProgram(true);
    } else {
      setIsProgram(false);
    }
  }, [location]);

  const [showOptions, setShowOptions] = useState(0);
  const onMouseOver = (index: number) => {
    setShowOptions(index);
  };
  const onMouseOut = () => {
    setShowOptions(0);
  };
  const navLinkClickHandler = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <Content>
      <ul>
        <li onMouseOver={() => onMouseOver(1)} onMouseOut={onMouseOut}>
          <NavLink to='/' className={isProgram ? 'active' : ''}>
            그룹 테라피 프로그램
          </NavLink>
          <SubNav isShow={showOptions === 1 ? true : false}>
            <li>
              <Link to='/programs/3'>#무력감이_들고_우울해요</Link>
            </li>
            <li>
              <Link to='/programs/2'>#불안하고_혼란스러워요</Link>
            </li>
            <li>
              <Link to='/programs/1'>#스트레스_상태예요</Link>
            </li>
            <li>
              <Link to='/programs/4'>#술이나_약물을_끊기_힘들어요</Link>
            </li>
          </SubNav>
        </li>
        <li onMouseOver={() => onMouseOver(2)} onMouseOut={onMouseOut}>
          <NavLink to='/about' onClick={navLinkClickHandler}>
            소개 페이지
          </NavLink>
          <SubNav isShow={showOptions === 2 ? true : false}>
            <li>
              <Link to='/about'>#서비스_소개</Link>
            </li>
            <li>
              <Link to='/about/test'>#나에게_맞는_프로그램_찾기</Link>
            </li>
          </SubNav>
        </li>
        <li onMouseOver={() => onMouseOver(3)} onMouseOut={onMouseOut}>
          <NavLink to='/community' onClick={navLinkClickHandler}>
            커뮤니티
          </NavLink>
          <SubNav isShow={showOptions === 3 ? true : false}>
            <li>
              <Link to='/community/notice'>#공지사항</Link>
            </li>
            <li>
              <Link to='/community/general'>#유저_커뮤니티</Link>
            </li>
          </SubNav>
        </li>
      </ul>
    </Content>
  );
};

export default NavBar;
