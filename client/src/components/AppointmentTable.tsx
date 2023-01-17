import { useMemo } from 'react';
import styled from 'styled-components';

const Content = styled.table`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #72ab76;
  margin: 8px auto 0;

  th,
  td {
    padding: 0.4rem 0;
  }
  thead {
    th {
      background: #72ab76;
      color: #fff;
      font-weight: 500;
    }
  }

  tbody {
    tr:nth-child(even) {
      background: #eef3e8;
    }
  }
`;

const AppointmentTable = () => {
  interface IData {
    username: string;
    birthday: string;
  }

  const ArrData: IData[] = useMemo(() => {
    return [
      { username: '스칼라장', birthday: '1988-09-23' },
      { username: '하하', birthday: '2000-12-25' },
      { username: '피카소', birthday: '1992-03-01' },
      { username: '다정다감', birthday: '1976-01-11' },
    ];
  }, []);

  const getAge = (birthday: string) => {
    const thisYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear();

    return +thisYear - +birthYear;
  };

  return (
    <Content>
      <thead>
        <tr>
          <th>No.</th>
          <th>닉네임</th>
          <th>나이</th>
        </tr>
      </thead>
      <tbody>
        {ArrData.map((userinfo, index) => {
          return (
            <tr key={userinfo.username + userinfo.birthday}>
              <td>{index}</td>
              <td>{userinfo.username}</td>
              <td>{getAge(userinfo.birthday)}</td>
            </tr>
          );
        })}
      </tbody>
    </Content>
  );
};

export default AppointmentTable;
