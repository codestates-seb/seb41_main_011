import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import Generalinquiry from '../components/UI/Generalinquiry';
import Therapistinquiry from '../components/UI/Therapistinquiry';
import CreateTherapist from './componentes/CreateTherapist';
import Pagination from '../components/UI/Pagination';
import api from '../../RefreshToken';
import { userListProps, therapistListProps } from '../types';

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

const UserManagement = (props: any) => {
  const [isGeneral, setIsGeneral] = useState(true);
  const [isTherapist, setIsTherapist] = useState(false);
  const [isUserDetailModalOpened, setIsUserDetailModalOpened] = useState(false);
  const [isTherapistDetailModalOpened, setIsTherapistDetailModalOpened] =
    useState(false);
  const [isCreateTherapistModalOpened, setIsCreateTherapistModalOpened] =
    useState(false);

  const [userList, setUserList] = useState([]);
  const [userPage, setUserPage] = useState(1);
  const [userTotalPage, setUserTotalPage] = useState(1);

  const getUsers = async () => {
    try {
      const response = await api.get(
        `/api/members/total-look-up?size=10&page=${userPage}`,
      );
      setUserList(response.data.data);
      setUserTotalPage(response.data.pageInfo.totalPages);
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
    getUsers();
  }, [isGeneral, userPage]);

  const [memberId, setMemberId] = useState(0);
  const [nickName, setNickName] = useState('');
  const userDetailClickHandler = (id: number, name: string) => {
    setIsUserDetailModalOpened(true);
    setMemberId(id);
    setNickName(name);
  };

  const [therapistList, setTherapistList] = useState([]);
  const [therapistPage, setTherapistPage] = useState(1);
  const [therapistTotalPage, setTherapistTotalPage] = useState(1);

  const getTherapists = async () => {
    try {
      const response = await api.get(
        `/api/counselors/total-look-up?size=10&page=${therapistPage}`,
      );
      setTherapistList(response.data.data);
      setTherapistTotalPage(response.data.pageInfo.totalPages);
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
    getTherapists();
  }, [isTherapist, therapistPage]);

  const [counselorId, setCounselorId] = useState(0);
  const [counselorName, setCounselorName] = useState('');
  const therapistDetailClickHandler = (id: number, name: string) => {
    setIsTherapistDetailModalOpened(true);
    setCounselorId(id);
    setCounselorName(name);
  };

  return (
    <ContentWrapper>
      <Sidebar />
      <PageWrapper>
        <Title>{isGeneral ? '회원 목록 - 일반' : '회원 목록 - 상담사'}</Title>
        <MenuBar>
          <div
            className={isGeneral ? 'clicked' : ''}
            onClick={() => {
              setIsGeneral(!isGeneral);
              setIsGeneral(true);
              setIsTherapist(false);
            }}
          >
            일반
          </div>
          <div
            className={isTherapist ? 'clicked' : ''}
            onClick={() => {
              setIsTherapist(!isTherapist);
              setIsGeneral(false);
              setIsTherapist(true);
            }}
          >
            상담사
          </div>
        </MenuBar>
        {isGeneral ? (
          <>
            <ProgramTable>
              {isUserDetailModalOpened ? (
                <Generalinquiry
                  id={memberId}
                  name={nickName}
                  close={() => setIsUserDetailModalOpened(false)}
                />
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
                {userList.length !== 0 ? (
                  userList.map((item: userListProps) => {
                    return (
                      <tr key={item.memberId}>
                        <td>{item.memberId}</td>
                        <td>{item.memberName}</td>
                        <td>{item.nickName}</td>
                        <td>{item.birth}</td>
                        {item.role === 'USER' ? (
                          <td
                            className='openUserDetail'
                            onClick={() =>
                              userDetailClickHandler(
                                item.memberId,
                                item.nickName,
                              )
                            }
                          >
                            그룹상담내역
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5}>회원이 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </ProgramTable>
            <Pagination
              totalPage={userTotalPage}
              limit={5}
              page={userPage}
              setPage={(value) => setUserPage(value)}
            />
          </>
        ) : (
          <>
            {isCreateTherapistModalOpened ? (
              <CreateTherapist
                close={() => setIsCreateTherapistModalOpened(false)}
              />
            ) : null}

            <ProgramTable>
              <caption>
                <CreateWrapper>
                  <Button onClick={() => setIsCreateTherapistModalOpened(true)}>
                    상담사 생성
                  </Button>
                </CreateWrapper>
              </caption>
              {isTherapistDetailModalOpened ? (
                <Therapistinquiry
                  id={counselorId}
                  name={counselorName}
                  close={() => setIsTherapistDetailModalOpened(false)}
                />
              ) : null}
              <thead>
                <tr>
                  <th className='index'>상담사ID</th>
                  <th className='title'>상담사 이름</th>
                  <th className='programDetail'>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {therapistList.length !== 0 ? (
                  therapistList.map((item: therapistListProps) => {
                    return (
                      <tr key={item.counselorId}>
                        <td>{item.counselorId}</td>
                        <td>{item.counselorName}</td>
                        <td
                          className='openProgramDetail'
                          onClick={() =>
                            therapistDetailClickHandler(
                              item.counselorId,
                              item.counselorName,
                            )
                          }
                        >
                          그룹상담내역
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={3}>상담사가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </ProgramTable>
            <Pagination
              totalPage={therapistTotalPage}
              limit={5}
              page={therapistPage}
              setPage={(value) => setTherapistPage(value)}
            />
          </>
        )}
      </PageWrapper>
    </ContentWrapper>
  );
};

export default UserManagement;
