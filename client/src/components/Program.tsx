import styled from 'styled-components';
import { GrFormNext } from 'react-icons/gr';

import Label from './UI/Label';
import { programInfoProps } from '../types';
import { viewProgramDate } from '../utils';

const Contents = styled.div`
  width: 100%;
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
  transition: all 0.2s;

  .icon {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.6rem;
    polyline {
      stroke: #4b6a4d;
    }
  }

  &:hover,
  &:active {
    background: #70846c;
    color: #fff;
    .icon {
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

const Program = (props: programInfoProps) => {
  const programInfo = props.item;

  return (
    <Contents>
      <GrFormNext className='icon' />
      <div className='flex-row'>
        {programInfo.symptomTypes.map((type: string, idx: number) => {
          return <Label key={idx}>{type}</Label>;
        })}
      </div>
      <h3 className='title'>{programInfo.title}</h3>
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
        {/* <div className='info'>
          <strong>정원</strong>
          17/30
        </div> */}
      </div>
    </Contents>
  );
};

export default Program;
