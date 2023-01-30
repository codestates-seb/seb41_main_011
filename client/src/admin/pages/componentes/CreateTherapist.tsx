import styled from 'styled-components';
import React, { useState, MouseEvent, useEffect } from 'react';
import InputAdmin from '../../components/UI/InputAdmin';
import TextArea from '../../components/UI/Textarea';
import { ScreenWrapper } from './EditProgram';
import { FaUserCircle, FaTimes } from 'react-icons/fa';
import { modalCloseProps } from '../../types';
import api from '../../../RefreshToken';

const ContentWrapper = styled.div`
  background: #fff;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 70vw;
  max-width: 1200px;
  max-height: 75vh;
  overflow-y: auto;
  @media screen and (min-width: 1000px) {
    min-width: 1000px;
  }
`;
const CloseButton = styled.button`
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  background: none;
  font-size: 2rem;
  line-height: 1;
  transition: all 0.2s;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
`;
const Title = styled.div`
  font-size: 2rem;
  line-height: 1;
  font-weight: 700;
  color: #333;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;

  .mb-16 {
    margin-bottom: 16px;
  }

  label {
    color: #4b4b4b;
    font-weight: 500;
  }
  .inputlabel {
    width: 20%;
    display: inline-block;
    text-align: left;
    margin-right: 16px;
  }

  input {
    width: 60%;
  }
`;

const SubmitButton = styled.button`
  width: 300px;
  height: 3em;
  margin: 0 auto;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 8px;
  border: 0;
  transition: all 0.2s;
  background: #155dcf;
  color: #fff;
  cursor: pointer;
  :hover,
  :active {
    background: #003fa4;
  }
`;
const CreateTherapistForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const CreateTherapist = (props: modalCloseProps) => {
  const [profile, setprofile] = useState<string>('');
  const [counselorName, setcounselorName] = useState<string>('');
  let [birth, setBirth] = useState<any>();
  const [graduated, setgraduated] = useState<string>('');
  const [email, setemail] = useState<string>('');
  const [password, setpassword] = useState<string>('');
  const [confirmPassword, setconfirmPassword] = useState<string>('');
  const [career, setCareer] = useState<string>('');
  const [introduce, setintroduce] = useState<string>('');
  const [expertiseField, setexpertiseField] = useState<string>('');
  const [modal, setModal] = useState<boolean>(true);

  const handleCloseButton = (event: MouseEvent<HTMLButtonElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleprofileChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setprofile(target.value);
  };
  const handleemailChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setemail(target.value);
  };
  const handlepasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setpassword(target.value);
  };
  const handleconfirmPasswordChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setconfirmPassword(target.value);
  };
  const handlecounselorNameChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setcounselorName(target.value);
  };
  const handleBirthChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setBirth(target.value);
  };
  const handleCareerChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCareer(target.value);
  };
  const handleintroduceChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setintroduce(target.value);
  };
  const handlegraduatedChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setgraduated(target.value);
  };
  const handleexpertiseFieldChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setexpertiseField(target.value);
  };
  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const regexPassword = new RegExp(
      /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
      'g',
    );
    const regexEmail = new RegExp(
      /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
      'g',
    );
    //체크박스 체크 -> 체크박스 체크안되면
    if (!regexEmail.test(email)) {
      return console.log('올바른 이메일 형식이 아닙니다.');
    }
    if (!regexPassword.test(password)) {
      return console.log('비밀번호 형식이 일치하지 않습니다.');
      // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
    } else if (!(password === confirmPassword)) {
      return console.log('비밀번호가 같지 않습니다.');
      // window.alert('비밀번호가 같지 않습니다.')
    } else {
      birth = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6)}`;

      const reqbody: object = {
        profile,
        counselorName,
        birth,
        graduated,
        email,
        password,
        confirmPassword,
        career,
        introduce,
        expertiseField,
      };

      api
        .post('/api/counselors/new', reqbody)
        .then((res) => {
          window.alert('상담사 등록이 완료되었습니다.');
          window.location.reload();
        })
        .catch((err) => console.log());
    }
  };

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: hidden;
      touch-action: none;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <ScreenWrapper modal={modal} onClick={handleBackdropClick}>
      <ContentWrapper
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseButton type='button' onClick={handleCloseButton}>
          <FaTimes />
        </CloseButton>
        <Title>
          <FaUserCircle size={48} color='lightgray' className='profileImage' />
          상담사 등록
        </Title>
        <CreateTherapistForm onSubmit={handleAdmissionSubmit}>
          <InputWrapper>
            <InputSection>
              <div className='mb-16'>
                <label htmlFor='profile' className='inputlabel'>
                  대표 이미지
                </label>
                <InputAdmin
                  category='profile'
                  id='profile'
                  placeholder='이미지 profile 경로 입력'
                  value={profile}
                  onChange={handleprofileChange}
                  name='profile'
                />
              </div>
              <div>
                <label htmlFor='name' className='inputlabel'>
                  이름
                </label>
                <InputAdmin
                  category='name'
                  id='name'
                  placeholder='상담사 등록명'
                  value={counselorName}
                  onChange={handlecounselorNameChange}
                />
              </div>
              <div>
                <label htmlFor='birth' className='inputlabel'>
                  생년월일
                </label>
                <InputAdmin
                  category='birth'
                  id='birth'
                  placeholder='생년월일 8자리'
                  value={birth}
                  onChange={handleBirthChange}
                />
              </div>
              <div>
                <label htmlFor='학력' className='inputlabel'>
                  학력
                </label>
                <InputAdmin
                  type='text'
                  id='학력'
                  placeholder='최종학력 학위 기재'
                  value={graduated}
                  onChange={handlegraduatedChange}
                />
              </div>
              <div className='mb-16'>
                <label htmlFor='expertiseField' className='inputlabel'>
                  전문분야
                </label>
                <InputAdmin
                  type='text'
                  id='expertiseField'
                  placeholder='전문분야 기재'
                  value={expertiseField}
                  onChange={handleexpertiseFieldChange}
                />
              </div>
              <div>
                <label htmlFor='E-mail' className='inputlabel'>
                  이메일
                </label>
                <InputAdmin
                  type='text'
                  id='E-mail'
                  placeholder='로그인 아이디로 사용'
                  value={email}
                  onChange={handleemailChange}
                />
              </div>
              <div>
                <label htmlFor='password' className='inputlabel'>
                  비밀번호
                </label>
                <InputAdmin
                  category='password'
                  id='password'
                  placeholder='로그인 비밀번호'
                  value={password}
                  onChange={handlepasswordChange}
                />
              </div>
              <div>
                <label htmlFor='passwordCheck' className='inputlabel'>
                  비밀번호 확인
                </label>
                <InputAdmin
                  category='passwordCheck'
                  id='passwordCheck'
                  placeholder='비밀번호 재입력'
                  value={confirmPassword}
                  onChange={handleconfirmPasswordChange}
                />
              </div>
            </InputSection>
            <InputSection>
              <TextArea
                rows={6}
                id='carrer'
                child='경력'
                placeholder='경력을 입력하세요'
                value={career}
                className='career'
                onChange={handleCareerChange}
              />
              <TextArea
                rows={7}
                id='introduce'
                child='소개'
                placeholder='소개글을 입력하세요'
                value={introduce}
                className='introduce'
                onChange={handleintroduceChange}
              />
            </InputSection>
          </InputWrapper>
          <SubmitButton>등록</SubmitButton>
        </CreateTherapistForm>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default CreateTherapist;
