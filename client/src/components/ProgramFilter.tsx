import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Contents = styled.div`
  width: 100%;
  padding: 16px 0;
  overflow-x: auto;

  a {
    color: inherit;
    display: block;
    padding: 2px 12px;
  }

  ul {
    width: max-content;
    gap: 8px;
    display: flex;
  }
  ul li {
    background: #d9d9d9;
    overflow: hidden;
    border-radius: 8px;
    font-weight: 500;
    text-align: center;
    width: fit-content;
    font-size: 1rem;
    color: #777;
    cursor: pointer;
    transition: all 0.2s;

    .active {
      background: #e2d48a;
      color: #5b3e00;
      font-weight: 700;
      &:hover,
      &:active {
        background: #d6c87e;
        color: #5b3e00;
      }
    }

    &:hover,
    &:active {
      background: #ccc;
      color: #666;
    }
  }
`;

const ProgramFilter = () => {
  const programTags = ['전체', '스트레스', '불안', '우울', '중독'];

  return (
    <Contents>
      <ul>
        {programTags.map((program, index) => {
          return (
            <li key={index}>
              <NavLink to={index === 0 ? '/' : `/programs/${index}`}>
                {program}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </Contents>
  );
};

export default ProgramFilter;
