import { useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Tabbar from '../components/tabbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import parse, {
  DOMNode,
  Element,
  HTMLReactParserOptions,
} from 'html-react-parser';
import api from '../RefreshToken';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { viewBoardCategory, viewBookDate } from '../utils';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { postActions } from '../store/post';
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
  border: 1px solid #ededed;
  border-top: 0;
  width: 100%;
  max-height: 65vh;
  min-height: 14vh;
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
    transition: all 0.2s;
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
    a {
      display: block;
      color: inherit;
    }
  }
`;

const CommunityPost = (props: any) => {
  const userRole = useAppSelector((state) => state.login.role);
  const isAdmin = userRole === 'ADMIN' ? true : false;
  const isLoggedIn = localStorage.getItem('accessToken') ? true : false;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const { id } = useParams();
  const isNotice = location.includes('notice') ? true : false;

  const [post, setPost] = useState<any>([]);

  const getPost = async () => {
    try {
      const response = await api.get(
        `/api/${isNotice ? 'notices' : 'posts'}/lookup/${id}`,
      );
      setPost(response.data.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const deletePost = async () => {
    try {
      await api.delete(`/api/${isNotice ? 'notices' : 'posts'}/delete/${id}`);
      navigate(isNotice ? '/community/notice' : '/community/general');
    } catch (error: any) {
      console.log(error);
    }
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
              <Tag>{isNotice ? '공지' : viewBoardCategory(post.kinds)}</Tag>
              {post.title}
            </SubWrapper1>
            <SubWrapper2>
              <span>
                작성자
                <span className='username'>{post.writer}</span>
              </span>
              <span>{viewBookDate(post.createdTime)}</span>
              <span>조회 {post.views}회</span>
            </SubWrapper2>
          </PostInfoWrapper>
          <PostContentWrapper>
            {parse(`${post.content}`, ParseOptions)}
          </PostContentWrapper>
        </PostWrapper>
        <ButtonWrapper>
          <button className='toAllPost'>
            <Link to={isNotice ? '/community/notice' : '/community/general'}>
              목록보기
            </Link>
          </button>
          {isNotice
            ? isAdmin && (
                <div className='subButtonWrapper'>
                  <button
                    className='edit'
                    onClick={() => {
                      dispatch(postActions.id(id));
                      navigate('/community/notice/modify');
                    }}
                  >
                    수정
                  </button>
                  <button
                    className='delete'
                    onClick={() => {
                      deletePost();
                    }}
                  >
                    삭제
                  </button>
                </div>
              )
            : isLoggedIn && (
                <div className='subButtonWrapper'>
                  <button
                    className='edit'
                    onClick={() => {
                      dispatch(postActions.id(id));
                      navigate('/community/general/modify');
                    }}
                  >
                    수정
                  </button>
                  <button
                    className='delete'
                    onClick={() => {
                      deletePost();
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
        </ButtonWrapper>
      </ContentWrapper>
      <Tabbar />
      <Footer />
    </div>
  );
};

export default CommunityPost;
