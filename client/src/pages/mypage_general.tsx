import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import MyPageProgram from "../components/Program_Mypage";
import Tabbar from "../components/tabbar";


const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
        justify-content: space-between;
    }
`
const Logo = styled.img`
	width: 70px;
  /* margin-bottom: -80px;
  margin-top: 30px; */
  @media screen and (min-width: 768px) {
    /* width: 110px;
    margin-bottom: -50px; */
  }
  @media screen and (min-width: 1200px) {
    /* width: 140px;
    margin-bottom: -80px; */
  }
`
const Title = styled.div`
  width: 80vw;
  text-align: left;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4B6A4D; 
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`

const Status = styled.div`
  width: 18vw;
  height: 5vh;
  display: flex;
  font-weight: 500;
  color: #333;
  justify-content: center;
  align-items: center;
  background-color: #C4DCBF;
  border-radius: 5px;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    width: 120px;
    height: 50px;
  }
  &.clicked {
    background-color: #70846C;
    color: #edffea;
  }
`

const StatusWrapper = styled.div`
  width: 80vw;
  display: grid;
  justify-content: space-between;
  grid-template-columns: auto auto auto auto;
  gap: 12px;
  /* box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px; */
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`
const ProgramWrapper = styled.div`
  width: 80vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  overflow: scroll;
  ::-webkit-scrollbar { 
    display: none; 
  }
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`


const MyPageGeneral = (props: any) => {
  const [allPrograms, setAllPrograms] = useState(true);
  const [programsConfirmed, setProgramsConfirmed] = useState(false);
  const [programsInProcess, setProgramsInProcess] = useState(false);
  const [programsCompleted, setProgramsCompleted] = useState(false);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  
  
  return (
    <ContentWrapper>
      <Logo src="Teacup.png"/>
      <Title>하헌진 님의 테라피 프로그램</Title>
      <StatusWrapper>
        <Status className={isActive1 ? 'clicked' : ''} onClick={(e) => {
          setAllPrograms(true);
          setProgramsConfirmed(false);
          setProgramsInProcess(false);
          setProgramsCompleted(false);
          setIsActive1(true);
          setIsActive2(false);
          setIsActive3(false);
          setIsActive4(false);
        }}>전체 목록</Status>
        <Status className={isActive2 ? 'clicked' : ''} onClick={() => {
          setAllPrograms(false);
          setProgramsConfirmed(true);
          setProgramsInProcess(false);
          setProgramsCompleted(false);
          setIsActive1(false);
          setIsActive2(true);
          setIsActive3(false);
          setIsActive4(false);
        }}>진행 예정</Status>
        <Status className={isActive3 ? 'clicked' : ''} onClick={() => {
          setAllPrograms(false);
          setProgramsConfirmed(false);
          setProgramsInProcess(true);
          setProgramsCompleted(false);
          setIsActive1(false);
          setIsActive2(false);
          setIsActive3(true);
          setIsActive4(false);
        }}>진행 중</Status>
        <Status className={isActive4 ? 'clicked' : ''} onClick={() => {
          setAllPrograms(false);
          setProgramsConfirmed(false);
          setProgramsInProcess(false);
          setProgramsCompleted(true);
          setIsActive1(false);
          setIsActive2(false);
          setIsActive3(false);
          setIsActive4(true);
        }}>완료</Status>
      </StatusWrapper>
      <ProgramWrapper>
        {allPrograms ? (
        <div>
          <MyPageProgram category={"진행 예정"} color={"red"}/>
          <MyPageProgram category={"진행 예정"} color={"red"}/>
          <MyPageProgram category={"진행 중"} color={"#ffffff"}/>
          <MyPageProgram category={"진행 중"} color={"#ffffff"}/>
          <MyPageProgram category={"완료"} color={"#ffffff"}/>
          <MyPageProgram category={"완료"} color={"#ffffff"}/>
        </div>) : null}
        {programsConfirmed ? (
        <div>
          <MyPageProgram category={"진행 예정"} />
          <MyPageProgram category={"진행 예정"} />
        </div>) : null}
        {programsInProcess ? (
        <div>
          <MyPageProgram category={"진행 중"}/>
          <MyPageProgram category={"진행 중"}/>
        </div>) : null}
        {programsCompleted ? (
        <div>
          <MyPageProgram category={"완료"}/>
          <MyPageProgram category={"완료"}/>
        </div>) : null}
      </ProgramWrapper>
      <Tabbar />
    </ContentWrapper>
  )

}

export default MyPageGeneral;