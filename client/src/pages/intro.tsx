import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar"; //탭바 테스트용. 해당 부분 삭제 예정

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
	/* border: 1px solid green; */
    display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		* {
			margin-bottom: 10%;
		}
`

const MainMessage = styled.div`
	margin-top: 20px;
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
`

const SubMessage = styled.div` 
	@media screen and (min-width: 768px) {
		font-size: 14px;
  }

	@media screen and (min-width: 1200px) {
		font-size: 16px;
  }   
`

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	* {
			margin: 10px;
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
const Logo = styled.img`
	width: 200px;
	height: 200px;
    /* margin-bottom: 100px; */
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
    margin-left: 30px;
	width: 20em;
	@media screen and (min-width: 768px) {
		display: none;
    }
`

const Intro = () => {

	const navigate = useNavigate();
	const toAboutPage = () => {
		navigate('/about')
	}

	return (
		<div>
			<OuterWrapper>
					{/* <Tabbar />  */}


				{/* 탭바 테스트용. 위 라인 삭제 예정 */}
				<ContentWrapper>
					
					<MainMessage>
							안녕하세요! 반가워요
					</MainMessage>
					<SubMessage>
					시작하기 전 간단한 질문이 있어요.<br/>
					그룹 테라피에 대해 친숙하신가요?😊
					</SubMessage>
					<MobileLogo src="green-tea.png" />
					<ButtonWrapper>
							<Button onClick={() => toAboutPage()}>
									잘 몰라요. 조금 더 알려주실래요?
							</Button>
							<Button>
									이미 알고있어요
							</Button>
					</ButtonWrapper>
					
					
				</ContentWrapper>

				<Logo src="green-tea.png"></Logo>
					
			</OuterWrapper>
		</div>
	)
};

export default Intro;