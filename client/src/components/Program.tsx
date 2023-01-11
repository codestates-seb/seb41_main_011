import React from 'react';
import styled from 'styled-components';
import { GrFormNext } from 'react-icons/gr';

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

  .label {
    background: #dae2b6;
    border-radius: 4px;
    font-weight: 500;
    text-align: center;
    width: fit-content;
    padding: 0 4px;
    font-size: 0.84rem;
    color: #333;
    margin-bottom: 0.8rem;
  }

  .title {
    font-size: 1.53rem;
    font-weight: 700;
    width: 92%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

const Program = () => {
  return (
    <Contents>
      <GrFormNext className='icon' />
      <div className='flex-row'>
        <div className='label'>우울감</div>
        <div className='label'>불안감</div>
      </div>
      <div className='title'>프로그램 제목 어쩌구 저쩌구</div>
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

export default Program;
