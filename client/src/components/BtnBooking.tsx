import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch } from '../store/hooks';
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

  const buttonClickHandler = () => {
    dispatch(paymentActions.programId(programId));
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
        <Link to='/program/book'>예약하기</Link>
      </Button>
    </Contents>
  );
};

export default BtnBooking;
