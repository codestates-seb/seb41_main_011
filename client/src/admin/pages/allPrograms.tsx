import { useNavigate } from "react-router";
import styled from "styled-components";
import Sidebar from "../components/UI/Sidebar";

const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
        justify-content: space-between;
    }
`

const Title = styled.div`
    width: 70vw;
    height: 50vh;
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
    text-align: left;
    left: 0;
    top: 0;
    position: absolute;
    margin-left: 18vw;
    margin-top: 5vh;
    
`

const ProgramTable =  styled.table `
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

        .title {
            width: 40%;
        }
        .when {
            width: 15%;
        }
        .index, .status, .edit, .people{
            width:8%;
        }
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
    .openEditModal{
        color: #156cb4;
        font-weight: bold;

        &:hover{
            cursor: pointer;
            text-decoration: underline;
        }
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

const AdminAllPrograms = () => {
    return (
        <div>
            <ContentWrapper>
                <Title>
                    개설 프로그램 현황
                </Title> 
                <Sidebar/> 
                    <ProgramTable>
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
                            <tr>
                                <td>1</td>
                                <td>프로그램명</td>
                                <td>2/10</td>
                                <td>2023-02-11 08:30</td>
                                <td>예정</td>
                                <td className="openEditModal">수정</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>프로그램명</td>
                                <td>2/10</td>
                                <td>2023-02-11 08:30</td>
                                <td>예정</td>
                                <td className="openEditModal">수정</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>프로그램명</td>
                                <td>2/10</td>
                                <td>2023-02-11 08:30</td>
                                <td>예정</td>
                                <td className="openEditModal">수정</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>프로그램명</td>
                                <td>2/10</td>
                                <td>2023-02-11 08:30</td>
                                <td>예정</td>
                                <td className="openEditModal">수정</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>프로그램명</td>
                                <td>2/10</td>
                                <td>2023-02-11 08:30</td>
                                <td>예정</td>
                                <td className="openEditModal">수정</td>
                            </tr>
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

                {/* </ProgramWrapper> */}
          
            </ContentWrapper>
        </div>
    )
}

export default AdminAllPrograms;
