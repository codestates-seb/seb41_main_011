import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import Generalinquiry from '../components/UI/Generalinquiry';
import Therapistinquiry from '../components/UI/Therapistinquiry';
import CreateTherapist from './componentes/CreateTherapist';

export const PageWrapper = styled.div`
  width: calc(100% - 240px);
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  width: 100%;
  color: #006954;
  font-weight: 700;
  font-size: 2.25rem;
  line-height: 1;
`;

const ProgramTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-bottom: 2px solid #009779;
  thead tr {
    background-color: #009779;
    color: #ffffff;
    text-align: center;
  }
  tbody {
    background-color: white;
    tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
  }
  .openUserDetail,
  .openProgramDetail {
    color: #06c;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  th {
    font-weight: 500;
  }
  th,
  td {
    padding: 12px 15px;
    text-align: center;
  }
`;

const Pagination = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 3px 8px;
  width: fit-content;
  margin: 0 auto;

  .pagination {
    display: inline-block;
  }
  a {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    background-color: white;
    &:active {
      background-color: #009779;
      color: white;
    }
    &:hover {
      background-color: #009779;
      color: white;
    }
  }
`;
const CreateWrapper = styled.div`
  text-align: right;
  margin-bottom: 8px;
`;
const Button = styled.button`
  border: none;
  background-color: #009779;
  color: #ffffff;
  height: 40px;
  width: 120px;
  font-size: 16px;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #006d57;
  }
`;

const MenuBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    background-color: #d9d9d9;
    color: #525252;
    padding: 8px 0;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      background-color: #ccc;
      color: #333;
    }
    &.clicked {
      background-color: #009779;
      color: #fff;
      &:hover {
        background-color: #0d8b72;
      }
    }
  }
`;

export interface modalCloseProps {
  close: () => void;
}

const UserManagement = (props: any) => {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isModalOpened1, setIsModalOpened1] = useState(false);
  const [isModalOpened2, setIsModalOpened2] = useState(false);
  const [isModalOpened3, setIsModalOpened3] = useState(false);

  return (
    <ContentWrapper>
      <Sidebar />
      <PageWrapper>
        <Title>{isActive1 ? '회원 목록 - 일반' : '회원 목록 - 상담사'}</Title>
        <MenuBar>
          <div
            className={isActive1 ? 'clicked' : ''}
            onClick={() => {
              setIsActive1(!isActive1);
              setIsActive1(true);
              setIsActive2(false);
            }}
          >
            일반
          </div>
          <div
            className={isActive2 ? 'clicked' : ''}
            onClick={() => {
              setIsActive2(!isActive2);
              setIsActive1(false);
              setIsActive2(true);
            }}
          >
            상담사
          </div>
        </MenuBar>
        {isActive1 ? (
          <ProgramTable>
            {isModalOpened1 ? (
              <Generalinquiry close={() => setIsModalOpened1(false)} />
            ) : null}
            <thead>
              <tr>
                <th className='index'>No.</th>
                <th className='title'>유저 이름</th>
                <th className='people'>닉네임</th>
                <th className='when'>생년월일</th>
                <th className='detail'>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <tr>
                    <td>{item}</td>
                    <td>하헌진</td>
                    <td>고양이</td>
                    <td>2023.01.18</td>
                    <td
                      className='openUserDetail'
                      onClick={() => setIsModalOpened1(true)}
                    >
                      그룹상담내역
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </ProgramTable>
        ) : (
          <>
            {isModalOpened3 ? (
              <CreateTherapist close={() => setIsModalOpened3(false)} />
            ) : null}

            <ProgramTable>
              <caption>
                <CreateWrapper>
                  <Button onClick={() => setIsModalOpened3(true)}>
                    상담사 생성
                  </Button>
                </CreateWrapper>
              </caption>
              {isModalOpened2 ? (
                <Therapistinquiry close={() => setIsModalOpened2(false)} />
              ) : null}
              <thead>
                <tr>
                  <th className='index'>No.</th>
                  <th className='title'>상담사 이름</th>
                  <th className='programDetail'>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((item) => {
                  return (
                    <tr>
                      <td>{item}</td>
                      <td>하헌진</td>
                      <td
                        className='openProgramDetail'
                        onClick={() => setIsModalOpened2(true)}
                      >
                        그룹상담내역
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramTable>
          </>
        )}

        {/* 하단 페이지 네이션은 아직 장식임 */}
        <Pagination className='pagination'>
          <a href='#'>&laquo;</a>
          <a href='#'>1</a>
          <a className='active' href='#'>
            2
          </a>
          <a href='#'>3</a>
          <a href='#'>4</a>
          <a href='#'>5</a>
          <a href='#'>6</a>
          <a href='#'>&raquo;</a>
        </Pagination>
      </PageWrapper>
    </ContentWrapper>
  );
};

export default UserManagement;
