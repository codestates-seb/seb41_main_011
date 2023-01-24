import { useNavigate } from 'react-router';
import { useState } from 'react';
import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

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

const MainMessage = styled.div`
  color: #4b6a4d;
  font-weight: 700;
  font-size: 2.25rem;
  text-align: left;
  width: 100%;
`;

const MessageGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  margin: 8px auto;

  .totalPostCount {
    font-size: 0.9rem;
    color: #333;
  }

  button {
    border-radius: 4px;
    border: none;
    padding: 4px 20px;
    background-color: #c4dcbf;
    color: #333;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background-color: #70846c;
      color: #fff;
    }
  }

  @media screen and (min-width: 768px) {
    button {
      font-size: 0.85rem;
    }
  }
`;
const Post = styled.div`
  display: grid;
  grid-template-columns: 8% 80% 8%;
  gap: 2%;
  width: 100%;
  border-bottom: 1px solid #ddd;

  a {
    color: inherit;
  }

  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .wrapper {
    max-width: 100%;
    padding: 0.4rem 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
  .postIndex {
    color: #70846c;
    font-size: 0.9rem;
    font-weight: 500;
  }
  .postTitle {
    display: block;
    color: #333;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      color: #009779;
    }
  }
  .postInfo {
    font-size: 0.83rem;
    color: #666;
  }
  .postButton {
    flex: 1 0 8%;
    color: #70846c;
    font-size: 1.5rem;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      color: #009779;
    }
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: 6% 84% 6%;
    gap: 2%;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 5% 88% 5%;
    gap: 1%;
  }
`;

const PostWRapper = styled.div`
  width: 100%;
  border-top: 2px solid #009779;
`;
const MenuBar = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  margin: 16px auto;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    background-color: #d9d9d9;
    color: #777;
    padding: 8px 0;
    transition: all 0.2s;
    &:hover {
      cursor: pointer;
      background-color: #ccc;
      color: #666;
    }
    &.clicked {
      background-color: #e2d48a;
      color: #5b3e00;
      :hover {
        background: #d6c87e;
        color: #5b3e00;
      }
    }
  }
`;

const Tag = styled.span`
  width: fit-content;
  padding: 0 4px;
  background-color: #dae2b6;
  color: #333;
  border-radius: 4px;
  font-size: 0.84rem;
  margin-right: 8px;
`;

const CommunityMain = (props: any) => {
  const navigate = useNavigate();
  const [isActive1, setIsActive1] = useState(
    window.location.pathname === '/community/notice' ? true : false,
  );
  const [isActive2, setIsActive2] = useState(
    window.location.pathname === '/community/general' ? true : false,
  );

  const toWriteBoard = () => {
    navigate('/community/general/write');
  };
  const toWriteNotice = () => {
    navigate('/community/notice/write');
  };
  const toCommunityNotice = () => {
    navigate('/community/notice');
  };
  const toCommunityGeneral = () => {
    navigate('/community/general');
  };

  return (
    <div>
      <Header />
      <ContentWrapper>
        <MainMessage>{isActive1 ? '공지사항' : '유저 커뮤니티'}</MainMessage>
        <MenuBar>
          <div
            className={isActive1 ? 'clicked' : ''}
            onClick={() => {
              setIsActive1(!isActive1);
              setIsActive1(true);
              setIsActive2(false);
              toCommunityNotice();
            }}
          >
            공지사항
          </div>
          <div
            className={isActive2 ? 'clicked' : ''}
            onClick={() => {
              setIsActive2(!isActive2);
              setIsActive1(false);
              setIsActive2(true);
              toCommunityGeneral();
            }}
          >
            유저 커뮤니티
          </div>
        </MenuBar>

        <MessageGrid>
          <div className='totalPostCount'>
            총 10개의 {isActive1 ? '공지사항' : '게시글'}이 있습니다.
          </div>
          <button
            className='writeButton'
            onClick={() => (isActive1 ? toWriteNotice() : toWriteBoard())}
          >
            글쓰기
          </button>
        </MessageGrid>
        <PostWRapper>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((item) => {
            return (
              <Post>
                <div className='postIndex'>{item}</div>
                <div className='wrapper'>
                  <div className='postTitle'>
                    {isActive1 ? <Tag>공지</Tag> : <Tag>후기</Tag>}
                    <Link
                      to={
                        isActive1
                          ? `/community/notice/${item}`
                          : `/community/general/${item}`
                      }
                    >
                      {isActive1
                        ? '안녕하세요 상담사 햄토끼 입니다.'
                        : '상담사 햄토끼님 덕에 부자가 되었어요!'}
                    </Link>
                  </div>
                  <div className='postInfo'>
                    2023.01.05 09:00 · {isActive1 ? '햄토끼' : '햄토끼찬양'}
                  </div>
                </div>

                <div className='postButton'>
                  <Link
                    to={
                      isActive1
                        ? `/community/notice/${item}`
                        : `/community/general/${item}`
                    }
                  >
                    +
                  </Link>
                </div>
              </Post>
            );
          })}
        </PostWRapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default CommunityMain;
