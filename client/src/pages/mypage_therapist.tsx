import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyPageProgram from '../components/Program_Mypage';
import Tabbar from '../components/tabbar';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;
  gap: 16px;

  @media screen and (min-width: 700px) {
    gap: 20px;
  }

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    width: 1080px;
    margin: 0 auto;
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
  }
`;

const Title = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  width: 100%;
  @media screen and (min-width: 1200px) {
    width: calc(100% - 700px);
    padding-top: 50px;
  }
`;

const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  @media screen and (min-width: 700px) {
    gap: 20px;
    width: 700px;
    margin: 0 auto;
  }
`;

const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  padding: 6px 12px;
  background: #d9d9d9;
  font-weight: 500;
  color: #777;
  border-radius: 5px;
  cursor: pointer;
  &:hover,
  &:active {
    background: #ccc;
    color: #666;
  }

  &.clicked {
    background: #e2d48a;
    color: #5b3e00;
    font-weight: 700;
    &:hover,
    &:active {
      background: #d6c87e;
      color: #5b3e00;
    }
  }
`;

const StatusWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`;
const ProgramWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MyPageTherapist = (props: any) => {
  const [allPrograms, setAllPrograms] = useState(true);
  const [programsConfirmed, setProgramsConfirmed] = useState(false);
  const [programsInProcess, setProgramsInProcess] = useState(false);
  const [programsCompleted, setProgramsCompleted] = useState(false);
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);

  return (
    <div>
      <Header />
      <ContentWrapper>
        {/* <Logo src='/Teacup.png' /> */}
        <Title>나의 개설 프로그램</Title>
        <ListWrapper>
          <StatusWrapper>
            <Status
              className={isActive1 ? 'clicked' : ''}
              onClick={(e) => {
                setAllPrograms(true);
                setProgramsConfirmed(false);
                setProgramsInProcess(false);
                setProgramsCompleted(false);
                setIsActive1(true);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(false);
              }}
            >
              전체 목록
            </Status>
            <Status
              className={isActive2 ? 'clicked' : ''}
              onClick={() => {
                setAllPrograms(false);
                setProgramsConfirmed(true);
                setProgramsInProcess(false);
                setProgramsCompleted(false);
                setIsActive1(false);
                setIsActive2(true);
                setIsActive3(false);
                setIsActive4(false);
              }}
            >
              진행 예정
            </Status>
            <Status
              className={isActive3 ? 'clicked' : ''}
              onClick={() => {
                setAllPrograms(false);
                setProgramsConfirmed(false);
                setProgramsInProcess(true);
                setProgramsCompleted(false);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(true);
                setIsActive4(false);
              }}
            >
              진행 중
            </Status>
            <Status
              className={isActive4 ? 'clicked' : ''}
              onClick={() => {
                setAllPrograms(false);
                setProgramsConfirmed(false);
                setProgramsInProcess(false);
                setProgramsCompleted(true);
                setIsActive1(false);
                setIsActive2(false);
                setIsActive3(false);
                setIsActive4(true);
              }}
            >
              완료
            </Status>
          </StatusWrapper>
          <ProgramWrapper>
            {allPrograms ? (
              <>
                <MyPageProgram therapist={true} category={'진행 예정'} color={'red'} />
                <MyPageProgram therapist={true} category={'진행 예정'} color={'red'} />
                <MyPageProgram therapist={true} category={'진행 중'} color={'#ffffff'} />
                <MyPageProgram therapist={true} category={'진행 중'} color={'#ffffff'} />
                <MyPageProgram therapist={true} category={'완료'} color={'#ffffff'} />
                <MyPageProgram therapist={true} category={'완료'} color={'#ffffff'} />
              </>
            ) : null}
            {programsConfirmed ? (
              <>
                <MyPageProgram therapist={true} category={'진행 예정'} />
                <MyPageProgram therapist={true} category={'진행 예정'} />
              </>
            ) : null}
            {programsInProcess ? (
              <>
                <MyPageProgram therapist={true} category={'진행 중'} />
                <MyPageProgram therapist={true} category={'진행 중'} />
              </>
            ) : null}
            {programsCompleted ? (
              <>
                <MyPageProgram therapist={true} category={'완료'} />
                <MyPageProgram therapist={true} category={'완료'} />
              </>
            ) : null}
          </ProgramWrapper>
        </ListWrapper>
        <Tabbar />
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default MyPageTherapist;
