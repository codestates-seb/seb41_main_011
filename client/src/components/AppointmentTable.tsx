import { useEffect } from 'react';
import styled from 'styled-components';
import { memberInPayListItemProps, memberInPayListProps } from '../types';

const Content = styled.table`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #4b6b4d;
  margin: 8px auto 0;

  th,
  td {
    padding: 0.4rem 0;
  }
  thead {
    th {
      background: #4b6b4d;
      color: #fff;
      font-weight: 500;
    }
  }

  tbody {
    tr:nth-child(even) {
      background: #eef3e8;
    }
    tr:nth-child(odd) {
      background: #fbfcf4;
    }
  }
`;

const AppointmentTable = (props: memberInPayListProps) => {
  const memberList = props.data;

  const getAge = (birthday: string) => {
    const thisYear = new Date().getFullYear();
    const birthYear = new Date(birthday).getFullYear();

    if (Number.isNaN(+thisYear - +birthYear)) {
      return '정보없음';
    } else {
      return +thisYear - +birthYear;
    }
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
        {memberList.length && memberList[0].nickName !== '' ? (
          memberList.map((userinfo: memberInPayListItemProps, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{userinfo.nickName}</td>
                <td>{userinfo.birth ? getAge(userinfo.birth) : '정보없음'}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={3}>예약한 회원이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </Content>
  );
};

export default AppointmentTable;
