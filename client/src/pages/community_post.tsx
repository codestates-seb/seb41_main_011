import { useNavigate} from "react-router";
import { useState } from "react";
import styled from "styled-components";
import Tabbar from "../components/tabbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

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

const PostWrapper = styled.div `
    box-sizing: border-box;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    background-color: #fffefd;
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
  @media screen and (min-width: 768px) {
        width: 70vw;
  }
`

const PostInfoWrapper = styled.div`
  padding-top: 1.5%;
  padding-left: 1.5%;
  padding-right: 1.5%;
  width: 100%;
  height: 18%;
  background-color: #e6f1e4;
  @media screen and (max-width: 768px) {
    padding-left: 5%;
  }
`
const SubWrapper1 = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;

`
const SubWrapper2 = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  *{
    margin-right: 1vw;
    font-size: 0.8rem;
    color: #474747;
    &.username {
      font-weight: 500;
    }
    &.author {
      margin-left: 1%;
    }
  }
`

const PostContentWrapper = styled.div`
  padding-top: 1.5%;
  padding-left: 1.5%;
  padding-right: 1.5%;
  width: 100%;
  height: 82%;
  padding: 3%;
  font-size: 0.8rem;
  white-space: pre-line;
  overflow: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #f2f8ee;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #C4DCBF;;
    border-radius: 10px;
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
    width: 100%;
    background-color: #C4DCBF;
    border: 3px solid #C4DCBF;
    /* @media screen and (min-width: 768px) {
		width: 70vw;
    } */
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
	height: 2.5vh;
	width: 40px;
	justify-content: center;
	align-items: center;
  font-size: 1rem;
	background-color: #C4DCBF;
    color: #333;
    margin-right: 1vw;
	border-radius: 5px;
    @media screen and (min-width: 768px) {
		width: 4vw;
    }
`


const ButtonWrapper = styled.div `
    width: 80vw;
    display: flex;
    justify-content: space-between;
    align-items: center; 
    .subButtonWrapper {
      * {
        margin-left: 1vw;
      }
    }
    button {
      border: none;
      margin: 10px;
      font-size: 1rem;
      font-weight: 500;
      height: 4vh;
      width: 40px;
      border-radius: 8px;
      background-color: #d6d6d6;
      color: #333;
       &:hover {
        cursor: pointer;
        background-color: #bebebe;
       }
      &.toAllPost{
        @media screen and (max-width: 768px) {
          width: 20vw;
        }       
        color: white;
        background-color: #1c804e;
        &:hover {
          background-color: #477a60;
        }
      }
    }

  @media screen and (min-width: 768px) {
        width: 70vw;
    button {
      border-radius: 5px;
      height: 4vh;
      width: 150px;
      &.edit, &.delete{
        width: 100px;
      }
    }

  }
`

const CommunityPost = (props: any) => {
    const navigate = useNavigate();
    const [isNotice, setIsNotice] = useState(window.location.pathname.includes('notice') ? true : false);
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
                    {isNotice ? '공지사항' : '유저 커뮤니티'}
                </MainMessage>
                <PostWrapper>
                  <PostInfoWrapper>
                    <SubWrapper1>
                      <Tag>{isNotice ? '공지' : '후기'}</Tag>
                      {isNotice ? '안녕하세요 상담사 햄토끼 입니다.' : '상담사 햄토끼님 덕에 부자가 되었어요!'}
                    </SubWrapper1>
                    <SubWrapper2>
                      <span className="author">
                        작성자
                      </span>
                      <span className="username">
                        {isNotice ? '햄토끼🐹' : '햄토끼찬양'}
                      </span>
                      <span>
                        2023.01.05 09:00
                      </span>
                      <span>
                        조회 11회
                      </span>
                    </SubWrapper2>
                  </PostInfoWrapper>
                  <CustomHr />
                  <PostContentWrapper>
                    이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다.<br /> 국가는 모성의 보호를 위하여 노력하여야 한다.<br />
                    군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.<br /> 
                    <br />
                    대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며,<br /> 
                    법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.<br />
                    이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다.<br /> 국가는 모성의 보호를 위하여 노력하여야 한다.<br />
                    군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.<br /> 
                    <br />
                    대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며,<br /> 
                    법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.<br />
                    이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다.<br /> 국가는 모성의 보호를 위하여 노력하여야 한다.<br />
                    군인 또는 군무원이 아닌 국민은 대한민국의 영역안에서는 중대한 군사상 기밀·초병·초소·유독음식물공급·포로·군용물에 관한 죄중 법률이 정한 경우와 비상계엄이 선포된 경우를 제외하고는 군사법원의 재판을 받지 아니한다.<br /> 
                    <br />
                    대통령이 제1항의 기간내에 공포나 재의의 요구를 하지 아니한 때에도 그 법률안은 법률로서 확정된다. 중앙선거관리위원회는 법령의 범위안에서 선거관리·국민투표관리 또는 정당사무에 관한 규칙을 제정할 수 있으며,<br /> 
                    법률에 저촉되지 아니하는 범위안에서 내부규율에 관한 규칙을 제정할 수 있다. 모든 국민은 신속한 재판을 받을 권리를 가진다. 형사피고인은 상당한 이유가 없는 한 지체없이 공개재판을 받을 권리를 가진다.<br />
                  </PostContentWrapper>
                </PostWrapper>
                <ButtonWrapper>
                  <button className="toAllPost" onClick={() => {isNotice ? toCommunityNotice() : toCommunityGeneral()}}>목록보기</button>
                  <div className="subButtonWrapper">
                    <button className="edit" onClick={() => isNotice ? navigate('/notice/modify') : navigate('/board/modify')}>수정</button>
                    <button className="delete">삭제</button>
                  </div>
                </ButtonWrapper>
                
                <Tabbar />
            </ContentWrapper>
        </div>
    )
}

export default CommunityPost;

