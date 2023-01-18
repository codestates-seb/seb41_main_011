import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar";


const ContentWrapper = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
justify-content: space-between;
padding-top: 10%;
padding-bottom: 10%;

@media screen and (max-width: 768px) {
    padding-top: 0vh;
    padding-bottom: 0vh;
    justify-content: space-between;
    padding-top: 0%;
    padding-bottom: 0%;
}
`

const MainMessage = styled.div`
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
  text-align: left;
  @media screen and (min-width: 768px) {
    width: 400px;
  }
`

const SubMessage = styled.div`

	display: grid;
  justify-content: center;
  align-items: center;
	height: 15vh;
	grid-template-columns: 30% 60%;
	width: 80vw;
	background-color: #ECEEE2;
	border-radius: 10px;

	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
		@media screen and (min-width: 768px) {
			font-size: 14px;
			width: 500px;
		}

		@media screen and (min-width: 1200px) {
			font-size: 16px;
		}   

	.contentName {
		font-weight: 500;
		color: #5e430b;
	}
`
const Button = styled.button`

	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 10px;
	border: none;
	height: 3em;
	width: 80vw;
	background-color: #C4DCBF;
	font-weight: 500;
	color: #3d553e;
	font-size: 1rem;
	margin-top: 10px;

	&:hover {
			background-color: #70846C;
			color: white;
			cursor: pointer;
	}

	@media screen and (min-width: 768px) {
		height: 3em;
		width: 500px;
		font-size: 14px;
  }

	@media screen and (min-width: 1200px) {
		height: 3em;
		font-size: 16px;
  }

`
const Logo = styled.img`
	width: 70px;
  margin-top: 30px;
  @media screen and (min-width: 768px) {
    width: 110px;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
  }
`


const BookingCompleted = () => {
  const navigate = useNavigate();
  const toMain = () => {
    navigate('/');
  }

  return (
  <ContentWrapper>
    <Logo src="teacup.png"></Logo>
    <MainMessage>예약이 완료되었습니다!</MainMessage>
      <SubMessage>
        <div className="contentName">프로그램명</div>
        <div >프로그램 1</div>
        <div className="contentName">상담사</div>
        <div>오은영</div>
        <div className="contentName">일시</div>
        <div>2023년 0월 0일 3:30PM~ 4:30PM</div>
        <div className="contentName">비용</div>
        <div>20,000원</div>
      </SubMessage>
    <Button onClick={toMain}>메인 페이지로</Button>

    <Tabbar />
  </ContentWrapper>);
}

export default BookingCompleted;