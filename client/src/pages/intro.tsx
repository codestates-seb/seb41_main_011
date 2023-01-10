import { useNavigate } from "react-router";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
// import Tabbar from "../components/tabbar"; //탭바 테스트용. 해당 부분 삭제 예정

const GlobalStyle = createGlobalStyle`

  body {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
  }
`;

const OuterWrapper = styled.div`
    display: flex;
		flex-direction: row;
`

const ContentWrapper = styled.div`
    display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-right: 10%;
		* {
			margin-bottom: 10%;
		}
`

const MainMessage = styled.div`
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
`

const SubMessage = styled.div`    
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
	border-radius: 10px;
	border: none;
	width: 500px;
	height: 50px;
	background-color: #C4DCBF;
	font-size: 1rem;
	&:hover {
			background-color: #70846C;
			color: white;
			cursor: pointer;
	}
`
const Logo = styled.img`
    margin-bottom: 100px;
`

const Intro = () => {

	const navigate = useNavigate();
	const toAboutPage = () => {
		navigate('/about')
	}

	return (
		<div>
			<GlobalStyle/>
			{/* <Tabbar /> 탭바 테스트용. 해당 라인 삭제 예정 */}
			<OuterWrapper>
				<ContentWrapper>
					<MainMessage>
							안녕하세요! 반가워요
					</MainMessage>
					<SubMessage>
					시작하기 전 간단한 질문이 있어요.<br/>
					그룹 테라피에 대해 친숙하신가요?
					</SubMessage>
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