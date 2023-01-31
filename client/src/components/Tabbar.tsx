import styled from 'styled-components';
import {
  FaListAlt,
  FaSyringe,
  FaRegLaughSquint,
  FaRegFileAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import MobileNav from './MobileNav';
import { useState } from 'react';
import { useAppSelector } from '../store/hooks';

const Box = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: rgba(0, 0, 0, 0.13) 0px 5px 15px 3px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100vw;
  height: 70px;
  background-color: white;
  z-index: 10;

  a {
    color: inherit;
    box-sizing: border-box;
  }

  @media screen and (min-width: 768px) {
    display: none;
  }
`;
const CenterIcon = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: #658a69;
  /* outline: 6px solid white; */
  object-fit: scale-down;
  margin-bottom: 48px;
  box-shadow: inset 9px 8px 0 rgba(83, 113, 89, 0.28);
  cursor: pointer;
`;

const IconWrapper = styled.div`
  width: 68px;
  height: 68px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #777777;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s;
  * {
    margin: 3px;
  }
  &:hover {
    color: #71ab75;
    * {
      fill: #71ab75;
    }
  }
`;

const CenterIconImage = styled.img`
  max-height: 65%;
  max-width: 65%;
  padding-right: 8%;
  padding-bottom: 5%;
  transition: 0.3s;
  &:hover {
    max-height: 80%;
    max-width: 80%;
    transition: 0.3s;
  }
`;

export interface mobileNavProps {
  close: () => void;
}

const Tabbar = () => {
  const userRole = useAppSelector((state) => state.login.role);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const openAllMenu = () => {
    setIsNavOpen(true);
  };
  const closeAllMenu = () => {
    setIsNavOpen(false);
  };

  return (
    <>
      {isNavOpen && <MobileNav close={closeAllMenu} />}
      <Box>
        <Link to='/'>
          <IconWrapper>
            <FaListAlt color='#777777' size={30} />
            프로그램
          </IconWrapper>
        </Link>
        <Link to='/about/test'>
          <IconWrapper>
            <FaSyringe color='#777777' size={30} />
            테스트
          </IconWrapper>
        </Link>
        <Link to={userRole === '' ? '/login' : '/mypage'}>
          <CenterIcon>
            <CenterIconImage src='/teacup.png' />
          </CenterIcon>
        </Link>
        <Link to='/community/general'>
          <IconWrapper>
            <FaRegLaughSquint color='#777777' size={30} />
            커뮤니티
          </IconWrapper>
        </Link>
        <IconWrapper onClick={openAllMenu}>
          <FaRegFileAlt color='#777777' size={30} />
          메뉴 더보기
        </IconWrapper>
      </Box>
    </>
  );
};
export default Tabbar;
