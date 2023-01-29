import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { myProgramListProps } from '../types';
import { viewBookDate, viewProgramDate, calculateStatus } from '../utils';

const Label = styled.div`
  background: #f3f0ca;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7b5108;
  width: fit-content;
  height: 80%;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.93rem;
  @media screen and (min-width: 700px) {
    width: 140px;
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
  transition: all 0.2s;

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

const MyPageProgram = (props: myProgramListProps) => {
  const programInfo = props.item;

  return (
    <Contents>
      <Link to={`/myprogram/${programInfo.payId}`}>
        <Label className='squretag'>
          {calculateStatus(
            programInfo.status,
            programInfo.dateStart,
            programInfo.dateEnd,
          )}
        </Label>
        <div className='flex-row'></div>
        <h3 className='title'>{programInfo.title}</h3>
        <div className='flex-row'>
          <div className='info'>
            <strong>예약일자</strong>
            {viewBookDate(programInfo.createdAt)}
          </div>
        </div>
        <div className='flex-row'>
          <div className='info'>
            <strong>상담사</strong>
            {programInfo.counselorName}
          </div>
        </div>
        <div className='flex-row'>
          <div className='info'>
            <strong>일시</strong>
            {viewProgramDate(programInfo.dateStart, programInfo.dateEnd)}
          </div>
          <div className='info'>
            <strong>정원</strong>
            {programInfo.userMax}명
          </div>
        </div>
      </Link>
    </Contents>
  );
};

export default MyPageProgram;
