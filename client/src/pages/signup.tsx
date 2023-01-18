import React, { useState} from 'react';
import styled from 'styled-components';
import InputTemp from '../components/Input'
import ButtonAccept from '../components/ButtonAccept';
import axios from 'axios';
import { displayName } from 'react-quill';
import { ContentWrapper } from './test';
import Tabbar from '../components/tabbar';

export const SignupContentWrapper = styled(ContentWrapper)`
  
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
    }

`
export const SignupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5%;
  align-items: center;
  width: 400px;
  /*  : 1px black solid; */
  background-color: #F7F9ED;
  @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        border: none;
    }
`
export const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  margin: 10px;
  padding-bottom: 1rem;

  label{
    display: inline-block;
    width: 80vw;
    text-align: left;
    margin-bottom: 10px;
    @media screen and (min-width: 768px) {
      width: 600px;
    }
  }
`
const ContextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #ECEEE2;
  border-radius: 10px;
  width: 80vw;
  font-size: 1rem;
  word-wrap: break-word;
  margin: 5% 0;
  padding: 10%;
  
  @media screen and (min-width: 768px) {
      width: 600px;
    }
  p {
    font-size: 1.5rem;
  }
`
export const SignupTitle = styled.p`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #4B6A4D; 
  width: 80vw;
`
export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img{
  margin-top: 20px;
  width: 70px;
  @media screen and (min-width: 768px) {
    width: 110px;
  }
  @media screen and (min-width: 1200px) {
    width: 140px;
  }
  }
  
`

const Signup = () =>{
  const [signupEmail,setSignupEmail] = useState<string>('');
  const [signupPassword,setSignupPassword] = useState<string>('');
  const [verifyPassword,setverifyPassword] = useState<string>('');
  const [signupName,setSignupName] = useState<string>('');
  const [signupDisplayName,setSignupDisplayName] = useState<string>('');
  const [birth,setBirth] = useState<any>();
  const [ischecked,setIschecked] = useState<boolean>(false);
  const [admission,setAdmission] = useState<boolean>(true);

  const handleSignupEmailChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupEmail(target.value);
  }
  const handleSignupPasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupPassword(target.value);
  }
  const handleVerifyPasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setverifyPassword(target.value);
  }
  const handleSignupNameChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupName(target.value);
  }
  const handleSignupDisplayNameChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupDisplayName(target.value);
  }
  const handleBirthChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setBirth(target.value);
  }
  const handleCheckboxChange = (e: React.ChangeEvent) =>{
    
    setIschecked(!ischecked);
    console.log(ischecked)
  }
  
  const handleAdmissionSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    console.log(signupEmail,signupPassword,verifyPassword,ischecked)

    if(ischecked === false){
      // window.alert('개인정보이용에 동의해 주셔야 합니다.')
      return console.log('개인정보이용에 동의해 주셔야 합니다.')
    }
    const regexPassword = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,'g');
    const regexEmail = new RegExp(/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,'g')
    //체크박스 체크 -> 체크박스 체크안되면 
    if(!regexEmail.test(signupEmail)){
      return console.log('올바른 이메일 형식이 아닙니다.')
    }
    if(!regexPassword.test(signupPassword)){
      return console.log('비밀번호 형식이 일치하지 않습니다.');
      // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
    }else if(!(signupPassword === verifyPassword)){
      return console.log('비밀번호가 같지 않습니다.')
      // window.alert('비밀번호가 같지 않습니다.')
    }else{
      setAdmission(!admission)
      return console.log('성공')
      // axios
    }

    }
    const handleSubmit = (e:React.FormEvent) =>{
      e.preventDefault();
      console.log(signupEmail,signupPassword,verifyPassword,ischecked,signupName,signupDisplayName,birth)
      const reqbody:object = {
        email: signupEmail,
        password: signupPassword,
        name: signupName,
        nick_name: displayName,
        birth: birth,
      }

      axios.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(reqbody))
        .then((res)=>console.log)
        .catch((err)=>console.log)

    }
  
  
  return(
    admission?
    <SignupContentWrapper>
      <SignupFormWrapper>
        <ImgWrapper>
          <img src='Logo.png'/>
        </ImgWrapper>
        <SignupTitle>
          회원가입
        </SignupTitle>
        <SignupForm onSubmit={handleAdmissionSubmit}>
          <label htmlFor='E-mail'>아이디</label>
          <InputTemp type='text' id='E-mail' value={signupEmail} onChange={handleSignupEmailChange} placeholder='E-mail형식으로 입력해주세요'/>
          <label htmlFor='password'>비밀번호</label>
          <InputTemp category='password' id='password' value={signupPassword} placeholder='영문,숫자 포함 8자리 이상으로 입력해주세요.' onChange={handleSignupPasswordChange}/>
          <InputTemp category='password' value={verifyPassword}  placeholder='비밀번호를 한 번 더 입력 해주세요.' onChange={handleVerifyPasswordChange}/>
      
        <ContextDiv>
            <p>
            개인정보 수집 및 이용동의
            </p>
            개인정보를 제공받는 자: 우리 서비스
            개인정보를 제공받는 자의 개인정보 이용 목적
            그룹상담 서비스 제공
            제공하는 개인정보의 항목 이름 생년월일 결제정보
            개인정보를 제공받는자의 개인정보 보유 및 이용
            기간: 제공 후 1년, 결제 정보는 관련 법령에 따름
            동의를 거부할 수 있으며 동의 거부 시 서비스가
            제공되지 않습니다.
            
            위 고유식별정보 수집이용에 동의하십니까?<input type='checkbox' onChange={handleCheckboxChange}/>
        </ContextDiv>
        <ButtonAccept children='확인'/>
        </SignupForm>
      </SignupFormWrapper>
      <Tabbar/>
    </SignupContentWrapper> :
    <SignupContentWrapper>
    <SignupFormWrapper>
      <ImgWrapper>
        <img src='Logo.png'></img>
      </ImgWrapper>
      <SignupTitle>
        회원정보 입력
      </SignupTitle>
      <SignupForm onSubmit={handleSubmit}>
        <label htmlFor='Name'>이름</label>
        <InputTemp type='text' id='Name' onChange={handleSignupNameChange} value={signupName} placeholder='실명을 입력해주세요.'/>
        <label htmlFor='Displayname'>닉네임</label>
        <InputTemp type='text' id='DisplayName' placeholder='서비스에서 사용할 닉네임을 입력해주세요'value={signupDisplayName} onChange={handleSignupDisplayNameChange}/>
        <label htmlFor='Birth'>생년월일</label>
        <InputTemp category='birth'  value={birth} onChange={handleBirthChange}/>
      <ButtonAccept children='확인'/>
      </SignupForm>
    </SignupFormWrapper>
    <Tabbar/>
    </SignupContentWrapper>
  
  )
    

}

export default Signup;