import styled from 'styled-components';
import Label from './UI/Label';
import { BsFillPersonLinesFill } from 'react-icons/bs';
import { viewProgramDate, viewCost } from '../utils';
import { useEffect, useState } from 'react';
import { programIdProps } from '../types';
import api from '../RefreshToken';

const Contents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #333;

  .flex-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .pd-x20 {
    padding: 0 20px;
  }

  .intro {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    > img {
      max-width: 100%;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }

    h3 {
      font-size: 1.53rem;
      font-weight: 700;
      line-height: 1.35;
      word-break: keep-all;
    }
    .iconwrapper {
      width: 36px;
      height: 36px;
      margin-right: 4px;
      background: #d9d9d9;
      border-radius: 100000px;
      display: flex;
      align-items: center;
      justify-content: center;
      .default {
        font-size: 1.6rem;
        color: #4b4b4b;
      }
    }

    .expert {
      font-weight: 500;
    }
  }

  .expatiation {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 16px;

    h4 {
      font-weight: 500;
    }
    ul li,
    p {
      font-weight: 300;
      margin-top: 4px;

      strong {
        font-weight: 500;
        color: #72ab76;
        margin-right: 8px;
      }
    }
    .portrait {
      width: 100%;
      margin: 0 auto;
      overflow: hidden;
      img {
        object-fit: cover;
        max-height: 140px;
        max-width: 100%;
      }
    }
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;

    .intro {
      gap: 32px;
      width: calc((100% - 32px) / 2);

      > div {
        gap: 20px;
      }
    }
    .expatiation {
      width: calc((100% - 32px) / 2);
    }
  }
`;

const ProgramInfo = (props: programIdProps) => {
  const programId = props.id;

  const [programInfo, setProgramInfo] = useState({
    programId: 0,
    title: '',
    content: '',
    userMax: 0,
    userCount: 0,
    cost: 0,
    image: '',
    dateStart: '',
    dateEnd: '',
    symptomTypes: [],
    counselorName: '',
    profile: '',
    introduce: '',
    expertiseField: '',
  });

  const getEachProgram = async () => {
    try {
      const response = await api.get(`/api/programs/lookup/${programId}`);
      setProgramInfo(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEachProgram();
  }, []);

  return (
    <Contents>
      <div className='intro'>
        <img src={programInfo.image} alt='프로그램 대표 이미지' />

        <div className='pd-x20'>
          <div className='flex-row'>
            {programInfo.symptomTypes.map((type: string, idx: number) => {
              return <Label key={idx}>{type}</Label>;
            })}
          </div>
          <h3>{programInfo.title}</h3>
          <div className='flex-row'>
            <div className='iconwrapper'>
              <BsFillPersonLinesFill className='default' />
            </div>
            <div className='expert'>{programInfo.counselorName}</div>
          </div>
        </div>
      </div>

      <div className='expatiation pd-x20'>
        <div>
          <h4>프로그램 상세 정보</h4>
          <ul>
            <li>
              <strong>일시</strong>
              {viewProgramDate(programInfo.dateStart, programInfo.dateEnd)}
            </li>
            <li>
              <strong>정원</strong>
              {programInfo.userCount}/{programInfo.userMax} 명
            </li>
            <li>
              <strong>비용</strong>
              {viewCost(programInfo.cost)} 원
            </li>
          </ul>
        </div>

        <div>
          <h4>프로그램 소개</h4>
          <p>{programInfo.content}</p>
        </div>

        <div>
          <h4>{programInfo.counselorName} 상담사</h4>
          <ul>
            <li className='portrait'>
              <img
                src={programInfo.profile}
                alt={`${programInfo.counselorName} 상담사`}
              />
            </li>
            <li>
              <strong>전문분야</strong>
              {programInfo.expertiseField}
            </li>
          </ul>
          <p>{programInfo.introduce}</p>
        </div>
      </div>
    </Contents>
  );
};

export default ProgramInfo;
