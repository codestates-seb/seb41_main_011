import { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/UI/Sidebar";



export const PageWrapper = styled.div`
  width: 90vw;
  height: 100vh;
  right: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;

`

const ContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
      padding-top: 0vh;
      padding-bottom: 0vh;
      height: 100vh;
      justify-content: space-between;
  }
`

const Title = styled.div`
  width: 70vw;
  color: #4B6A4D;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  left: 0;
  top: 0;
`

const ProgramTable =  styled.table `
  overflow: hidden;
  width: 70vw;
  height: 50vh;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  thead tr {
      background-color: #009879;
      color: #ffffff;
      text-align: center;
  }
  tbody
  {
      background-color: white;
          tr:nth-of-type(even) {
              background-color: #f3f3f3;
          }
          tr:last-of-type {
              border-bottom: 2px solid #009879;
          }
  }

    .paymentCancel {
        color: #156cb4;
        font-weight: bold;
        text-decoration: underline;

        &:hover{
            cursor: pointer;
        }
    }
    .paymentCancelCompleted, .paymentCompleted {
        color: #009879;
        font-weight: bold;

    }

  th {
      font-weight: bold;
  }
  th, td {
      padding: 12px 15px;
      text-align: center;
      vertical-align: middle;
    
  }
`

const Pagination = styled.div`

  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 3px 8px;


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
              background-color: #009879;
              color: white;
          }
          &:hover {
              background-color: #009879;
              color: white;
          }
      }
  
`

const MenuBar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  width: 80vw;
  height: 4vh;
  overflow: hidden;
  div {
      display: flex;
      font-weight: 500;
      justify-content: center;
      align-items: center;
      background-color: #ffffff;
      color: #333;
      &:hover {
      cursor: pointer;
          background-color: #009879;
          color: #ffffff;
      }
      }
      .clicked {
          background-color: #009879;
          color: white;
      }

  @media screen and (min-width: 768px) {
  width: 70vw;
  }
  
`

const PaymentManagement = (props: any) => {
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isCancellationConfirmed, setIsCancellationConfirmed] = useState(false);

  return (
      <div>
          <ContentWrapper>
              <PageWrapper>
                  <Title>
                      {isActive1 ? '결제 목록 - 일반' : '결제 목록 - 취소'}
                  </Title> 
                  <MenuBar>
                      <div className={isActive1 ? 'clicked' : ''} onClick={() => {setIsActive1(!isActive1)
                      setIsActive1(true);
                      setIsActive2(false);
                      setIsActive3(false);}}>
                          일반 결제
                      </div>
                      <div className={isActive2 ? 'clicked' : ''} onClick={() => {setIsActive2(!isActive2)
                      setIsActive1(false);
                      setIsActive2(true);
                      setIsActive3(false);}}>
                          취소 진행중
                      </div>
                      <div className={isActive3 ? 'clicked' : ''} onClick={() => {setIsActive3(!isActive3)
                      setIsActive1(false);
                      setIsActive2(false);
                      setIsActive3(true);}}>
                          취소 완료
                      </div>
                  </MenuBar>
                  <Sidebar/> 
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
                            {isActive1 ? [1,2,3,4,5].map(item => {
                              return (
                                <tr>
                                    <td>1</td>
                                    <td>김초이</td>
                                    <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                                    <td>25,000원</td>
                                    <td>신용카드</td>
                                    <td className='paymentCompleted'>완료</td>
                                </tr>
                              )
                            })
                          : isActive2 ?[1,2,3,4,5].map(item => {
                            return (
                              <tr>
                                <td>1</td>
                                <td>하헌진</td>
                                <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                                <td>25,000원</td>
                                <td>신용카드</td>
                                <td className='paymentCancel' onClick={()=>{
                                   if (window.confirm("결제를 취소 하시겠습니까?")) {
                                    //결제 취소하는 함수 실행시키기
                                    window.alert(" 결제 취소가 완료되었습니다.");
                                  }
                                }}>결제 취소</td>
                              </tr> 
                            )
                          })
                          : [1,2,3,4,5].map(item => {
                            return (
                              <tr>
                                <td>1</td>
                                <td>하헌진</td>
                                <td>4a116464-969c-11ed-a1eb-0242ac120002</td>
                                <td>25,000원</td>
                                <td>신용카드</td>
                                <td className='paymentCancelCompleted'>취소 완료</td>
                              </tr> 
                            )
                          })
                        }
                          </tbody>
                      </ProgramTable> 
                      
                      {/* 하단 페이지 네이션은 아직 장식임 */}
                      <Pagination className="pagination"> 
                          <a href="#">&laquo;</a>
                          <a href="#">1</a>
                          <a className="active" href="#">2</a>
                          <a href="#">3</a>
                          <a href="#">4</a>
                          <a href="#">5</a>
                          <a href="#">6</a>
                          <a href="#">&raquo;</a>
                      </Pagination>  
              </PageWrapper>
          </ContentWrapper>
          
      </div>
  )
}

export default PaymentManagement;
