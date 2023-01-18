import { useNavigate } from "react-router";
import styled from "styled-components";
import Tabbar from "../components/tabbar";
import { RiKakaoTalkFill } from "react-icons/ri";

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
  margin-top: 50px;
  margin-bottom: -30px;
  @media screen and (min-width: 768px) {
    width: 110px;
    margin-bottom: -50px;
    margin-top: 30px;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
    margin-bottom: -50px;
    margin-top: 30px;
  }
`

const InnerWrapper = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  width: 80vw;
  color: #4B6A4D;
  font-size: 1.8rem;
  font-weight: 500;
  text-align: left;
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    width: 600px;
  }

`
const Grid = styled.div`
  width: 80vw;
  display: grid;
  grid-template-columns: 35% 70%;
  row-gap: 12px;
  background-color: #ECEEE2;
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    width: 600px;
  }
`

const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 500;
`
const Text = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
const Input = styled.input`
  height: 30px;
  border-radius: 10px;
  border: none;
  padding-left: 5%;
  padding-right: 5%;
  margin-right: 12px;
  @media screen and (min-width: 768px) {
    margin-right: 25px;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
  ::placeholder{
    font-size: 11px;
  }
`
const Button = styled.button`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
	border-radius: 10px;
	border: none;
	width: 600px;
	height: 50px;
	background-color: #D5E6CF;
  font-weight: 500;
	color: #535353;
	font-size: 1rem;
  margin-top: -50px;

	&:hover {
        background-color: #70846C;
        color: white;
        cursor: pointer;
	}
    @media screen and (max-width: 768px) {
        height: 3em;
        width: 80vw;
    }
    @media screen and (min-height: 1200px) {
      margin-top: -150px;
    }
`

const EditUserInfoTherapist = () => {
  return (
    <div>
      <ContentWrapper>
        <Logo src="teacup.png" />
        <InnerWrapper>
          <Title>
            회원정보
          </Title>
          <Grid>
            <Label>회원 유형</Label>
            <Text>상담사</Text>
            <Label>이름</Label>
            <Text>하헌진</Text>
            <Label>아이디(이메일)</Label>
            <Text>gkgjswls@gmail.com</Text>
          </Grid>
          <Title>
            비밀번호 변경
          </Title>
          <Grid>
            <Label>현재 비밀번호</Label>
            <Input placeholder="기존 비밀번호를 입력해주세요"></Input>
            <Label>새 비밀번호</Label>
            <Input placeholder="새 비밀번호를 입력해주세요"></Input>
            <Label>비밀번호 확인</Label>
            <Input placeholder="새 비밀번호를 재입력해주세요"></Input>
          </Grid>
        </InnerWrapper>
        <Button>수정하기</Button>
        <Tabbar />
      </ContentWrapper>
    </div>
  )

}

export default EditUserInfoTherapist;