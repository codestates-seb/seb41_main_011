import Sidebar from "../components/UI/Sidebar";
import styled from "styled-components";
import CreateTherapist from './componentes/CreateTherapist';
import { PageWrapper } from '../components/UI/PageWrapper';


const UserManagement = () =>{


    return (
        <>
        <PageWrapper>
        <Sidebar/>
        <CreateTherapist/>
        </PageWrapper>
        </>
    )
        

}



export default UserManagement;
