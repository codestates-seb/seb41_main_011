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
    .openUserDetail, .openProgramDetail{
        color: #156cb4;
        font-weight: bold;

        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
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
    grid-template-columns: auto auto;
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

const UserManagement = (props: any) => {
    const [isActive1, setIsActive1] = useState(true);
    const [isActive2, setIsActive2] = useState(false);

    return (
        <div>
            <ContentWrapper>
                <PageWrapper>
                    <Title>
                        {isActive1 ? '회원 목록 - 일반' : '회원 목록 - 상담사'}
                    </Title> 
                    <MenuBar>
                        <div className={isActive1 ? 'clicked' : ''} onClick={() => {setIsActive1(!isActive1)
                        setIsActive1(true);
                        setIsActive2(false);}}>
                            일반
                        </div>
                        <div className={isActive2 ? 'clicked' : ''} onClick={() => {setIsActive2(!isActive2)
                        setIsActive1(false);
                        setIsActive2(true);}}>
                            상담사
                        </div>
                    </MenuBar>
                    <Sidebar/> 
                        {
                            isActive1 ? 
                            <ProgramTable>
                            <thead>
                                <tr>
                                    <th className='index'>No.</th>
                                    <th className='title'>유저 이름</th>
                                    <th className='people'>닉네임</th>
                                    <th className='when'>상담횟수</th>
                                    <th className='detail'>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td>고양이</td>
                                    <td>3</td>
                                    <td className="openUserDetail">수정</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>하헌진</td>
                                    <td>고양이</td>
                                    <td>3</td>
                                    <td className="openUserDetail">수정</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>하헌진</td>
                                    <td>고양이</td>
                                    <td>3</td>
                                    <td className="openUserDetail">수정</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>하헌진</td>
                                    <td>고양이</td>
                                    <td>3</td>
                                    <td className="openUserDetail">수정</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>하헌진</td>
                                    <td>고양이</td>
                                    <td>3</td>
                                    <td className="openUserDetail">수정</td>
                                </tr>
                            </tbody>
                        </ProgramTable> 
                        : <ProgramTable>
                            <thead>
                                <tr>
                                    <th className='index'>No.</th>
                                    <th className='title'>상담사 이름</th>
                                    <th className='programDetail'>상세보기</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td className="openProgramDetail">그룹상담내역</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td className="openProgramDetail">그룹상담내역</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td className="openProgramDetail">그룹상담내역</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td className="openProgramDetail">그룹상담내역</td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>하헌진</td>
                                    <td className="openProgramDetail">그룹상담내역</td>
                                </tr>  
                            </tbody>
                        </ProgramTable>

                        }
                        
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

export default UserManagement;
