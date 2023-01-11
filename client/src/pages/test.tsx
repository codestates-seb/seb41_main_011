import { useNavigate } from "react-router";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";
import Tabbar from "../components/tabbar";


const GlobalStyle = createGlobalStyle`
  body {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
  }
`;

const ContentWrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media screen and (max-width: 768px) {
        padding-top: 0vh;
        padding-bottom: 0vh;
        height: 100vh;
        justify-content: space-between;
    }
`

const Test = () => {
  return (
    <div>
      <GlobalStyle/>
      <ContentWrapper>
        <div></div>
        <Tabbar />
      </ContentWrapper>
      
    </div>
  )

}

export default Test;