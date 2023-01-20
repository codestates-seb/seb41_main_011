import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';

const ContentWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 60px 20px 110px;
  color: #333;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }

  @media screen and (min-width: 1000px) {
    width: 1000px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1200px) {
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const Logo = styled.img`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    width: 128px;
    margin: 0 auto 1.4rem;
  }
`;

const InnerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 1.83rem;
  text-align: left;
  width: 100%;
  line-height: 1.3;
  margin-bottom: 0.6rem;

  @media screen and (min-width: 768px) {
    margin-bottom: 0.8rem;
  }
`;
const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 70%;
  grid-template-rows: repeat(3, 1fr);
  align-items: center;
  row-gap: 0.83rem;
  background-color: #eceee2;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  padding: 1rem 1.3rem;
  border-radius: 10px;
  margin-bottom: 1.4rem;

  @media screen and (min-width: 768px) {
    padding: 1.3rem 1.5rem;
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: 20% 60%;
    grid-template-rows: repeat(3, 40px);
    margin-bottom: 2.25rem;
  }
`;

const Label = styled.label`
  color: #72ab76;
  font-weight: 500;
`;
const Text = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin-top: 4px;
  resize: none;
  overflow: auto;
  ::placeholder {
    color: #828282;
    font-size: 0.85rem;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
`;

const EditUserInfo = () => {
  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <InnerWrapper>
          <Title>회원정보 수정</Title>
          <Grid>
            <Label>회원 유형</Label>
            <Text>일반 회원</Text>
            <Label>이름</Label>
            <Text>김초이</Text>
            <Label>소셜 로그인</Label>
            <RiKakaoTalkFill size={30} color={'#362419'} />
            <Label>닉네임</Label>
            <Input defaultValue={'마오옹'}></Input>
          </Grid>
          <Title>비밀번호 변경</Title>
          <Grid>
            <Label>현재 비밀번호</Label>
            <Input placeholder='기존 비밀번호를 입력해주세요'></Input>
            <Label>새 비밀번호</Label>
            <Input placeholder='변경할 비밀번호를 입력해주세요'></Input>
            <Label>비밀번호 확인</Label>
            <Input placeholder='변경할 비밀번호를 재입력해주세요'></Input>
          </Grid>
        </InnerWrapper>
        <Button width='100%' height='3em' fontsize='1rem'>
          수정하기
        </Button>
        <Tabbar />
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default EditUserInfo;
