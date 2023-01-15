import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa';
import { useState } from 'react';

const Content = styled.button`
  display: none;
  cursor: pointer;
  background: none;
  border: 0;
  position: relative;
  height: 100%;

  .icon {
    background: #ddd;
    border-radius: 50000px;
    font-size: 1.83rem;
    fill: #828282;
  }

  > span {
    font-size: 0.55rem;
    transform: scaleY(70%);
  }

  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;

const SubNav = styled.ul`
  display: ${({ isShow }: { isShow: boolean }) => (isShow ? 'block' : 'none')};
  position: absolute;
  top: 64px;
  right: -20px;
  width: max-content;
  min-width: 140px;
  background: #f7f9ed;
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
  }
`;

const MyPage = () => {
  const [showOptions, setShowOptions] = useState(false);
  const onClickHandler = () => {
    setShowOptions(!showOptions);
  };
  const onBlurHandler = () => {
    setShowOptions(false);
  };

  return (
    <Content onClick={onClickHandler} onBlur={onBlurHandler}>
      <FaUser className='icon' />
      <span>{showOptions ? '▲' : '▼'}</span>
      <SubNav isShow={showOptions ? true : false}>
        <li>
          <Link to='#'>#나의_프로그램</Link>
        </li>
        <li>
          <Link to='#'>#회원정보_수정</Link>
        </li>
      </SubNav>
    </Content>
  );
};

export default MyPage;
