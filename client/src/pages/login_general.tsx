import styled from 'styled-components';
import ButtonAccept from '../components/ButtonAccept';
import InputTemp from '../components/Input';
import Tabbar from '../components/tabbar';
import LoginButton from '../components/LoginButton';
import {
  SignupFormWrapper,
  SignupForm,
  SignupTitle,
  ContextDiv,
} from './signup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { loginAction } from '../store';

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
  const dispatch = useDispatch();
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(loginEmail, loginPassword);

    const regexPassword = new RegExp( //eslint-disable-next-line
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );
    const regexEmail = new RegExp( //eslint-disable-next-line
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
      'g',
    );
    //체크박스 체크 -> 체크박스 체크안되면
    if (!regexEmail.test(loginEmail)) {
      return console.log('올바른 이메일 형식이 아닙니다.');
    }
    if (!regexPassword.test(loginPassword)) {
      return console.log('비밀번호 형식이 일치하지 않습니다.');
      // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
      // window.alert('비밀번호가 같지 않습니다.')
    } else {
      // axios

      const reqbody: object = {
        email: loginEmail,
        password: loginPassword,
        memberType: 'DEFAULT',
      };

      axios
        .post(process.env.REACT_APP_DB_HOST + '/api/members/login', reqbody)
        .then((res) => {
          localStorage.setItem('accessToken', `${res.data.data.accessToken}`);
          localStorage.setItem('refreshToken', `${res.data.data.refreshToken}`);
          localStorage.setItem(
            'accessTokenExpireTime',
            res.data.data.accessTokenExpireTime,
          );
          axios.defaults.headers.common[
            'Authorization'
          ] = `${res.data.data.grantType} ${res.data.data.accessToken}`;
          dispatch(loginAction.login(res.data.data.role));
          window.alert(`${loginEmail}이메일로 로그인 하셨습니다.`);
          navigate('/');
        })
        .catch((err) => {
          alert(err.response.data.errorMessage);
          console.log(err);
        });
    }
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
          <LoginButton children='카카오 로그인' />
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
