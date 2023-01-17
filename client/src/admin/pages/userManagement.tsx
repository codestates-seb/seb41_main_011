import Sidebar from "../components/UI/Sidebar";
import styled from "styled-components";
import CreateTherapist from '../components/CreateTherapist';
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
