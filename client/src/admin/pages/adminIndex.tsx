import styled from "styled-components";
import { useState } from "react";



const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    text-align: center;
    left: 0;
    top: 0;
`
const InfoWrapper = styled.div`
  background-color: #7575752b;
  border-radius: 15px;
  width: 50vw;
  height: 50vh;
  font-size: 16px;

  /* display: grid; */
  /* grid-template-columns: 10% 60%; */
  /* column-gap: 20px; */
  /* row-gap: 10px; */
  /* padding: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  .label {
    text-align: left;
    font-weight: 500;
    color: #4B6A4D;
  }

  input {
    width: 15vw;
    height: 2rem;
    border-radius: 5px;
    border: none;
    padding-left: 5px;
    padding-right: 5px;
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


const AdminIndex = () => {
  const [password,setPassword] = useState<string>('');
  const [id,setId] = useState<string>('');

  const handleSubmit = () => {
}


  return (
    <form onSubmit={handleSubmit}>
    <ContentWrapper>
    <Title>관리자 로그인</Title>
    <InfoWrapper>
        <div>
            <div className="label">아이디(이메일)</div>
            <input type='text' placeholder='관리자 아이디 입력' value={id} onChange={(e)=>setId(e.target.value)}></input>            
        </div>
        <div>
            <div className="label" >비밀번호</div>
            <input type="password" placeholder='관리자 비밀번호 입력' value={password} onChange={(e) => setPassword(e.target.value)}></input>
        </div>
    </InfoWrapper>
    <Button>로그인</Button>
    </ContentWrapper>
    </form>
)
}

export default AdminIndex;