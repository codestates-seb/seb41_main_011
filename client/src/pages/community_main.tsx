import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import api from '../RefreshToken';
import Pagination from '../components/Pagination';
import { viewBoardCategory, viewBookDate } from '../utils';
import { useAppSelector } from '../store/hooks';

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

    a {
      display: block;
      color: inherit;
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

const PaginationWrapper = styled.div`
  padding-top: 24px;
  @media screen and (min-width: 1200px) {
    padding-top: 36px;
  }
`;

const CommunityMain = (props: any) => {
  const userRole = useAppSelector((state) => state.login.role);
  const isAdmin = userRole === 'ADMIN' ? true : false;
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

  const navigate = useNavigate();
  const location = useLocation().pathname;

  const [postList, setPostList] = useState<any>([]);
  const [postPage, setPostPage] = useState(1);
  const [postTotalPage, setPostTotalPage] = useState(1);
  const [totalPost, setTotalPost] = useState(0);

  const [isNotice, setIsNotice] = useState(
    location === '/community/notice' ? true : false,
  );
  const [isBoard, setIsBoard] = useState(
    location === '/community/general' ? true : false,
  );
  useEffect(() => {
    if (location === '/community/notice') {
      setIsNotice(true);
      setIsBoard(false);
    } else {
      setIsNotice(false);
      setIsBoard(true);
    }
  }, [location]);

  const toCommunityNotice = async () => {
    try {
      const response = await api.get(
        `/api/notices/lookup/list?page=${postPage}&size=10`,
      );
      setPostList(response.data.data);
      setTotalPost(response.data.pageInfo.totalElements);
      setPostTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };
  const toCommunityGeneral = async () => {
    try {
      const response = await api.get(
        `/api/posts/lookup/list?page=${postPage}&size=10`,
      );
      setPostList(response.data.data);
      setTotalPost(response.data.pageInfo.totalElements);
      setPostTotalPage(response.data.pageInfo.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (location === '/community/general') {
      toCommunityGeneral();
    }
    if (location === '/community/notice') {
      toCommunityNotice();
    }
  }, [location, postPage]);

  return (
    <div>
      <Header />
      <ContentWrapper>
        <MainMessage>{isNotice ? '공지사항' : '유저 커뮤니티'}</MainMessage>
        <MenuBar>
          <div
            className={isNotice ? 'clicked' : ''}
            onClick={() => {
              setIsNotice(!isNotice);
              setIsNotice(true);
              setIsBoard(false);
              navigate('/community/notice');
            }}
          >
            공지사항
          </div>
          <div
            className={isBoard ? 'clicked' : ''}
            onClick={() => {
              setIsBoard(!isBoard);
              setIsNotice(false);
              setIsBoard(true);
              navigate('/community/general');
            }}
          >
            유저 커뮤니티
          </div>
        </MenuBar>

        <MessageGrid>
          <div className='totalPostCount'>
            총 {totalPost}개의 {isNotice ? '공지사항' : '게시글'}이 있습니다.
          </div>
          {isNotice
            ? isAdmin && (
                <button className='writeButton'>
                  <Link to='/community/notice/write'>글쓰기</Link>
                </button>
              )
            : isLoggedIn && (
                <button className='writeButton'>
                  <Link to='/community/general/write'>글쓰기</Link>
                </button>
              )}
        </MessageGrid>
        <PostWRapper>
          {postList.map((post: any) => {
            return (
              <Post>
                <div className='postIndex'>
                  {isNotice ? post.noticeId : post.postId}
                </div>
                <div className='wrapper'>
                  <div className='postTitle'>
                    {isNotice ? (
                      <Tag>공지</Tag>
                    ) : (
                      <Tag>{viewBoardCategory(post.kinds)}</Tag>
                    )}
                    <Link
                      to={
                        isNotice
                          ? `/community/notice/${post.noticeId}`
                          : `/community/general/${post.postId}`
                      }
                    >
                      {isNotice ? post.title : post.title}
                    </Link>
                  </div>
                  <div className='postInfo'>
                    {viewBookDate(post.createdTime)} · {post.writer}
                  </div>
                </div>

                <div className='postButton'>
                  <Link
                    to={
                      isNotice
                        ? `/community/notice/${post.noticeId}`
                        : `/community/general/${post.postId}`
                    }
                  >
                    +
                  </Link>
                </div>
              </Post>
            );
          })}
        </PostWRapper>
        <PaginationWrapper>
          <Pagination
            page={postPage}
            limit={5}
            totalPage={postTotalPage}
            setPage={setPostPage}
          />
        </PaginationWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default CommunityMain;
