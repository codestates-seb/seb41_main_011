import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Program from './Program';
import { programListProps, programListItemProps } from '../types';

const Contents = styled.ul`
  width: 100%;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .empty {
    padding: 100px 0;
  }

  @media screen and (min-width: 768px) {
    padding-bottom: 24px;
  }
`;

const ProgramList = (props: programListProps) => {
  const programList = props.data;

  return (
    <Contents>
      {programList.length !== 0 ? (
        programList.map((item: programListItemProps) => {
          return (
            <li key={item.programId}>
              <Link to={`/program/${item.programId}`}>
                <Program item={item} />
              </Link>
            </li>
          );
        })
      ) : (
        <li>
          <div className='empty'>
            그룹 테라피 프로그램을 열심히 준비중입니다.
            <br />
            조금만 기다려주세요.
          </div>
        </li>
      )}
    </Contents>
  );
};

export default ProgramList;
