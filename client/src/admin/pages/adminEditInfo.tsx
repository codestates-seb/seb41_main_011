import styled from 'styled-components';
import Sidebar from '../components/UI/Sidebar';
import { useState } from 'react';

export const PageWrapper = styled.div`
  width: calc(100% - 240px);
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 36px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Title = styled.div`
  width: 100%;
  color: #006954;
  font-weight: 700;
  font-size: 2.25rem;
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
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  label {
    margin-bottom: 4px;
    font-weight: 500;
    color: #4b4b4b;
    width: 15%;
  }

  input {
    width: 40%;
    border-radius: 12px;
    border: 1px solid #ddd;
    padding: 8px 16px;
    margin-top: 4px;
    margin-right: 4px;
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

  .newPasswordValidated,
  .match {
    font-size: 14px;
    color: #008d4b;
  }
  .newPasswordError,
  .matchError {
    font-size: 14px;
    color: #b33a3a;
  }
`;

const Button = styled.button`
  width: 40%;
  height: 3em;
  margin: 16px auto 0 15%;
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

const AdminEditInfo = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [verifyNewPassword, setVerifyNewPassword] = useState<string>('');
  const regexPassword = new RegExp(
    /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
    'g',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regexPassword = new RegExp(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );
    console.log(newPassword, regexPassword.test(newPassword));
    const regexPassword2 = new RegExp(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );
    console.log(verifyNewPassword, regexPassword2.test(verifyNewPassword));
    console.log(newPassword === verifyNewPassword);
    // regexPassword.test(newPassword) ? alert('비밀번호 수정이 완료되었습니다.') : alert('새 비밀번호를 다시 확인해주세요.')
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContentWrapper>
        <Sidebar />
        <PageWrapper>
          <Title>관리자 정보 변경</Title>
          <InfoWrapper>
            <div>
              <label htmlFor='id'>아이디(이메일)</label>
              <div id='id'>ahnseo.yoo@gmail.com</div>
            </div>
            <div>
              <label htmlFor='pw'>비밀번호</label>
              <input type='password' id='pw' defaultValue='asdf!1234'></input>
            </div>
            <div>
              <label htmlFor='newpw'>새 비밀번호</label>
              <input
                type='password'
                id='newpw'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
              {newPassword === '' ? null : !regexPassword.test(newPassword) ? (
                <div className='newPasswordError'>
                  특수문자와 알파벳이 하나 이상 포함된 8~16자리의 숫자여야
                  합니다.
                </div>
              ) : (
                <div className='newPasswordValidated'>
                  올바른 비밀번호 형식입니다.
                </div>
              )}
            </div>
            <div>
              <label htmlFor='confirmpw'>새 비밀번호 확인</label>
              <input
                type='password'
                id='confirmpw'
                value={verifyNewPassword}
                onChange={(e) => setVerifyNewPassword(e.target.value)}
              ></input>
              {newPassword === verifyNewPassword ? (
                <div className='match'>비밀번호가 일치합니다.</div>
              ) : (
                <div className='matchError'>비밀번호가 일치하지 않습니다.</div>
              )}
            </div>
            <Button>비밀번호 수정</Button>
          </InfoWrapper>
        </PageWrapper>
      </ContentWrapper>
    </form>
  );
};

export default AdminEditInfo;
