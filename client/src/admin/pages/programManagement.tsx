import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import CreatePrograms from './componentes/CreatePrograms';
import EditPrograms from './componentes/EditProgram';

export const PageWrapper = styled.div`
  width: calc(100% - 240px);
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

export const ProgramTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  border-bottom: 2px solid #009779;
  thead tr {
    background-color: #009779;
    color: #ffffff;
    text-align: center;

    .title {
      width: 40%;
    }
    .when {
      width: 15%;
    }
    .index,
    .status,
    .edit,
    .people {
      width: 8%;
    }
  }
  tbody {
    background-color: white;
    tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }
  }
  .openEditModal {
    color: #0066cc;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
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

export interface modalCloseProps {
  close: () => void;
}

const ProgramManagement = (props: any) => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [isModalOpened2, setIsModalOpened2] = useState(false);

  return (
    <ContentWrapper>
      {isModalOpened ? (
        <CreatePrograms close={() => setIsModalOpened(false)} />
      ) : null}
      {isModalOpened2 ? (
        <EditPrograms close={() => setIsModalOpened2(false)} />
      ) : null}
      <Sidebar />
      <PageWrapper>
        <Title>개설 프로그램 현황</Title>
        <ProgramTable>
          <caption>
            <CreateWrapper>
              <Button onClick={() => setIsModalOpened(true)}>
                프로그램 생성
              </Button>
            </CreateWrapper>
          </caption>
          <thead>
            <tr>
              <th className='index'>No.</th>
              <th className='title'>제목</th>
              <th className='people'>정원</th>
              <th className='when'>일시</th>
              <th className='status'>상태</th>
              <th className='edit'>수정</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item) => {
              return (
                <tr>
                  <td>{item}</td>
                  <td>프로그램명</td>
                  <td>2/10</td>
                  <td>2023-02-11 08:30</td>
                  <td>예정</td>
                  <td
                    className='openEditModal'
                    onClick={() => setIsModalOpened2(true)}
                  >
                    수정
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ProgramTable>
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

export default ProgramManagement;
