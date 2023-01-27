import { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';

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

  .paymentCancel {
    color: #0066cc;
    font-weight: 500;
    transition: all 0.2s;
    text-decoration: underline;
    cursor: pointer;
  }
  .paymentCancelCompleted,
  .paymentCompleted {
    color: #009779;
    font-weight: 500;
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

const MenuBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
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

const PaymentManagement = (props: any) => {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isCancellationConfirmed, setIsCancellationConfirmed] = useState(false);

  return (
    <ContentWrapper>
      <Sidebar />
      <PageWrapper>
        <Title>{isActive1 ? '결제 목록 - 일반' : '결제 목록 - 취소'}</Title>
        <MenuBar>
          <div
            className={isActive1 ? 'clicked' : ''}
            onClick={() => {
              setIsActive1(!isActive1);
              setIsActive1(true);
              setIsActive2(false);
              setIsActive3(false);
            }}
          >
            일반 결제
          </div>
          <div
            className={isActive2 ? 'clicked' : ''}
            onClick={() => {
              setIsActive2(!isActive2);
              setIsActive1(false);
              setIsActive2(true);
              setIsActive3(false);
            }}
          >
            취소 신청
          </div>
          <div
            className={isActive3 ? 'clicked' : ''}
            onClick={() => {
              setIsActive3(!isActive3);
              setIsActive1(false);
              setIsActive2(false);
              setIsActive3(true);
            }}
          >
            취소 완료
          </div>
        </MenuBar>
        <ProgramTable>
          <thead>
            <tr>
              <th className='index'>No.</th>
              <th className='name'>이름</th>
              <th className='paymentId'>결제 ID</th>
              <th className='amountPaid'>결제 금액</th>
              <th className='paymentType'>결제 종류</th>
              <th className='paymentStatus'>결제 상태</th>
            </tr>
          </thead>
          <tbody>
            {isActive1
              ? [1, 2, 3, 4, 5].map((item) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>김초이</td>
                      <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                      <td>25,000원</td>
                      <td>신용카드</td>
                      <td className='paymentCompleted'>완료</td>
                    </tr>
                  );
                })
              : isActive2
              ? [1, 2, 3, 4, 5].map((item) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>하헌진</td>
                      <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                      <td>25,000원</td>
                      <td>신용카드</td>
                      <td
                        className='paymentCancel'
                        onClick={() => {
                          if (window.confirm('결제를 취소 하시겠습니까?')) {
                            //결제 취소하는 함수 실행시키기
                            window.alert(' 결제 취소가 완료되었습니다.');
                          }
                        }}
                      >
                        결제 취소
                      </td>
                    </tr>
                  );
                })
              : [1, 2, 3, 4, 5].map((item) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>하헌진</td>
                      <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                      <td>25,000원</td>
                      <td>신용카드</td>
                      <td className='paymentCancelCompleted'>취소 완료</td>
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

export default PaymentManagement;
