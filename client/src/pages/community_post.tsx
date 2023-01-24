import { useNavigate } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';

const ContentWrapper = styled.div`
  min-height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px 110px;

  @media screen and (min-width: 768px) {
    padding: 84px 20px 20px;
    min-height: calc(100vh - 64px);
  }
  @media screen and (min-width: 1200px) {
    width: 1000px;
    margin: 0 auto;
    padding: 90px 0 20px;
    min-height: calc(100vh - 70px);
  }
`;

const PostWrapper = styled.div`
  margin: 12px auto 16px;
  box-sizing: border-box;
  background-color: #fffefd;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  width: 100%;
  height: 65vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 1200px) {
    margin: 16px auto 20px;
  }
`;

const PostInfoWrapper = styled.div`
  padding: 0.8rem 1rem 0.6rem;
  width: 100%;
  background-color: #e2eedf;
  border-bottom: 3px solid #c4dcbf;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  @media screen and (min-width: 1200px) {
    padding: 0.8rem 1.2rem 0.6rem;
  }
`;
const SubWrapper1 = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 1.27rem;
  font-weight: 500;
  color: #333;
`;
const SubWrapper2 = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  * {
    font-size: 0.9rem;
    color: #666;
    &.username {
      color: #4b4b4b;
      font-weight: 500;
      margin-left: 4px;
    }
  }
`;

const PostContentWrapper = styled.div`
  padding: 0.8rem 1rem 0.6rem;
  width: 100%;
  font-size: 1rem;
  white-space: pre-line;
  overflow-y: auto;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #e4eee2;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #c4dcbf;
    border-radius: 10px;
  }
  color: #333;

  h1 {
    font-size: 2em;
    font-weight: 500;
  }
  h2 {
    font-size: 1.5em;
    font-weight: 500;
  }
  h3 {
    font-size: 1.17em;
    font-weight: 500;
  }
  img {
    max-width: 100%;
  }
  a {
    color: #06c;
    text-decoration: underline;
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  ul,
  ol {
    padding-left: 3em;
  }
  ul li {
    list-style: disc;
  }
  ol li {
    list-style: decimal;
    counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8
      list-9;
    counter-increment: list-0;
  }

  @media screen and (min-width: 1200px) {
    padding: 0.8rem 1.2rem 0.6rem;
  }
`;

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  width: 100%;
`;

const Tag = styled.span`
  width: fit-content;
  height: max-content;
  padding: 0 4px;
  background-color: #dae2b6;
  color: #333;
  border-radius: 4px;
  font-size: 0.84rem;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .subButtonWrapper {
    display: flex;
    gap: 8px;
  }
  button {
    border: none;
    font-size: 0.95rem;
    font-weight: 500;
    width: fit-content;
    padding: 6px 20px;
    border-radius: 4px;
    background-color: #d6d6d6;
    color: #333;
    &:hover {
      cursor: pointer;
      background-color: #bebebe;
    }
    &.toAllPost {
      background: #009779;
      color: #fff;
      :hover,
      :active {
        background: #0d8b72;
      }
    }
  }
`;

const CommunityPost = (props: any) => {
  const navigate = useNavigate();
  const [isNotice, setIsNotice] = useState(
    window.location.pathname.includes('notice') ? true : false,
  );
  const toCommunityNotice = () => {
    navigate('/community/notice');
  };
  const toCommunityGeneral = () => {
    navigate('/community/general');
  };

  const ParseOptions: HTMLReactParserOptions = {
    replace: (domNode: DOMNode) => {
      if (
        domNode instanceof Element &&
        domNode.attribs &&
        domNode.attribs.class === 'remove'
      ) {
        return <></>;
      }
    },
  };
  return (
    <div>
      <Header />
      <ContentWrapper>
        <MainMessage>{isNotice ? '공지사항' : '유저 커뮤니티'}</MainMessage>
        <PostWrapper>
          <PostInfoWrapper>
            <SubWrapper1>
              <Tag>{isNotice ? '공지' : '후기'}</Tag>
              {isNotice
                ? '안녕하세요 상담사 햄토끼 입니다.'
                : '상담사 햄토끼님 덕에 부자가 되었어요!'}
            </SubWrapper1>
            <SubWrapper2>
              <span>
                작성자
                <span className='username'>
                  {isNotice ? '햄토끼🐹' : '햄토끼찬양'}
                </span>
              </span>
              <span>2023.01.05 09:00</span>
              <span>조회 11회</span>
            </SubWrapper2>
          </PostInfoWrapper>
          <PostContentWrapper>
            {parse(
              `<h1>Heading1</h1><h2>Heading2</h2><h3>Heading3</h3><p>Normal</p><p><strong>Bold</strong></p><p><em>Italic</em></p><p><u>Underline</u></p><p><a href="Link" rel="noopener noreferrer" target="_blank">Link</a></p><ol><li>Ordered List Item</li><li>Ordered List Item</li><li>Ordered List Item</li></ol><ul><li>Unordered List Item</li><li>Unordered List Item</li><li>Unordered List Item</li></ul><p><br></p><ol><li>Ordered List Item</li><li>Ordered List Item</li><li>Ordered List Item</li></ol><p>계엄을 선포한 때에는 대통령은 지체없이 국회에 통고하여야 한다. 민주평화통일자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국방상 또는 국민경제상 긴절한 필요로 인하여 법률이 정하는 경우를 제외하고는, 사영기업을 국유 또는 공유로 이전하거나 그 경영을 통제 또는 관리할 수 없다. 대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 헌법재판소 재판관은 정당에 가입하거나 정치에 관여할 수 없다. 대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다.</p>
            `,
              ParseOptions,
            )}
          </PostContentWrapper>
        </PostWrapper>
        <ButtonWrapper>
          <button
            className='toAllPost'
            onClick={() => {
              isNotice ? toCommunityNotice() : toCommunityGeneral();
            }}
          >
            목록보기
          </button>
          <div className='subButtonWrapper'>
            <button
              className='edit'
              onClick={() =>
                isNotice
                  ? navigate('/community/notice/modify')
                  : navigate('/community/board/modify')
              }
            >
              수정
            </button>
            <button className='delete'>삭제</button>
          </div>
        </ButtonWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default CommunityPost;
