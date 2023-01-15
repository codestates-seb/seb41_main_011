import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar";

const OuterWrapper = styled.div`
	height: 100vh;
  display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 768px) {
		height: 100vh;
        flex-direction: column-reverse;
    }
`

const ContentWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	> div {
		margin-bottom: 30px;
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
	padding: 5%;
	height: auto;
	grid-template-columns: 30% 70%;
	line-height: 30px;
	width: 80vw;
	background-color: #ECEEE2;
	border-radius: 10px;
	justify-content: center;
	align-items: center;
	box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
		@media screen and (min-width: 768px) {
			font-size: 14px;
			width: 400px;
		}

		@media screen and (min-width: 1200px) {
			font-size: 16px;
		}   

	.contentName {
		font-weight: 500;
		color: #5e430b;
	}
`

const InputGrid = styled.div`
	display: grid;
  width: 80vw;
	height: auto;
  grid-template-columns: auto;
	gap: 10%;
  @media screen and (min-width: 768px) {
		font-size: 14px;
    width: 400px;
  }
	.div {
		display: flex;
		justify-content: space-between;
	}
	.select {
		color: gray;
		width: 50%;
		@media screen and (max-width: 768px) {
		width: 45%;
  	}
		border-radius: 5px;
		border: 1px solid  #d3d3d3;
		padding-left: 3%;
		padding-right: 3%;
		.placeholder {
			display: none;
		}
	}
`
const Button = styled.button`

	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 10px;
	border: none;
	height: 3em;
	width: 20em;
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
		width: 35vw;
		font-size: 14px;
  }

	@media screen and (min-width: 1200px) {
		height: 3em;
		width: 400px;
		font-size: 16px;
  }

`

const Input = styled.input`


  height: 30px;
  border-radius: 5px;
  border: 1px solid  #d3d3d3;
  padding-left: 3%;
  padding-right: 3%;
  @media screen and (min-width: 768px) {
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
  ::placeholder{
  }
`

const Logo = styled.img`
	width: 200px;
	height: 200px;
	margin-left: 5vw;
	@media screen and (max-width: 768px) {
        display: none;
  }
	@media screen and (min-width: 768px) {
		width: 300px;
		height: 300px;
		margin-bottom: 40px;
  }
	@media screen and (min-width: 1200px) {
		width: 400px;
		height: 400px;
		margin-bottom: 40px;
  }
`

const MobileLogo = styled.img`
	width: 20vw;
	@media screen and (min-width: 768px) {
		display: none;
    }
`

const Book = () => {
  const navigate = useNavigate();
  const ToBookingConfirmed = () => {
    navigate('/book')
  }
  return (
		<div>
			<OuterWrapper>
					<Tabbar /> 
				<ContentWrapper>
					<MobileLogo src="teacup.png" />
					
					<MainMessage>
            예약 결제하기
					</MainMessage>
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

          <InputGrid>
          <Input placeholder="Name on card"></Input>
          <Input placeholder="Credit card number"></Input>
					<div className="div">
						<select className="select">
							<option className="placeholder" disabled selected>Expires</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>
						<Input placeholder="cvv"></Input>
					</div>
          </InputGrid>

          <Button onClick={() => ToBookingConfirmed()}>
              결제하기
          </Button>		
				</ContentWrapper>

				<Logo src="green-tea.png"></Logo>
				
			</OuterWrapper>

		</div>
	)

}

export default Book;