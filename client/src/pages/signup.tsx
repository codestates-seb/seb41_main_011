import React, { useState } from 'react';
import styled from 'styled-components';
import InputTemp from '../components/Input';
import ButtonAccept from '../components/ButtonAccept';
import axios from 'axios';
import { displayName } from 'react-quill';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const SignupFormWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 24px;

  @media screen and (min-width: 700px) {
    width: 700px;
    margin: 0 auto;
  }
  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    padding: 90px 0 20px;
    width: 600px;
    min-height: calc(100vh - 70px);
  }
`;
export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  width: 100%;

  label {
    display: flex;
    align-items: center;
    justify-content: space-between;

    text-align: left;
    margin-bottom: 4px;
    font-weight: 500;
    color: #5e430b;

    &:not(:first-child) {
      margin-top: 20px;
    }
  }

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
  }

  ul {
    padding-left: 1rem;
    li {
      list-style: circle;
      color: #535353;
      line-height: 1.7;
    }
  }
`;
export const ContextDiv = styled.div`
  background-color: #eceee2;
  padding: 1.43rem 1.43rem 1.63rem;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  font-size: 1rem;
  word-wrap: break-word;
  color: #333;

  h4 {
    font-size: 1.3rem;
    font-weight: 500;
    color: #333;
    margin-bottom: 0.8rem;
  }
`;
export const SignupTitle = styled.h2`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  width: 100%;
  text-align: center;
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

const Signup = () => {
  const [signupEmail, setSignupEmail] = useState<string>('');
  const [signupPassword, setSignupPassword] = useState<string>('');
  const [verifyPassword, setverifyPassword] = useState<string>('');
  const [signupName, setSignupName] = useState<string>('');
  const [signupDisplayName, setSignupDisplayName] = useState<string>('');
  const [birth, setBirth] = useState<any>();
  const [ischecked, setIschecked] = useState<boolean>(false);
  const [admission, setAdmission] = useState<boolean>(true);

  const handleSignupEmailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSignupEmail(target.value);
  };
  const handleSignupPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSignupPassword(target.value);
  };
  const handleVerifyPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setverifyPassword(target.value);
  };
  const handleSignupNameChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSignupName(target.value);
  };
  const handleSignupDisplayNameChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setSignupDisplayName(target.value);
  };
  const handleBirthChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setBirth(target.value);
  };
  const handleCheckboxChange = (e: React.ChangeEvent) => {
    setIschecked(!ischecked);
    console.log(ischecked);
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(signupEmail, signupPassword, verifyPassword, ischecked);

    if (ischecked === false) {
      // window.alert('개인정보이용에 동의해 주셔야 합니다.')
      return console.log('개인정보이용에 동의해 주셔야 합니다.');
    }
    const regexPassword = new RegExp(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );
    const regexEmail = new RegExp(
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
      'g',
    );
    //체크박스 체크 -> 체크박스 체크안되면
    if (!regexEmail.test(signupEmail)) {
      return console.log('올바른 이메일 형식이 아닙니다.');
    }
    if (!regexPassword.test(signupPassword)) {
      return console.log('비밀번호 형식이 일치하지 않습니다.');
      // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
    } else if (!(signupPassword === verifyPassword)) {
      return console.log('비밀번호가 같지 않습니다.');
      // window.alert('비밀번호가 같지 않습니다.')
    } else {
      setAdmission(!admission);
      return console.log('성공');
      // axios
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(
      signupEmail,
      signupPassword,
      verifyPassword,
      ischecked,
      signupName,
      signupDisplayName,
      birth,
    );
    const reqbody: object = {
      email: signupEmail,
      password: signupPassword,
      name: signupName,
      nick_name: displayName,
      birth: birth,
    };

    axios
      .post(
        'https://jsonplaceholder.typicode.com/posts',
        JSON.stringify(reqbody),
      )
      .then((res) => console.log)
      .catch((err) => console.log);
  };

  return admission ? (
    <div>
      <Header />
      <SignupFormWrapper>
        <Logo src='/teacup.png' />
        <SignupTitle>회원가입</SignupTitle>
        <SignupForm onSubmit={handleAdmissionSubmit}>
          <ContextDiv>
            <label htmlFor='E-mail'>아이디</label>
            <InputTemp
              type='text'
              id='E-mail'
              value={signupEmail}
              onChange={handleSignupEmailChange}
              placeholder='E-mail형식으로 입력해주세요'
            />
            <label htmlFor='password'>비밀번호</label>
            <InputTemp
              category='password'
              id='password'
              value={signupPassword}
              placeholder='영문,숫자 포함 8자리 이상으로 입력해주세요.'
              onChange={handleSignupPasswordChange}
            />
            <InputTemp
              category='password'
              value={verifyPassword}
              placeholder='비밀번호를 한 번 더 입력 해주세요.'
              onChange={handleVerifyPasswordChange}
            />
          </ContextDiv>

          <ContextDiv>
            <h4>개인정보 수집 및 이용동의</h4>
            <ul>
              <li>개인정보를 제공받는 자: 우리 서비스</li>
              <li>
                개인정보를 제공받는 자의 개인정보 이용 목적: 그룹상담 서비스
                제공
              </li>
              <li>제공하는 개인정보의 항목: 이름, 생년월일, 결제정보</li>
              <li>
                개인정보를 제공받는자의 개인정보 보유 및 이용 기간: 제공 후 1년,
                결제 정보는 관련 법령에 따름
              </li>
              <li>
                동의를 거부할 수 있으며 동의 거부 시 서비스가 제공되지 않습니다.
              </li>
            </ul>
            <label>
              위 고유식별정보 수집이용에 동의하십니까?
              <input type='checkbox' onChange={handleCheckboxChange} />
            </label>
          </ContextDiv>
          <ButtonAccept children='확인' />
        </SignupForm>
      </SignupFormWrapper>
      <Tabbar />
      <Footer />
    </div>
  ) : (
    <div>
      <Header />
      <SignupFormWrapper>
        <Logo src='/teacup.png' />
        <SignupTitle>회원정보 입력</SignupTitle>
        <SignupForm onSubmit={handleSubmit}>
          <ContextDiv>
            <label htmlFor='Name'>이름</label>
            <InputTemp
              type='text'
              id='Name'
              onChange={handleSignupNameChange}
              value={signupName}
              placeholder='실명을 입력해주세요.'
            />
            <label htmlFor='Displayname'>닉네임</label>
            <InputTemp
              type='text'
              id='DisplayName'
              placeholder='서비스에서 사용할 닉네임을 입력해주세요'
              value={signupDisplayName}
              onChange={handleSignupDisplayNameChange}
            />
            <label htmlFor='Birth'>생년월일</label>
            <InputTemp
              category='birth'
              value={birth}
              onChange={handleBirthChange}
            />
          </ContextDiv>
          <ButtonAccept children='확인' />
        </SignupForm>
      </SignupFormWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default Signup;
