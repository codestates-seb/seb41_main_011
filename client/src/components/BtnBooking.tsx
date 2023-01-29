import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { programIdProps } from '../types';
import { paymentActions } from '../store/payment';
import Button from './UI/Button';

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  gap: 8px;
  margin: 20px auto;

  p {
    color: #8e6610;
    font-size: 0.92rem;
  }

  a {
    color: inherit;
    display: block;
  }

  @media screen and (min-width: 1200px) {
    width: calc(50% - 24px);
    margin: 0 auto 0 0;
    flex-direction: column-reverse;
  }
`;

const BtnBooking = (props: programIdProps) => {
  const programId = props.id;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.login.role);

  const buttonClickHandler = () => {
    if (!localStorage.getItem('accessToken')) {
      alert('로그인 후 이용해주세요.');
      navigate('/login-general');
    } else if (userRole !== 'USER') {
      alert('일반 회원만 예약할 수 있습니다.');
    } else {
      dispatch(paymentActions.programId(programId));
      navigate('/program/book');
    }
  };

  return (
    <Contents>
      <p>자리가 얼마 남지 않았어요. 정원 마감 전 예약하세요!</p>
      <Button
        width='100%'
        height='40px'
        fontsize='1.1rem'
        onClick={buttonClickHandler}
      >
        예약하기
      </Button>
    </Contents>
  );
};

export default BtnBooking;
