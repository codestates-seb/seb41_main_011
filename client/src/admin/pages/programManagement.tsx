import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import CreatePrograms from './componentes/CreatePrograms';
import EditPrograms from './componentes/EditProgram';
import { programListProps } from '../types';
import Pagination from '../components/UI/Pagination';
import { viewProgramDate } from '../utils';

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
    vertical-align: middle;
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
  const [isCreateProgramModalOpened, setIsCreateProgramModalOpened] =
    useState(false);
  const [isModifyProgramModalOpened, setIsModifyProgramModalOpened] =
    useState(false);

  const [programList, setProgramList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const getPrograms = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST +
          `api/programs/admin/lookup/list?size=10&page=${page}`,
      );
      setProgramList(response.data.data);
      setTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrograms();
  }, [page]);

  const [programId, setProgramId] = useState(0);
  const modifyProgramInfoHandler = (id: number) => {
    setIsModifyProgramModalOpened(true);
    setProgramId(id);
  };

  return (
    <ContentWrapper>
      {isCreateProgramModalOpened ? (
        <CreatePrograms close={() => setIsCreateProgramModalOpened(false)} />
      ) : null}
      {isModifyProgramModalOpened ? (
        <EditPrograms
          id={programId}
          close={() => setIsModifyProgramModalOpened(false)}
        />
      ) : null}
      <Sidebar />
      <PageWrapper>
        <Title>개설 프로그램 현황</Title>
        <ProgramTable>
          <caption>
            <CreateWrapper>
              <Button onClick={() => setIsCreateProgramModalOpened(true)}>
                프로그램 생성
              </Button>
            </CreateWrapper>
          </caption>
          <thead>
            <tr>
              <th className='index'>ID</th>
              <th className='title'>제목</th>
              <th className='people'>정원</th>
              <th className='when'>일시</th>
              <th className='status'>상태</th>
              <th className='edit'>수정</th>
            </tr>
          </thead>
          <tbody>
            {programList.length !== 0 ? (
              programList.map((item: programListProps) => {
                return (
                  <tr key={item.programId}>
                    <td>{item.programId}</td>
                    <td>{item.title}</td>
                    <td>
                      {item.userCount}/{item.userMax}
                    </td>
                    <td>{viewProgramDate(item.dateStart, item.dateEnd)}</td>
                    <td>{item.counselorName}</td>
                    <td
                      className='openEditModal'
                      onClick={() => modifyProgramInfoHandler(item.programId)}
                    >
                      수정
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>개설 프로그램이 없습니다.</td>
              </tr>
            )}
          </tbody>
        </ProgramTable>

        <Pagination
          totalPage={totalPage}
          limit={5}
          page={page}
          setPage={(value) => setPage(value)}
        />
      </PageWrapper>
    </ContentWrapper>
  );
};

export default ProgramManagement;
