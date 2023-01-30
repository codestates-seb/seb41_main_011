import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React, { useEffect, MouseEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { mobileNavProps } from './Tabbar';
import axios from 'axios';
import api from '../RefreshToken';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginActions } from '../store/login';

const Backdrop = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row-reverse;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  position: relative;
  width: 80vw;
  height: calc(100vh - 70px);
  overflow-y: auto;
  background: #f9f9f5;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;

  a {
    color: inherit;
    display: block;
  }

  h1 {
    width: 100px;
    margin: 0 auto;
    img {
      max-width: 100%;
    }
  }
`;

const GNB = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top: 1px solid #ddd;
  padding: 12px 0 70px;

  > li {
    font-weight: 500;
    font-size: 1.15rem;
    color: #333;
    position: relative;

    a.active {
      color: #009779;
    }
  }
`;

const SubNav = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #eeeee6;
  border-radius: 8px;
  padding: 4px 0;
  margin-top: 8px;
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

const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

const Button = styled.button`
  font-weight: 500;
  border-radius: 8px;
  border: 0;
  font-size: 0.9rem;
  transition: all 0.2s;
  width: 100%;
  min-height: 30px;
  cursor: pointer;

  a {
    padding: 6px 0;
    display: block;
  }

  &.style1 {
    background: #dae2b6;
    color: #333;
    :hover,
    :active {
      background: #ccd5a8;
    }
  }
  &.style2 {
    background: #009779;
    color: #fff;
    :hover,
    :active {
      background: #0d8b72;
    }
  }
`;

const CloseNav = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  background: #c4dcbf;
  width: 80%;
  height: 70px;
  display: flex;
  align-items: center;
  color: #333;
  font-size: 1.1rem;
  padding: 0 20px;
  gap: 8px;
  transition: all 0.2s;
  &:hover,
  &:active {
    color: #000;
    padding-left: 32px;
  }
`;

const MobileNav = (props: mobileNavProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.login.role);

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: hidden;
      touch-action: none;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const location: string = useLocation().pathname;
  const [isProgram, setIsProgram] = useState(false);
  useEffect(() => {
    if (location.includes('/program')) {
      setIsProgram(true);
    } else {
      setIsProgram(false);
    }
  }, [location]);

  const navLinkClickHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

  const mobileNavHandler = () => {
    props.close();
  };

  const postLogout = async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpireTime');
      axios.defaults.headers.common['Authorization'] = '';
      alert('성공적으로 로그아웃 되었습니다.');
      dispatch(loginActions.logout());
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    postLogout();
  };

  return (
    <Backdrop>
      <Content>
        <h1>
          <img src='/teatime.png' alt='티타임' />
        </h1>
        {isLoggedIn ? (
          <ButtonWrapper>
            <Button className='style1' onClick={logoutHandler}>
              로그아웃
            </Button>
            {userRole !== 'ADMIN' && (
              <Button className='style2' onClick={mobileNavHandler}>
                <Link to='/edit-userinfo'>회원정보 수정</Link>
              </Button>
            )}
          </ButtonWrapper>
        ) : (
          <ButtonWrapper>
            <Button className='style1' onClick={mobileNavHandler}>
              <Link to='/login'>로그인</Link>
            </Button>
            <Button className='style2' onClick={mobileNavHandler}>
              <Link to='/signup'>회원가입</Link>
            </Button>
          </ButtonWrapper>
        )}
        <GNB>
          <li>
            <NavLink to='/' className={isProgram ? 'active' : ''}>
              그룹 테라피 프로그램
            </NavLink>
            <SubNav>
              <li onClick={mobileNavHandler}>
                <Link to='/programs/3'>#무력감이_들고_우울해요</Link>
              </li>
              <li onClick={mobileNavHandler}>
                <Link to='/programs/2'>#불안하고_혼란스러워요</Link>
              </li>
              <li onClick={mobileNavHandler}>
                <Link to='/programs/1'>#스트레스_상태예요</Link>
              </li>
              <li onClick={mobileNavHandler}>
                <Link to='/programs/4'>#술이나_약물을_끊기_힘들어요</Link>
              </li>
            </SubNav>
          </li>
          <li>
            <NavLink to='/about' onClick={navLinkClickHandler}>
              소개 페이지
            </NavLink>
            <SubNav>
              <li onClick={mobileNavHandler}>
                <Link to='/about'>#서비스_소개</Link>
              </li>
              <li onClick={mobileNavHandler}>
                <Link to='/about/test'>#나에게_맞는_프로그램_찾기</Link>
              </li>
            </SubNav>
          </li>
          <li>
            <NavLink to='/community' onClick={navLinkClickHandler}>
              커뮤니티
            </NavLink>
            <SubNav>
              <li onClick={mobileNavHandler}>
                <Link to='/community/notice'>#공지사항</Link>
              </li>
              <li onClick={mobileNavHandler}>
                <Link to='/community/general'>#유저_커뮤니티</Link>
              </li>
            </SubNav>
          </li>
          {userRole !== 'ADMIN' && (
            <li>
              <NavLink to='/mypage' onClick={navLinkClickHandler}>
                마이페이지
              </NavLink>
              <SubNav>
                <li onClick={mobileNavHandler}>
                  <Link to='/mypage'>#나의_프로그램</Link>
                </li>
              </SubNav>
            </li>
          )}
        </GNB>
        <CloseNav onClick={mobileNavHandler}>
          <AiOutlineDoubleRight />
          전체 메뉴 닫기
        </CloseNav>
      </Content>
    </Backdrop>
  );
};

export default MobileNav;
