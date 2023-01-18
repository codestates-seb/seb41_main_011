import { useEffect,useState } from 'react'
import { ScreenWrapper,Button } from '../../pages/componentes/CreatePrograms';
import { ProgramTable } from '../../pages/programManagement';
import styled from "styled-components";

const TherapistName = styled.div`
    width: 70vw;
    height: 2.5rem;
    background-color: white;
    font-size: 2rem;
    line-height: 100%;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
`

const Therapistinquiry = () =>{

  const [modal, setModal] = useState<boolean>(true);
  

  useEffect(()=>{},[]);


  return (
    <ScreenWrapper modal={modal}>
    
        <TherapistName>오은영님의 개설프로그램 조회
        <Button className='closeButton' type='button' onClick={()=>setModal(!modal)}>X</Button>
        </TherapistName>
        <ProgramTable>
          <thead>
              <tr>
                  <th className='index'>No.</th>
                  <th className='title'>제목</th>
                  <th className='when'>상담시간</th>
                  <th className='status'>상담사</th>
                  <th className='people'>정원</th>
              </tr>
          </thead>
          <tbody>
            {[1,2,3,4,5].map((item) => {
              return (
                <tr>
                  <td>1</td>
                  <td>걸림돌과 디딤돌</td>
                  <td>2023-02-11 08:30</td>
                  <td>예정</td>
                  <td>28/30</td>
              </tr>
              )
            })}
          </tbody>
        </ProgramTable>
    </ScreenWrapper>



  )



}

export default Therapistinquiry