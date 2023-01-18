import { useNavigate } from "react-router";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Tabbar from "../components/tabbar";

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

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

const LogoText = styled.div`
    color: #6E7773;
    font-size: 14px;
    font-weight: 700;
`

const MainMessage = styled.div`
	width: 500px;
    margin-bottom: -50px;
    z-index: 1;
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
    text-align: left;
    @media screen and (max-width: 768px) {
        width: 80vw;
        font-size: 2.25rem;
    }
`

const SubMessage = styled.div`
    font-size: 13px;
    background-color: #ECEEE2;
    width: 80vw;
    text-align: left;
    padding: 3%;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    @media screen and (min-width: 768px) {
        font-size: 14px;
        width: 500px;
    }
    @media screen and (min-width: 1200px) {
        font-size: 16px;
        width: 500px;
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
    @media screen and (max-width: 415px) {
        margin-top: -20px;
    }
`

const Button = styled.button`
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
	border-radius: 10px;
	border: none;
	width: 500px;
	height: 50px;
	background-color: #C4DCBF;
    font-weight: 500;
	color: #3d553e;
	font-size: 1rem;
	&:hover {
        background-color: #70846C;
        color: white;
        cursor: pointer;
	}
    @media screen and (max-width: 768px) {
        height: 3em;
        width: 80vw;
    }
`



const About = () => {

    const navigate = useNavigate();
	const toTestPage = () => {
		navigate('/test')
	}

    return (
        <div>
            <GlobalStyle />
            <ContentWrapper>
                <LogoText>
                    Logo Text
                </LogoText>
                <MainMessage>
                    그룹테라피란?
                </MainMessage>
                <SubMessage>
                    그룹 테라피는 비슷한 주제에 관심이 있는 그룹원들이 모여 이야기를 나누며 자신과 타인에 대한 이해를 통해 서로의 성장을 돕는 상담입니다.<br/>
                    그룹원들은 서로 피드백을 해주며 그룹 안에서 수용과 격려, 지지를 경험하며 성장할 수 있는 심리적 자양분을 얻을 수 있습니다.<br/>
                    <br/>
                    우리 서비스에서는 비대면 그룹 테라피를 어쩌구 저쩌구 원격 시스템으로 어쩌구 저쩌구해서 쉽게 그룹 상담을 경험할 수 있고 킹갓 어쩌구 좋은 상담사를 통해서 최고의 프로그램을 경험해 볼 수 있습니다. 저렴한 비용으로 어쩌구해서 우리 서비스를 잡솨봐.<br/>
                    <br/>
                    전체 프로그램 목록에서 원하는 상담을 찾을 수 있고 어떤 프로그램이 적합할 지 추천해주는 페이지에서 추천 받을 수 있으니까 잘 못 고르겠으면 이용해보세요.<br/>
                    <br/>
                    그럼 이만!
                </SubMessage>
                <ButtonWrapper>
                    <Button>
                        그렇군요! 전체 프로그램을 보여주세요.
                    </Button>
                    <Button onClick={()=>toTestPage()}>
                        저에게 맞는 프로그램을 추천받고 싶어요.
                    </Button>
                </ButtonWrapper>
                <Tabbar />
            </ContentWrapper>
        </div>
    )

};

export default About;