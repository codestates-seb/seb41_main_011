import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';

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

type updateInfoType = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const EditUserInfoTherapist = () => {
  const [userInfo, setUserInfo] = useState({
    counselorId: 0,
    role: 'COUNSELOR',
    email: '',
    counselorName: '',
    password: '',
  });
  const [memberId, setMemberId] = useState(0);

  const getUserInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST + '/api/counselors/look-up',
      );
      setUserInfo(response.data.data);
      setMemberId(response.data.data.counselorId);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const regexPassword = new RegExp(
    /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
    'g',
  );

  const patchEditInfo = async () => {
    try {
      const reqBody: updateInfoType = {
        password,
        newPassword,
        confirmNewPassword,
      };
      await axios.patch(
        process.env.REACT_APP_DB_HOST + `/api/counselors/edit/${memberId}`,
        reqBody,
      );
      alert('회원정보 수정이 완료되었습니다.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const updateInfoHandler = () => {
    if (!(password && newPassword && confirmNewPassword)) {
      alert(
        '현재 비밀번호, 변경할 비밀번호, 비밀번호 확인을 모두 입력해주세요.',
      );
    } else if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    } else if (!regexPassword.test(newPassword)) {
      alert(
        `비밀번호 형식이 올바르지 않습니다.\n영문,숫자,특수문자 포함 8자리 이상 입력해주세요.`,
      );
    } else {
      patchEditInfo();
    }
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <Logo src='/teacup.png' />
        <InnerWrapper>
          <Title>회원정보</Title>
          <Grid>
            <Label>회원 유형</Label>
            <Text>상담사</Text>
            <Label>이름</Label>
            <Text>{userInfo.counselorName}</Text>
            <Label>아이디(이메일)</Label>
            <Text>{userInfo.email}</Text>
          </Grid>
          <Title>비밀번호 변경</Title>
          <Grid>
            <Label>현재 비밀번호</Label>
            <Input
              type='password'
              placeholder='기존 비밀번호를 입력해주세요'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <Label>새 비밀번호</Label>
            <Input
              type='password'
              placeholder='영문,숫자,특수문자 포함 8자리 이상'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(event.target.value)
              }
            />
            <Label>비밀번호 확인</Label>
            <Input
              type='password'
              placeholder='새 비밀번호를 한 번 더 입력해주세요'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setConfirmNewPassword(event.target.value)
              }
            />
          </Grid>
        </InnerWrapper>
        <Button
          width='100%'
          height='3em'
          fontsize='1rem'
          onClick={updateInfoHandler}
        >
          수정하기
        </Button>
        <Tabbar />
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default EditUserInfoTherapist;
