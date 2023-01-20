import { useNavigate } from "react-router";
import styled from "styled-components";
import Sidebar from "../components/UI/Sidebar";
import { useState } from "react";


export const PageWrapper = styled.div`
  width: 90vw;
  height: 100vh;
  right: 0%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3vh;

`

const ContentWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  @media screen and (max-width: 768px) {
      padding-top: 0vh;
      padding-bottom: 0vh;
      height: 100vh;
      justify-content: space-between;
  }
`

const Title = styled.div`
    width: 70vw;
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
    text-align: left;
    left: 0;
    top: 0;
`
const InfoWrapper = styled.div`
  background-color: #7575752b;
  /* border: 1px solid red; */
  border-radius: 15px;
  width: 70vw;
  font-size: 16px;

  display: grid;
  grid-template-columns: 10% 60%;
  column-gap: 20px;
  row-gap: 10px;
  padding: 20px;

  .label {
    text-align: left;
    font-weight: 500;
    color: #4B6A4D;
  }

  input {
    width: 15vw;
    border-radius: 5px;
    border: none;
    padding-left: 5px;
    padding-right: 5px;
  }

  .newPasswordValidated, .match {
    font-size: 14px;
    font-weight: 500;
    color: #008d4b
  } 
  .newPasswordError, .matchError {
    font-size: 14px;
    color: #b33a3a
  } 
`

const Button = styled.button`
  background-color:#4B6A4D;
  width: 300px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  font-size: 20px;
  &:hover {
    background-color:#4b6a62;
    cursor: pointer;
  }
`


const AdminEditInfo = () => {
  const [newPassword,setNewPassword] = useState<string>('');
  const [verifyNewPassword,setVerifyNewPassword] = useState<string>('');
  const regexPassword = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,'g');

  const handleSubmit = () => {
    console.log(newPassword, regexPassword.test(newPassword), regexPassword.test('asdf!1234'))
    newPassword === verifyNewPassword && regexPassword.test(newPassword) ? alert('비밀번호 수정이 완료되었습니다.') : alert('새 비밀번호를 다시 확인해주세요.')
  }


  return (
    <form onSubmit={handleSubmit}>
      <ContentWrapper>
        <Sidebar />
        <PageWrapper>
          <Title>관리자 마이페이지</Title>
          <InfoWrapper>
            <div className="label">아이디(이메일)</div>
            <div>ahnseo.yoo@gmail.com</div>
            <div className="label" >비밀번호</div>
            <input type="password" defaultValue="asdf!1234"></input>
            <div className="label" >새 비밀번호</div>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}></input>
            {newPassword === '' ? null 
            : !regexPassword.test(newPassword) ? <><div></div><div className="newPasswordError">특수문자와 알파벳이 하나 이상 포함된 8~16자리의 숫자여야 합니다.</div></> 
            : <><div></div><div className="newPasswordValidated">올바른 비밀번호 형식입니다.</div></>}
            <div className="label" >새 비밀번호 확인</div>
            <input type="password" value={verifyNewPassword} onChange={(e) => setVerifyNewPassword(e.target.value)}></input>
            {newPassword === verifyNewPassword ? <><div></div><div className="match">비밀번호가 일치합니다.</div></> : <><div></div><div className="matchError">비밀번호가 일치하지 않습니다.</div></>}
          </InfoWrapper>
          <Button>비밀번호 수정</Button>
        </PageWrapper>
      </ContentWrapper>
    </form>
  )
}

export default AdminEditInfo;