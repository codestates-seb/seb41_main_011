import styled from 'styled-components';
import { GrFormNext } from 'react-icons/gr';

const Label = styled.div`
  background: #f3f0ca;
  border-radius: 10px;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  width: 22%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 4px;
  color: #7b5108;
  @media screen and (min-width: 768px) {
    font-size: 16px;
  }

`;

const Contents = styled.div`
  width: 80vw;
  padding: 1rem 1.15rem 0.8rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: #c4dcbf;
  border-radius: 12px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  color: #333;
  cursor: pointer;
  position: relative;
  margin-bottom: 15px;

  @media screen and (min-width: 768px) {
    width: 600px;
  }

  .squretag {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    polyline {
      stroke: #4b6a4d;
    }
  }

  &:hover,
  &:active {
    background: #70846c;
    color: #fff;
    .squretag {
      polyline {
        stroke: #8db990;
      }
    }
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
      <Label className='squretag'>{props.category}</Label>
      <div className='flex-row'>
      </div>
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
    </Contents>
  );
};

export default MyPageProgram;
