import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import Pagination from '../components/UI/Pagination';
import axios from 'axios';
import { paymentListItemProps } from '../types';
import { viewCost } from '../utils';

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
  const [isComplete, setIsComplete] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isCancel, setIsCancel] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState('COMPLETE_PAYMENT');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [paymentList, setPaymentList] = useState([]);

  const getPaymentList = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST +
          `/api/pays/admin/payment/list?page=${page}&size=10&status=${paymentStatus}`,
      );
      setPaymentList(response.data.data);
      setTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPaymentList();
  }, [page, paymentStatus]);

  const patchCancelPayment = async (payId: number) => {
    try {
      await axios.patch(
        process.env.REACT_APP_DB_HOST + `/api/pays/admin/${payId}/edit`,
      );
      window.alert(' 결제 취소가 완료되었습니다.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const confirmCancelHandler = (payId: number) => {
    const isCancel = window.confirm('결제를 취소 하시겠습니까?');
    if (isCancel) {
      patchCancelPayment(payId);
    }
  };

  return (
    <ContentWrapper>
      <Sidebar />
      <PageWrapper>
        <Title>{isComplete ? '결제 목록 - 일반' : '결제 목록 - 취소'}</Title>
        <MenuBar>
          <div
            className={isComplete ? 'clicked' : ''}
            onClick={() => {
              setIsComplete(!isComplete);
              setIsComplete(true);
              setIsWaiting(false);
              setIsCancel(false);
              setPaymentStatus('COMPLETE_PAYMENT');
            }}
          >
            일반 결제
          </div>
          <div
            className={isWaiting ? 'clicked' : ''}
            onClick={() => {
              setIsWaiting(!isWaiting);
              setIsComplete(false);
              setIsWaiting(true);
              setIsCancel(false);
              setPaymentStatus('WAITING_CANCEL_PAYMENT');
            }}
          >
            취소 신청
          </div>
          <div
            className={isCancel ? 'clicked' : ''}
            onClick={() => {
              setIsCancel(!isCancel);
              setIsComplete(false);
              setIsWaiting(false);
              setIsCancel(true);
              setPaymentStatus('CANCEL_PAYMENT');
            }}
          >
            취소 완료
          </div>
        </MenuBar>
        {isComplete && (
          <>
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
                {paymentList.map((item: paymentListItemProps, idx: number) => {
                  return (
                    <tr key={item.payId}>
                      <td>{paymentList.length - idx}</td>
                      <td>{item.memberName}</td>
                      <td>{item.payId}</td>
                      <td>{viewCost(item.cost)}원</td>
                      <td>신용카드</td>
                      <td className='paymentCompleted'>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramTable>
            <Pagination
              page={page}
              limit={5}
              totalPage={totalPage}
              setPage={setPage}
            />
          </>
        )}

        {isWaiting && (
          <>
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
                {paymentList.map((item: paymentListItemProps, idx: number) => {
                  return (
                    <tr key={item.payId}>
                      <td>{paymentList.length - idx}</td>
                      <td>{item.memberName}</td>
                      <td>{item.payId}</td>
                      <td>{viewCost(item.cost)}원</td>
                      <td>신용카드</td>
                      <td
                        className='paymentCancel'
                        onClick={() => confirmCancelHandler(item.payId)}
                      >
                        취소 승인
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramTable>
            <Pagination
              page={page}
              limit={5}
              totalPage={totalPage}
              setPage={setPage}
            />
          </>
        )}

        {isCancel && (
          <>
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
                {paymentList.map((item: paymentListItemProps, idx: number) => {
                  return (
                    <tr key={item.payId}>
                      <td>{paymentList.length - idx}</td>
                      <td>{item.memberName}</td>
                      <td>{item.payId}</td>
                      <td>{viewCost(item.cost)}원</td>
                      <td>신용카드</td>
                      <td className='paymentCancelCompleted'>{item.status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </ProgramTable>
            <Pagination
              page={page}
              limit={5}
              totalPage={totalPage}
              setPage={setPage}
            />
          </>
        )}
      </PageWrapper>
    </ContentWrapper>
  );
};

export default PaymentManagement;
