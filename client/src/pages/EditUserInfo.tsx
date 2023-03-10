import styled from 'styled-components';
import Tabbar from '../components/Tabbar';
import { RiKakaoTalkFill } from 'react-icons/ri';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/UI/Button';
import { useEffect, useState, ChangeEvent } from 'react';
import api from '../RefreshToken';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginActions } from '../store/login';

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

  button {
    background: none;
    border: none;
    font-size: 1rem;
    color: #8e6610;
    line-height: 2;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
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

  &[type='date'] {
    background: #fff;
    height: 2.5rem;
    width: 160px;
  }
`;

type userInfoType = {
  memberId: number | null;
  memberName: string;
  memberType: string | null;
  nickName: string;
  birth: string;
};

type updateInfoType = {
  nickName?: string;
  password?: string;
  newPassword?: string;
  confirmNewPassword?: string;
  birth?: string;
};

const EditUserInfo = () => {
  const userRole = useAppSelector((state) => state.login.role);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = useState<userInfoType>({
    memberId: null,
    memberName: '',
    memberType: null,
    nickName: '',
    birth: '',
  });
  const [memberId, setMemberId] = useState(0);

  const getUserInfo = async () => {
    try {
      const response = await api.get('/api/members/look-up');
      setUserInfo(response.data.data);
      setMemberId(response.data.data.memberId);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userRole === '') {
      navigate('/login');
    } else if (userRole === 'USER') {
      getUserInfo();
    } else {
      alert('????????? ??? ????????? ??????????????? ????????????.');
      navigate('/');
    }
  }, []);

  const deleteUserInfo = async () => {
    try {
      await api.patch(`/api/members/delete/${memberId}`);
      alert('?????? ????????? ?????? ???????????????.');
      localStorage.setItem('accessToken', '');
      localStorage.setItem('refreshToken', '');
      localStorage.setItem('accessTokenExpireTime', '');
      axios.defaults.headers.common['Authorization'] = '';
      dispatch(loginActions.logout());
      navigate('/');
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  const resignHandler = () => {
    const confirmResign = window.confirm(
      `?????? ????????? ????????? ?????? ????????? ????????????, ????????? ??? ??? ????????????.\n?????? ???????????????????`,
    );
    if (confirmResign) {
      deleteUserInfo();
    }
    return;
  };

  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const regexPassword = new RegExp(
    /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
    'g',
  );

  const patchEditInfo = async () => {
    try {
      const reqBody: updateInfoType = {};
      if (nickname) {
        reqBody.nickName = nickname;
      }
      if (birth) {
        reqBody.birth = birth;
      }
      if (password) {
        reqBody.password = password;
        reqBody.newPassword = newPassword;
        reqBody.confirmNewPassword = confirmNewPassword;
      }

      await api.patch(`/api/members/edit/${memberId}`, reqBody);
      alert('???????????? ????????? ?????????????????????.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const updateInfoHandler = () => {
    if (
      !(
        (password && newPassword && confirmNewPassword) ||
        (!password && !newPassword && !confirmNewPassword)
      )
    ) {
      alert(
        '?????? ????????????, ????????? ????????????, ???????????? ????????? ?????? ??????????????????.',
      );
    } else if (newPassword !== confirmNewPassword) {
      alert('??? ??????????????? ???????????? ????????? ???????????? ????????????.');
    } else if (password && !regexPassword.test(newPassword)) {
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
          <Title>???????????? ??????</Title>
          <Grid>
            <Label>?????? ??????</Label>
            <Text>?????? ??????</Text>
            <Label>??????</Label>
            <Text>{userInfo.memberName}</Text>
            <Label>?????? ?????????</Label>
            {userInfo.memberType === 'KAKAO' ? (
              <RiKakaoTalkFill size={30} color={'#362419'} />
            ) : (
              '?????????'
            )}
            <Label>????????????</Label>
            <Input
              type='date'
              defaultValue={userInfo.birth}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setBirth(event.target.value)
              }
            />
            <Label>?????????</Label>
            <Input
              defaultValue={userInfo.nickName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNickname(event.target.value)
              }
            />
            <Label>?????? ??????</Label>
            <Text>
              <button type='button' onClick={resignHandler}>
                ???????????? ??????
              </button>
            </Text>
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

export default EditUserInfo;
