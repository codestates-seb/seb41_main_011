import { SideMenu } from "../../route"
import { NavLink , Link} from "react-router-dom"
import styled from "styled-components"

const SideBar = styled.div`
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;


    a {
        display: block;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 1vw;
        color: #333;
        width: 100%;
        height: 20%;
        
        font-size: 1.5rem;
        font-weight: bold;
        &:hover {
            cursor: pointer;
            color: #2a8045;
        }

    }
    &:hover{
        opacity: 80%;
    }

`
const SideBarWrapper = styled.div`
    background-color: #ffffff;
    height: 100vh;
    width: 10vw;
    min-width: 220px;
    border-right: 2px solid #cfcfcf;
    position: absolute;
    left: 0%;
    display: grid;
    grid-template-columns: 200px;
    grid-template-rows: 150px 150px 150px 1fr;
`

const Sidebar = () =>{
    
    return(
        <SideBarWrapper>
            {SideMenu.map((item,index)=>{
                return <SideBar key={index}><Link to={item.path}>{item.icon}{item.name}</Link></SideBar>
            })}
        </SideBarWrapper>

    )

}
export default Sidebar