import styled from 'styled-components';
import ButtonAccept from '../components/ButtonAccept';
import InputTemp from '../components/InputTemp';
import Tabbar from '../components/Tabbar';
import LoginButton from '../components/LoginButton';
import {
  SignupFormWrapper,
  SignupForm,
  SignupTitle,
  ContextDiv,
} from './Signup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAppDispatch } from '../store/hooks';
import { loginActions } from '../store/login';

const LoginButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
const RedirectionSignup = styled.p`
  text-align: center;
  font-size: 0.9rem;
  color: #535353;
  margin-top: 0.5rem;

  a {
    display: inline-block;
    margin-left: 8px;
    font-weight: 500;
    color: inherit;
  }
`;
const Logo = styled.img`
  width: 20vw;
  @media screen and (min-width: 768px) {
    width: 15vw;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
  }
`;

const LoginGeneral = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const handleLoginEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setLoginEmail(target.value);
  };
  const handleLoginPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setLoginPassword(target.value);
  };

  const postLogin = async () => {
    try {
      const reqbody: object = {
        email: loginEmail,
        password: loginPassword,
        memberType: 'DEFAULT',
      };

      const res = await axios.post(
        process.env.REACT_APP_DB_HOST + '/api/members/login',
        reqbody,
      );
      localStorage.setItem('accessToken', `${res.data.data.accessToken}`);
      localStorage.setItem('refreshToken', `${res.data.data.refreshToken}`);
      localStorage.setItem(
        'accessTokenExpireTime',
        res.data.data.accessTokenExpireTime,
      );
      axios.defaults.headers.common[
        'Authorization'
      ] = `${res.data.data.grantType} ${res.data.data.accessToken}`;
      dispatch(loginActions.login(res.data.data.role));
      window.alert(`${loginEmail}이메일로 로그인 하셨습니다.`);
      navigate('/');
    } catch (err: any) {
      alert(err.response.data.errorMessage);
      console.log(err);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regexPassword = new RegExp(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );

    const regexEmail = new RegExp(
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
      'g',
    );

    const adminAccount: string[] = [
      'mason1@gmail.com',
      'mason2@gmail.com',
      '1013aq@gmail.com',
      'ahnseo.yoo@gmail.com',
      'choco920@gmail.com',
      'roseforemily@gmail.com',
      'test@gmail.com',
    ];

    if (!regexEmail.test(loginEmail)) {
      console.log('올바른 이메일 형식이 아닙니다.');
      alert('아이디가 이메일 형식이 아닙니다.');
    } else if (adminAccount.includes(loginEmail)) {
      postLogin();
    } else if (!regexPassword.test(loginPassword)) {
      console.log('비밀번호 형식이 일치하지 않습니다.');
      alert('비밀번호가 형식이 일치하지 않습니다.');
      // window.alert('비밀번호가 같지 않습니다.')
    } else {
      postLogin();
    }
  };
  const KakaoOauth = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=9c088acc96e4e1f905304d266fa8732a&redirect_uri=http://project-teatime-dev.s3-website.ap-northeast-2.amazonaws.com/kakaoOauth&response_type=code`;
  };

  return (
    <div>
      <Header />
      <SignupFormWrapper>
        <Logo src='/teacup.png' />
        <SignupTitle>로그인</SignupTitle>
        <LoginButtonWrapper>
          {/* <LoginButton children='구글 로그인' />
            <LoginButton children='네이버 로그인' /> */}
          <LoginButton children='카카오 로그인' onClick={KakaoOauth} />
        </LoginButtonWrapper>

        <SignupForm onSubmit={handleLoginSubmit}>
          <ContextDiv>
            <label htmlFor='E-mail'>아이디</label>
            <InputTemp
              type='text'
              id='E-mail'
              value={loginEmail}
              onChange={handleLoginEmailChange}
              placeholder='아이디(이메일 형식)'
            />
            <label htmlFor='password'>비밀번호</label>
            <InputTemp
              category='password'
              value={loginPassword}
              onChange={handleLoginPasswordChange}
              placeholder='비밀번호'
            />
          </ContextDiv>

          <ButtonAccept children='로그인' />
        </SignupForm>
        <div>
          <RedirectionSignup>
            아이디가 없으세요? <Link to='/signup'>회원가입하기</Link>
          </RedirectionSignup>
          <RedirectionSignup>
            상담사이신가요? <Link to='/login-therapist'>로그인하기</Link>
          </RedirectionSignup>
        </div>
      </SignupFormWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default LoginGeneral;
