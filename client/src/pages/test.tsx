import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar";


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

const TagContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    gap: 12px;
    background-color: #ECEEE2;
    width: 50vw;
    height: 20vh;
    padding: 3%;
    border-radius: 10px;


    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;


    @media screen and (min-width: 768px) {
        font-size: 14px;
        width: 230px;
        height: 20vh;
        padding: 1%;
    }
    @media screen and (min-width: 1200px) {
        font-size: 16px;
        width: 250px;
        height: 20vh;
        padding: 1%;
    }
`

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #B3D2B0;
  border-radius: 5px;
  font-size: 11px;
  color: #ffffff;
  font-weight: 500;
  text-align: center;

  &:hover {
    background-color: #71AB75;
    cursor: pointer;
  }

  &:focus {     
    background-color: #71AB75;    
  } 

  @media screen and (min-width: 768px) {
        font-size: 13px;
  }

`



const MainMessage = styled.div`
  margin-top: 50px;
	width: 500px;
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
const SubMessage = styled.div`
  width: 500px;
  text-align: left; 
  margin-top: 50px;
  color: #333333;
	@media screen and (max-width: 768px) {
    width: 80vw;
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
  box-shadow: #af9a7052 0px 3px 8px;
	border-radius: 10px;
	border: none;
	width: 500px;
	height: 50px;
	background-color: #FBF4D3;
    font-weight: 500;
	color: #535353;
	font-size: 1rem;
	&:hover {
        background-color: #F4E7A4;
        cursor: pointer;
	}
    @media screen and (max-width: 768px) {
        height: 3em;
        width: 80vw;
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

const Test = () => {
  return (
    <div>
      <ContentWrapper>
        <Logo src="teacup.png" />
        <MainMessage>
          오늘, 마오옹 님의 기분은<br/> 
          어떠신가요?
        </MainMessage>
        <SubMessage>
        마오옹 님에게 적합한 테라피 프로그램을 추천해 드릴게요😊 <br/> 여러 개를 선택해 주셔도 괜찮아요.
        </SubMessage>
        <TagContainer>
          <Tag>우울해요</Tag>
          <Tag>불안해요</Tag>
          <Tag>감정기복</Tag>
          <Tag>불면증</Tag>
          <Tag>샘플</Tag>
          <Tag>샘플</Tag>
          <Tag>샘플</Tag>
          <Tag>샘플</Tag>
        </TagContainer>
        <ButtonWrapper>
          <Button>
          적합한 프로그램 찾기            
          </Button>
          <Button>
          건너뛸래요           
          </Button>
        </ButtonWrapper>
        <Tabbar />
      </ContentWrapper>
      
    </div>
  )
}

export default Test;