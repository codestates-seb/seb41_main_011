import styled from 'styled-components';
import Tabbar from '../components/Tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { ChangeEvent, useEffect, useState } from 'react';
import api from '../RefreshToken';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router';

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
  const userRole = useAppSelector((state) => state.login.role);
  const navigate = useNavigate();
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
      const response = await api.get('/api/counselors/look-up');
      setUserInfo(response.data.data);
      setMemberId(response.data.data.counselorId);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userRole === '') {
      navigate('/login');
    } else if (userRole === 'COUNSELOR') {
      getUserInfo();
    } else {
      alert('????????? ??? ????????? ???????????? ????????????.');
      navigate('/');
    }
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
      await api.patch(`/api/counselors/edit/${memberId}`, reqBody);
      alert('???????????? ????????? ?????????????????????.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const updateInfoHandler = () => {
    if (!(password && newPassword && confirmNewPassword)) {
      alert(
        '?????? ????????????, ????????? ????????????, ???????????? ????????? ?????? ??????????????????.',
      );
    } else if (newPassword !== confirmNewPassword) {
      alert('??? ??????????????? ???????????? ????????? ???????????? ????????????.');
    } else if (!regexPassword.test(newPassword)) {
      alert(
        `???????????? ????????? ???????????? ????????????.\n??????,??????,???????????? ?????? 8?????? ?????? ??????????????????.`,
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
          <Title>????????????</Title>
          <Grid>
            <Label>?????? ??????</Label>
            <Text>?????????</Text>
            <Label>??????</Label>
            <Text>{userInfo.counselorName}</Text>
            <Label>?????????(?????????)</Label>
            <Text>{userInfo.email}</Text>
          </Grid>
          <Title>???????????? ??????</Title>
          <Grid>
            <Label>?????? ????????????</Label>
            <Input
              type='password'
              placeholder='?????? ??????????????? ??????????????????'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
            />
            <Label>??? ????????????</Label>
            <Input
              type='password'
              placeholder='??????,??????,???????????? ?????? 8?????? ??????'
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(event.target.value)
              }
            />
            <Label>???????????? ??????</Label>
            <Input
              type='password'
              placeholder='??? ??????????????? ??? ??? ??? ??????????????????'
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
          ????????????
        </Button>
        <Tabbar />
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default EditUserInfoTherapist;
