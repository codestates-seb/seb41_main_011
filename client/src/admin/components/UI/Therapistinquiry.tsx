import { useState, MouseEvent } from 'react';
import { ScreenWrapper } from '../../pages/componentes/CreatePrograms';
import { ProgramTable } from '../../pages/programManagement';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { modalCloseProps } from '../../types';

const ContentWrapper = styled.div`
  background: #fff;
  position: relative;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 70vw;
  max-width: 1200px;
  max-height: 75vh;
  overflow-y: auto;
`;
const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  background: none;
  font-size: 2rem;
  line-height: 1;
  transition: all 0.2s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;

const TherapistName = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  color: #333;
`;

const Therapistinquiry = (props: modalCloseProps) => {
  const [modal, setModal] = useState<boolean>(true);

  const handleCloseButton = (event: MouseEvent<HTMLButtonElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    setModal(!modal);
    props.close();
  };

  return (
    <ScreenWrapper modal={modal} onClick={handleBackdropClick}>
      <ContentWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton type='button' onClick={handleCloseButton}>
          <FaTimes />
        </CloseButton>
        <TherapistName>오은영님의 개설프로그램 조회</TherapistName>
        <ProgramTable>
          <thead>
            <tr>
              <th className='index'>No.</th>
              <th className='title'>제목</th>
              <th className='when'>상담시간</th>
              <th className='status'>상담사</th>
              <th className='people'>정원</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <tr>
                  <td>{item}</td>
                  <td>걸림돌과 디딤돌</td>
                  <td>2023-02-11 08:30</td>
                  <td>예정</td>
                  <td>28/30</td>
                </tr>
              );
            })}
          </tbody>
        </ProgramTable>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default Therapistinquiry;
