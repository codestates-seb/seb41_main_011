import styled from "styled-components";
import { FaListAlt, FaSyringe, FaRegLaughSquint, FaRegFileAlt } from 'react-icons/fa';

const Box = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 360px; // 모바일 화면 크기
    height: 70px;
    background-color: white;
`

const IconWrapper = styled.div`
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #777777; 
    font-size: 10px;
    cursor: pointer;
    *{
     margin: 3px;
    }
`
  
const CenterIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #B3D2B0;
    object-fit: scale-down;
    margin-bottom: 20%;
    cursor: pointer;
`

const CenterIconImage = styled.img`
    max-height: 70%;
    max-width: 70%;
    padding-right: 8%;
    padding-bottom: 5%;
`


const Tabbar = () => {
    return (
        <div>
            <Box>
            <IconWrapper>
                <FaListAlt color='#777777' size={27}/>
                프로그램
            </IconWrapper>
            <IconWrapper>
                <FaSyringe color='#777777' size={27}/>
                테스트
            </IconWrapper>
                <CenterIcon>
                    <CenterIconImage src='teacup.png'/>
                </CenterIcon>
            <IconWrapper>
                <FaRegLaughSquint color='#777777' size={27}/>
                커뮤니티
            </IconWrapper>
            <IconWrapper>
                <FaRegFileAlt color='#777777' size={27}/>
                메뉴 더보기
            </IconWrapper>           
            </Box>
        </div>
    )

}
export default Tabbar;


