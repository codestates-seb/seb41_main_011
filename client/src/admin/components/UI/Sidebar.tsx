import { SideMenu } from "../../route"
import { NavLink , Link} from "react-router-dom"
import styled from "styled-components"

const SideBar = styled.div`
    display: flex;
    background-color: whitesmoke;
    text-align: center;
    justify-content: center;
    align-items: center;
    a {
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 30%;
        
        font-size: 1.5rem;
        font-weight: bold;

    }
    &:hover{
        opacity: 80%;
    }

`
const SideBarWrapper = styled.div`
    background-color: whitesmoke;
    height: 100vh;
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