import { useNavigate} from "react-router";
import { useState } from "react";
import styled from "styled-components";
import Tabbar from "../components/tabbar";
import Header from "../components/Header";

const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
        justify-content: space-between;
    }
`
const MessageGrid = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80vw;
    width: 80vw;
    button {
        border-radius: 10px;
        border: none;
        height: 5vh;
        width: 10vw;
        background-color: #009779;
        color: white;
        font-weight: 500;
        &:hover {
            cursor: pointer;
        }
    }

    @media screen and (min-width: 768px) {
		width: 70vw;
        /* button {
            width: 200px;
        } */
    }
    
`
const Post = styled.div`
    display: grid;
    /* border: 1px solid blue; */
    grid-template-columns: 5% 80% 5%;
    gap: 5%;
    width: 80vw;
    border-bottom: 1px solid #70846C;
    div {
        display: flex;
        height: 6vh;
        justify-content: center;
        align-items: center;
    }
    .wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .postIndex {
        color: #70846C;
        font-weight: 500;
    }
    .postTitle {
        display: flex;
        justify-content: flex-start;
        color: #333;
        &:hover{
            cursor: pointer;
            color: #009779;
        }
    }
    .postInfo {
        font-size: 0.8rem;
        color: #7e7e7e;
    }
    .postButton {
        color: #70846C;
        font-size: 1.5rem;
        &:hover{
            cursor: pointer;
            color: #009779;
        }
    }
    @media screen and (min-width: 768px) {
		width: 70vw;
    }
`

const PostWRapper = styled.div `
    width: 80vw;
    height: 60vh;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    ::-webkit-scrollbar { 
    display: none; 
  }
`
const MenuBar = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    width: 80vw;
    height: 5vh;
    div {
        display: flex;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        background-color: #C4DCBF;
        color: #333;
        &:hover {
        cursor: pointer;
        background-color: #70846C;
        color: #edffea;
        }
        &.clicked {
        background-color: #70846C;
        color: #edffea;
        }
    }

    @media screen and (min-width: 768px) {
		width: 70vw;
    }
`
const MainMessage = styled.div`
	color: #4B6A4D;
	font-weight: 700;
	font-size: 2.25rem;
    text-align: left;
    width: 80vw;
    @media screen and (min-width: 768px) {
        width: 70vw;
        font-size: 2.25rem;
    }
`

const CustomHr = styled.div`
    width: 80vw;
    background-color: #C4DCBF;
    border: 3px solid #C4DCBF;
    @media screen and (min-width: 768px) {
		width: 70vw;
    }
`
const CustomHr2 = styled.hr`
    width: 100vw;
    background-color: #C4DCBF;
    border: 1px solid #C4DCBF;
    top: 0%;
    margin-top: 70px;
    position: absolute;
    @media screen and (max-width: 768px) {
		margin-top: 40px;
    }
`


const Tag = styled.span`
	display: flex;
	height: auto;
	width: 40px;
	justify-content: center;
	align-items: center;
	background-color: #C4DCBF;
    color: #333;
    margin-right: 1vw;
	border-radius: 5px;
    @media screen and (min-width: 768px) {
		width: 4vw;
    }
`

const CommunityMain = (props: any) => {
    const navigate = useNavigate();
    const [isActive1, setIsActive1] = useState(window.location.pathname === '/community/notice' ? true : false);
    const [isActive2, setIsActive2] = useState(window.location.pathname === '/community/general' ? true : false);


    const toWriteBoard = () => {
        navigate('/board/write');
    }
    const toWriteNotice = () => {
        navigate('/notice/write');
    }
    const toCommunityNotice = () => {
        navigate('/community/notice');
    }
    const toCommunityGeneral = () => {
        navigate('/community/general');
    }

    
    return (
        <div>
            <ContentWrapper>
                <Header />
                <CustomHr2 />
                <MainMessage>
                    {isActive1 ? '공지사항' : '유저 커뮤니티'}
                </MainMessage>
                <MenuBar>
                    <div className={isActive1 ? 'clicked' : ''} onClick={() => {setIsActive1(!isActive1)
                    setIsActive1(true);
                    setIsActive2(false);
                    toCommunityNotice()}}>
                        공지사항
                    </div>
                    <div className={isActive2 ? 'clicked' : ''} onClick={() => {setIsActive2(!isActive2)
                    setIsActive1(false);
                    setIsActive2(true);
                    toCommunityGeneral()}}>
                        유저 커뮤니티
                    </div>
                </MenuBar>

                <MessageGrid>
                    <div className='totalPostCount'>
                        총 10개의 게시글이 있습니다.
                    </div>
                    <button className='writeButton' onClick={() => isActive1 ? toWriteNotice() : toWriteBoard()}>
                        글쓰기
                    </button>
                </MessageGrid>
                <PostWRapper onClick={() => navigate(isActive1 ? '/community/notice/:id' : '/community/general/:id')}>
                    <CustomHr />
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item) => {
                        return (
                        <Post>
                            <div className='postIndex'>{item}</div>
                            <div className="wrapper">
                                <div className = 'postTitle'>
                                    {isActive1 ? <Tag>공지</Tag> : <Tag>후기</Tag>}
                                    {isActive1 ? '안녕하세요 상담사 햄토끼 입니다.' : '상담사 햄토끼님 덕에 부자가 되었어요!'}
                                </div>
                                <div className='postInfo'>
                                    2023.01.05 09:00 · {isActive1 ? '햄토끼' : '햄토끼찬양'}
                                </div>
                            </div>

                            <div className = 'postButton'>+</div>
                        </Post>)
                    })}
                </PostWRapper>
                <Tabbar />
            </ContentWrapper>
        </div>
    )
}

export default CommunityMain;

