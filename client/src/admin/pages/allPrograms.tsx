import { useNavigate } from "react-router";
import styled from "styled-components";
import Sidebar from "../components/UI/Sidebar";

const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
        justify-content: space-between;
    }
`

const Title = styled.div`

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
// const ProgramWrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     width: 70vw;
//     height: 50vh;
//     border: 1px solid black;
// `

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
            width: 30%;
        }
        .wheen {
            width: 20%;
        }
        .index, .status, .edit, .people{
            width:8%;
        }
    }
    th, td {
    padding: 12px 15px;

    tbody{
    border-bottom: 1px solid #dddddd;
        &tr:nth-of-type(even) {
            background-color: #f3f3f3;
        }
        &tr:last-of-type {
        border-bottom: 2px solid #009879;
    }
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
                {/* <ProgramWrapper> */}
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
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                            </tr>
                            <tr className="active-row">
                                <td>1</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                                <td>6000</td>
                            </tr>
                        </tbody>
                    </ProgramTable>

                {/* </ProgramWrapper> */}
          
            </ContentWrapper>
        </div>
    )
}

export default AdminAllPrograms;
