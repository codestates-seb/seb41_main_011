import { useState, useEffect } from 'react';
import { ScreenWrapper } from '../../pages/componentes/CreatePrograms';
import { ProgramTable } from '../../pages/ProgramManagement';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { modalCloseProps, userProgramListProps } from '../../types';
import { viewProgramDate } from '../../utils';
import api from '../../../RefreshToken';

const ContentWrapper = styled.div`
  background: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const UserName = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  color: #333;
`;

const Generalinquiry = (props: modalCloseProps) => {
  const [modal, setModal] = useState<boolean>(true);
  const memberId = props.id;
  const nickName = props.name;

  const handleCloseButton = () => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = () => {
    setModal(!modal);
    props.close();
  };

  const [programList, setProgramList] = useState([]);

  const getProgramList = async () => {
    try {
      const response = await api.get(`/api/pays/admin/${memberId}/lookup/list`);
      setProgramList(response.data.data);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  useEffect(() => {
    getProgramList();
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: hidden;
      touch-action: none;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

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
        <UserName>{nickName}?????? ?????? ?????? ??????</UserName>
        <ProgramTable>
          <thead>
            <tr>
              <th className='index'>ID</th>
              <th className='title'>??????</th>
              <th className='when'>????????????</th>
              <th className='status'>?????????</th>
              <th className='people'>??????</th>
            </tr>
          </thead>
          <tbody>
            {programList.length !== 0 ? (
              programList.map((item: userProgramListProps) => {
                return (
                  <tr key={item.payId}>
                    <td>{item.payId}</td>
                    <td>{item.title}</td>
                    <td>{viewProgramDate(item.dateStart, item.dateEnd)}</td>
                    <td>{item.counselorName}</td>
                    <td>{item.userMax}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>?????? ?????? ????????? ????????????.</td>
              </tr>
            )}
          </tbody>
        </ProgramTable>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default Generalinquiry;
