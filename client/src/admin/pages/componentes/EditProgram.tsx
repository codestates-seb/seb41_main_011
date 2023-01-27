import React, { useState, MouseEvent, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InputAdmin from '../../components/UI/Input';
import TextArea from '../../components/UI/Textarea';
import SelectBox from '../../components/UI/SelectBox';
import { FaRegCalendarCheck, FaTimes } from 'react-icons/fa';
import { modalCloseProps, createProgramProps } from '../../types';

interface CreateProgram {
  id: string;
  startingtime: string;
  endtime: string;
  regularnumber: string;
  title: string;
  description: string;
  tag?: string;
  url: string;
}

export const ScreenWrapper = styled.div<{ modal: boolean }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background-color: #00000042;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  display: ${(props) => (!props.modal ? 'none' : null)};
  &.closed {
    display: none;
  }
`;

const ContentWrapper = styled.div`
  background: #fff;
  position: relative;
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
  gap: 16px;

  strong,
  label {
    color: #4b4b4b;
    font-weight: 500;
    margin-right: 16px;
  }
  strong {
    font-size: 1rem;
  }
  .inputlabel {
    display: inline-block;
    width: 20%;
  }

  input[type='text'],
  input[type='number'] {
    width: 60%;
  }
  input[type='datetime-local'] {
    width: 45%;
  }

  .mb-8 {
    margin-bottom: 8px;
  }
  .pl-16 {
    padding-left: 16px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 16px;
  justify-content: center;

  button {
    width: 180px;
    height: 3em;
    font-weight: 500;
    font-size: 1rem;
    border-radius: 8px;
    border: 0;
    transition: all 0.2s;
    cursor: pointer;
    color: #fff;
  }
`;

const SubmitButton = styled.button`
  background: #155dcf;
  :hover,
  :active {
    background: #003fa4;
  }
`;
const DeleteButton = styled.button`
  background: #af1905;
  :hover,
  :active {
    background: #901707;
  }
`;

const CreateProgramForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 36px;
`;

const EditPrograms = (props: modalCloseProps) => {
  const [modal, setModal] = useState<boolean>(true);

  const handleCloseButton = (event: MouseEvent<HTMLButtonElement>) => {
    setModal(!modal);
    props.close();
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    setModal(!modal);
    props.close();
  };

  const programId = props.id;

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [userMax, setUserMax] = useState<any>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [symptomTypes, setSymptomTypes] = useState<string[]>([]);
  const [counselorId, setCounselorId] = useState<any>('');
  const [cost, setCost] = useState<any>('');

  const [programInfo, setProgramInfo] = useState<createProgramProps>({
    title: '',
    content: '',
    image: '',
    userMax: 0,
    dateStart: '',
    dateEnd: '',
    symptomTypes: [],
    cost: 0,
    counselorId: 0,
  });
  const getProgramInfo = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_DB_HOST + `/api/programs/lookup/${programId}`,
      );
      setProgramInfo(response.data.data);
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
      setImage(response.data.data.image);
      setUserMax(response.data.data.userMax);
      setDateStart(response.data.data.dateStart);
      setDateEnd(response.data.data.dateEnd);
      setSymptomTypes(response.data.data.symptomTypes);
      setCounselorId(response.data.data.counselorId);
      setCost(response.data.data.cost);
    } catch (error: any) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProgramInfo();
  }, []);

  const deleteProgram = async () => {
    try {
      await axios.delete(
        process.env.REACT_APP_DB_HOST + `/api/programs/delete/${programId}`,
      );
      alert('프로그램 삭제가 완료 되었습니다.');
      window.location.reload();
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setTitle(target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setContent(target.value);
  };
  const handleUrlChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setImage(target.value);
  };
  const handleRegularnumberChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setUserMax(target.value);
  };
  const handleStartingtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDateStart(target.value);
  };
  const handleEndtimeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setDateEnd(target.value);
  };
  const handleTherapistChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCounselorId(target.value);
  };
  const handlePriceChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setCost(target.value);
  };

  const patchProgramInfo = async () => {
    try {
      const reqBody: createProgramProps = {
        title,
        content,
        image,
        userMax: Number(userMax),
        dateStart,
        dateEnd,
        symptomTypes,
        cost: Number(cost),
        counselorId: Number(counselorId),
      };

      await axios.patch(
        process.env.REACT_APP_DB_HOST + `/api/programs/patch/${programId}`,
        reqBody,
      );
      alert('프로그램이 수정 되었습니다.');
      window.location.reload();
    } catch (error: any) {
      alert(error.response.data.errorMessage);
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    patchProgramInfo();
  };

  const deleteProgramHandler = () => {
    deleteProgram();
  };
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
          <FaRegCalendarCheck size={36} color='#999' />
          프로그램 정보 수정
        </Title>
        <CreateProgramForm onSubmit={handleSubmit}>
          <InputWrapper>
            <InputSection>
              <div>
                <label htmlFor='title' className='inputlabel'>
                  프로그램 제목
                </label>
                <InputAdmin
                  type='text'
                  id='title'
                  placeholder='프로그램 제목'
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>
              <SelectBox
                value={programInfo.symptomTypes}
                setValue={(value) => setSymptomTypes(value)}
              />
              <div>
                <label htmlFor='price' className='inputlabel'>
                  참여 비용
                </label>
                <InputAdmin
                  category='birth'
                  type='number'
                  id='price'
                  placeholder='숫자만 입력하세요'
                  value={cost}
                  onChange={handlePriceChange}
                ></InputAdmin>
              </div>
              <div>
                <label htmlFor='regularnumber' className='inputlabel'>
                  정원
                </label>
                <InputAdmin
                  type='number'
                  id='regularnumber'
                  placeholder='숫자만 입력하세요'
                  value={userMax}
                  onChange={handleRegularnumberChange}
                />
              </div>
              <div>
                <label htmlFor='therapist' className='inputlabel'>
                  상담사
                </label>
                <InputAdmin
                  type='text'
                  id='therapist'
                  placeholder='상담사 ID값 입력'
                  value={counselorId}
                  onChange={handleTherapistChange}
                />
              </div>
              <div>
                <label htmlFor='url' className='inputlabel'>
                  대표 이미지
                </label>
                <InputAdmin
                  type='text'
                  id='url'
                  placeholder='이미지 url 경로를 입력해주세요'
                  value={image}
                  onChange={handleUrlChange}
                />
              </div>
            </InputSection>
            <InputSection>
              <strong>프로그램 진행 시간</strong>
              <div className='pl-16'>
                <div className='mb-8'>
                  <label htmlFor='startingtime' className='inputlabel'>
                    시작일시
                  </label>
                  <InputAdmin
                    category='date'
                    type='datetime-local'
                    id='startingtime'
                    value={dateStart}
                    onChange={handleStartingtimeChange}
                  />
                </div>
                <div>
                  <label htmlFor='endtime' className='inputlabel'>
                    종료일시
                  </label>
                  <InputAdmin
                    type='datetime-local'
                    id='endtime'
                    value={dateEnd}
                    onChange={handleEndtimeChange}
                  />
                </div>
              </div>
              <TextArea
                id='description'
                rows={5}
                child='프로그램 설명'
                onChange={handleDescriptionChange}
                value={content}
                placeholder='프로그램 설명을 입력해주세요'
              />
            </InputSection>
          </InputWrapper>
          <ButtonWrapper>
            <DeleteButton type='button' onClick={deleteProgramHandler}>
              삭제
            </DeleteButton>
            <SubmitButton type='submit'>수정</SubmitButton>
          </ButtonWrapper>
        </CreateProgramForm>
      </ContentWrapper>
    </ScreenWrapper>
  );
};

export default EditPrograms;
