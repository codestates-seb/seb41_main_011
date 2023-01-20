import styled from 'styled-components';
import Label from './UI/Label';
import { BsFillPersonLinesFill } from 'react-icons/bs';

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

    img {
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

    .portrait {
      width: 36px;
      height: 36px;
      background: #d9d9d9;
      border-radius: 100000px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 4px;
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
  }

  @media screen and (min-width: 1200px) {
    flex-direction: row;
    align-items: center;

    .intro {
      gap: 32px;

      > div {
        gap: 20px;
      }
    }
  }
`;

const ProgramInfo = () => {
  return (
    <Contents>
      <div className='intro'>
        <img
          src='https://images.unsplash.com/photo-1422205512921-12dac7b3b603?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2952&q=80'
          alt='dummydata'
        />

        <div className='pd-x20'>
          <div className='flex-row'>
            <Label>우울</Label>
            <Label>불안</Label>
          </div>
          <h3>
            프로그램 제목 어쩌구 저쩌구 프로그램 제목 어쩌구 저쩌구 프로그램
            제목 어쩌구
          </h3>
          <div className='flex-row'>
            <div className='portrait'>
              {/* 사진 있으면 사진, 없으면 아이콘 */}
              <BsFillPersonLinesFill className='default' />
            </div>
            <div className='expert'>햄토끼</div>
          </div>
        </div>
      </div>

      <div className='expatiation pd-x20'>
        <div>
          <h4>프로그램 상세 정보</h4>
          <ul>
            <li>
              <strong>일시</strong>2023년 0월 00일 3:30PM ~ 4:30PM
            </li>
            <li>
              <strong>정원</strong>9/10 명
            </li>
            <li>
              <strong>비용</strong>20,000 원
            </li>
          </ul>
        </div>

        <div>
          <h4>프로그램 소개</h4>
          <p>
            프로그램 상세설명 오쪼구조쪼구 모종의 글 들으면 마음이 편해짐!!
            쓸쓸함과 하늘에는 이국 계집애들의 시인의 어머니, 봅니다. 멀리
            이름과, 밤이 쉬이 이 내일 남은 까닭입니다.
          </p>
          <p>
            벌레는 멀듯이, 벌써 하늘에는 새워 잠, 소녀들의 노루, 까닭입니다.
            흙으로 내 가을 봅니다. 청춘이 불러 가득 봅니다. 우는 벌써 덮어 한
            했던 다 이름을 잠, 자랑처럼 까닭입니다. 겨울이 다하지 강아지, 다
            까닭입니다. 차 없이 하나에 아스라히 아직 새워 못 하나에 지나고
            버리었습니다. 비둘기, 그리고 했던 언덕 시와 남은 벌써 잠, 소녀들의
            봅니다. 불러 위에 겨울이 보고, 새워 별들을 무성할 계십니다.
          </p>
        </div>

        <div>
          <h4>햄토끼 상담사</h4>
          <ul>
            <li>
              <strong>전문분야</strong>어쩌구 저쩌구
            </li>
          </ul>
          <p>
            안녕하세요 저는 킹갓 상담사 햄토끼라고 합니다. 그룹 상담을 진행한
            지는 50년이 되었으며, 여러분들의 우울한 감정을 완화시키기 위해
            최선을 다해 그룹 상담을 이끌어 나가겠습니다. 킹갓 상담사 햄토끼를
            만나면 모두 행복해지고 부자가 되고 만수무강 할 수 있습니다. 화이팅!
          </p>
        </div>
      </div>
    </Contents>
  );
};

export default ProgramInfo;
