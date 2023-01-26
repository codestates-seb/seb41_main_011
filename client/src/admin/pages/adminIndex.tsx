import styled from 'styled-components';
import { useState } from 'react';

const ContentWrapper = styled.div`
  height: 100vh;
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`;

const Title = styled.div`
  width: 100%;
  color: #006954;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: center;
  line-height: 1;
`;
const InfoWrapper = styled.div`
  background-color: #eceee2;
  padding: 1.43rem 1.43rem 1.63rem;
  border-radius: 12px;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  color: #333;
  gap: 16px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-weight: 500;
    color: #4b4b4b;
    margin-bottom: 4px;
  }

  input {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 8px 16px;
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
  }
`;

const Button = styled.button`
  width: 100%;
  height: 3em;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  border: 0;
  transition: all 0.2s;
  background: #009779;
  color: #fff;
  cursor: pointer;
  :hover,
  :active {
    background: #0d8b72;
  }
`;

const AdminIndex = () => {
  const [password, setPassword] = useState<string>('');
  const [id, setId] = useState<string>('');

  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit}>
      <ContentWrapper>
        <Title>관리자 로그인</Title>
        <InfoWrapper>
          <div>
            <label htmlFor='id'>아이디(이메일)</label>
            <input
              id='id'
              type='text'
              placeholder='관리자 아이디 입력'
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='pw'>비밀번호</label>
            <input
              id='pw'
              type='password'
              placeholder='관리자 비밀번호 입력'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </InfoWrapper>
        <Button>로그인</Button>
      </ContentWrapper>
    </form>
  );
};

export default AdminIndex;
