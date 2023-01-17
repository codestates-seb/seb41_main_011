import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  display: none;

  @media screen and (min-width: 768px) {
    display: flex;
    gap: 4px;
  }

  @media screen and (min-width: 1200px) {
    gap: 12px;
  }
`;

const Button = styled.button`
  font-weight: 500;
  border-radius: 8px;
  padding: 4px 20px;
  border: 0;
  cursor: pointer;
  font-size: 0.85rem;

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

  @media screen and (min-width: 1200px) {
    padding: 8px 24px;
    border-radius: 12px;
  }
`;

const HeaderButtons = () => {
  return (
    <ButtonWrapper>
      <Button className='style1'>
        <Link to='#'>로그인</Link>
      </Button>
      <Button className='style2'>
        <Link to='/signup'>회원가입</Link>
      </Button>
    </ButtonWrapper>
  );
};

export default HeaderButtons;
