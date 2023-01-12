import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar";
import Program from "../components/Program";


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
const Logo = styled.img`
	width: 70px;
  margin-bottom: -80px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    width: 110px;
    margin-bottom: -50px;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
    margin-bottom: -80px;
  }
`

const MainMessage = styled.div`
  margin-top: 50px;
	width: 600px;
  margin-bottom: -50px;
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
  text-align: left;
    @media screen and (max-width: 768px) {
        width: 80vw;
        font-size: 2.25rem;
    }
`
const ToAllPrograms = styled.div `
  cursor: pointer;
  width: 80vw;
  color: #4B6A4D;
  text-align: right;
  text-decoration: underline;
  font-size: 13px;
  
  
  &:hover{
    color: #b47e19;
  }
  @media screen and (min-width: 768px) {
    width: 600px;
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: -50px;
  }

  @media screen and (max-height: 740px) { //Galaxy S9, Note 8 , S8 화면 규격에서 margin-bottom이 너무 안띄워져 있어서 수정
    margin-bottom: -40px;
  }
`

const ProgramWrapper = styled.div`
  width: 80vw;
  display: grid;
  grid-template-columns: auto;
  gap: 15px;
  @media screen and (min-width: 768px) {
    width: 600px;
    font-size: 2.25rem;
  }
`



const TestResult = () => {
  return (
    <div>
      <ContentWrapper>
        <Logo src="teacup.png" />
        <MainMessage>
        마오옹 님에게 추천하는 <br/>
        프로그램 이에요
        </MainMessage>
        <ToAllPrograms>
          다른 프로그램도 볼래요
        </ToAllPrograms>
        <ProgramWrapper>
          <Program />
          <Program />
          <Program />
        </ProgramWrapper>
        <Tabbar />
      </ContentWrapper>
    </div>
  )

}

export default TestResult;