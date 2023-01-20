import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Label = styled.div`
  background: #f3f0ca;
  font-weight: 500;
  text-align: center;
  color: #7b5108;
  width: fit-content;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.93rem;
  @media screen and (min-width: 700px) {
    width: 140px;
    height: 100px;
    line-height: 100px;
    border-radius: 10px;
    padding: 0;
    font-size: 1rem;
  }
`;

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: #c4dcbf;
  border-radius: 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #333;
  cursor: pointer;
  position: relative;
  padding: 0.8rem 1rem;

  a {
    color: inherit;
  }

  @media screen and (min-width: 700px) {
    padding: 1rem 1.3rem;
    .squretag {
      position: absolute;
      right: 1.3rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  &:hover,
  &:active {
    background: #70846c;
    color: #fff;
  }

  .flex-row {
    display: flex;
    flex-direction: row;
    gap: 4px;
  }

  .title {
    font-size: 1.25rem;
    font-weight: 700;
    width: 92%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 0.6rem;

    @media screen and (min-width: 700px) {
      width: calc(92% - 140px);
    }
  }

  .info {
    font-size: 0.92rem;
    margin-top: 4px;
    strong {
      font-weight: 500;
      display: inline-block;
      margin-right: 4px;
    }
  }
`;

const MyPageProgram = (props: any) => {
  return (
    <Contents>
      <Link to='/myprogram/1'>
        <Label className='squretag'>{props.category}</Label>
        <div className='flex-row'></div>
        <h3 className='title'>프로그램 제목 어쩌구 저쩌구</h3>
        <div className='flex-row'>
          <div className='info'>
            <strong>예약일자</strong>
            2023년 01월 02일
          </div>
        </div>
        <div className='flex-row'>
          <div className='info'>
            <strong>상담사</strong>
            햄토끼
          </div>
        </div>
        <div className='flex-row'>
          <div className='info'>
            <strong>일시</strong>
            2023.01.09
          </div>
          <div className='info'>
            <strong>정원</strong>
            17/30
          </div>
        </div>
      </Link>
    </Contents>
  );
};

export default MyPageProgram;
