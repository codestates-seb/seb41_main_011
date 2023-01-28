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

  @media screen and (min-width: 768px) {
    padding-bottom: 24px;
  }
`;

const ProgramList = (props: programListProps) => {
  const programList = props.data;

  return (
    <Contents>
      {programList.map((item: programListItemProps) => {
        return (
          <li key={item.programId}>
            <Link to={`/program/${item.programId}`}>
              <Program item={item} />
            </Link>
          </li>
        );
      })}
    </Contents>
  );
};

export default ProgramList;
