import React, { useState} from 'react';
import styled from 'styled-components';
import InputTemp from '../components/Input'
import ButtonAccept from '../components/ButtonAccept';
import axios from 'axios';

const SignupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 800px;
  border: 1px solid black;
  background-color: #F7F9ED;
`
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 360px;
  margin: 10px;
  padding-bottom: 1rem;

  label{
    display: inline-block;
    width: 280px;
    text-align: left;
  }
`
const ContextDiv = styled.div`
  display: inline-block;
  background-color: ECEEE2;
  width: 360px;
  height: 340px;
  font-size: 1rem;
  word-wrap: break-word;
  margin: 5% 0;
  padding-left: 10%;
  p {
    font-size: 1.25rem;
  }
`
const SignupTitle = styled.p`
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #4B6A4D; 
`
const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 63px;
    height: 54px;
  }
`
const Box = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* width: 360px; // 모바일 화면 크기 */
    width: 100vw;
    height: 70px;
    background-color: white;

    @media screen and (min-width: 768px) {
        display: none;
    }

    * {
        @media screen and (min-width: 768px) {
            display: none;
        }
    }
`
const Signup = () =>{
  const [context,setContext] = useState<string>('');
  const [password,setPassword] = useState<string>('');
  const [rePassword,setRePassword] = useState<string>('');
  const [ischecked,setIschecked] = useState<boolean>(false);


  const handleContextChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setContext(target.value);
  }
  const handlePasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setPassword(target.value);
  }
  const handleRePasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setRePassword(target.value);
  }
  const handleCheckboxChange = (e: React.ChangeEvent) =>{
    
    setIschecked(!ischecked);
    console.log(ischecked)
  }
  
  const handleSubmit = (e:React.FormEvent) =>{
    e.preventDefault();
    console.log(context,password,rePassword,ischecked)

    if(ischecked === false){
      // window.alert('개인정보이용에 동의해 주셔야 합니다.')
      return console.log('개인정보이용에 동의해 주셔야 합니다.')
    }
    const regex = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,"i");
    //체크박스 체크 -> 체크박스 체크안되면 
    if(!regex.test(password)){
      return console.log('비밀번호 형식이 일치하지 않습니다.');
      // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
    }else if(!(password === rePassword)){
      return console.log('비밀번호가 같지 않습니다.')
      // window.alert('비밀번호가 같지 않습니다.')
    }else{
      return console.log('성공')
      // axios
    }

    }
  
  
  
  return(
    <SignupFormWrapper>
      <ImgWrapper>
        <img src='Logo.png'></img>
      </ImgWrapper>
      <SignupTitle>
        회원가입
      </SignupTitle>
      <SignupForm onSubmit={handleSubmit}>
        <label htmlFor='E-mail'>아이디</label>
        <InputTemp type='text' id='E-mail' onChange={handleContextChange} placeholder='E-mail형식으로 입력해주세요'/>
        <label htmlFor='password'>비밀번호</label>
        <InputTemp category='password' id='password' placeholder='영문,숫자 포함 8자리 이상으로 입력해주세요.' onChange={handlePasswordChange}/>
        <InputTemp category='password' placeholder='비밀번호를 한 번 더 입력 해주세요.' onChange={handleRePasswordChange}/>
    
      <ContextDiv>
          <p>
          개인정보 수집 및 이용동의
          </p>
          개인정보를 제공받는 자: 우리 서비스<br/>
          개인정보를 제공받는 자의 개인정보 이용 목적<br/>
          그룹상담 서비스 제공<br/>
          제공하는 개인정보의 항목 이름 생년월일 결제정보<br/>
          개인정보를 제공받는자의 개인정보 보유 및 이용<br/>
          기간: 제공 후 1년, 결제 정보는 관련 법령에 따름<br/>
          동의를 거부할 수 있으며 동의 거부 시 서비스가<br/>
          제공되지 않습니다.<br/>
          <br/>
          위 고유식별정보 수집이용에 동의하십니까?<input type='checkbox' onChange={handleCheckboxChange}/>
      </ContextDiv>
      <ButtonAccept children='확인'/>
      </SignupForm>
    </SignupFormWrapper>
  
  )


}

export default Signup;