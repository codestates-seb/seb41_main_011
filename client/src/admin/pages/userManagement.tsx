import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import InputAdmin from "../components/Input";
import {FaUserCircle} from "react-icons/fa";
import TextArea from "../components/Textarea";
import {useState} from 'react'

export const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    

`
const ContentWrapper = styled.div`
    display: grid;
    grid-template-rows: 5% 85% 10%;
    grid-template-columns: 50% 50%;
    border: 1px red solid;
    height: 1200px;

`
const Title = styled.div`
    grid-column: 1 / 3;
    grid-row: 1 / span 1;
    border: 1px solid green;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    vertical-align: center;
`
const InputWrapper = styled.div`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    border: 1px solid black;
    display: grid;
    grid-template-rows: 300px 200px 300px;
    height: 100%;

    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .imageWrapper{
            width: 100px;
            height: 100px;
            border-radius: 70%;
            overflow: hidden;
            margin-bottom: 1rem;
            .profileImage {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .middle{
        display: flex;
        flex-direction: column;
        justify-content: center;
    
    }
    .bottom{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

`
const InputWrapper2 =styled(InputWrapper)`
    grid-row: 2 / 3;
    grid-column: 2 / 2;
    border: 1px solid black;
    height: 100%;

    display: grid;
    grid-template-rows: 50% 50%;
    `
const InputWrapper3 =styled(InputWrapper)`
    grid-row: 3 / 3;
    grid-column: 1 / span 2;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center; 

`

const SubmitButton = styled.button`
    
    width: 300px;
    height: 80px;
    text-align: center;
    background-color: black;
    color: white;
    font-size: 2rem;
    font-weight: bold;

`
const CreateTherapist = styled.form`
    


`

const UserManagement = () =>{

    return (
        <>
        <PageWrapper>
        <Sidebar/>
            <CreateTherapist>
                <ContentWrapper>
                    <Title>상담사 등록</Title>
                    <InputWrapper>
                        <div className='top'>
                            <div className='imageWrapper'>
                                <FaUserCircle size={50} color='white' className='profileImage' />
                            </div>
                                <InputAdmin category='url' id="url" placeholder='이미지url'/>               
                        </div>
                        
                        <div className='middle'>
                            <InputAdmin category="name" id="name" placeholder='상담사 실명'/>
                            <InputAdmin category="birth" id='birth' placeholder='생년월일 8자리'/>
                            <InputAdmin type="text" id="학력" placeholder='대학 기입란'/>
                        </div>
                        <div className='bottom'>
                            <InputAdmin type="text" id="E-mail" placeholder='회원가입 이메일'/>
                            <InputAdmin category="password" id='password' placeholder='패스워드'/>
                            <InputAdmin category="passwordCheck" id='passwordCheck' placeholder='패스워드 재입력'/>
                        </div>
                    </InputWrapper>
                    <InputWrapper>
                    </InputWrapper>

                    <InputWrapper2>
                        <TextArea cols={30} rows={30} id='carrer' child="경력" placeholder="경력을 입력하세요"/>
                        <TextArea cols={30} rows={30} id='promote' child="소개" placeholder="소개글을 입력하세요"/>
                    </InputWrapper2>
                    <InputWrapper3>
                            <SubmitButton>보내기</SubmitButton>
                    </InputWrapper3>
                </ContentWrapper>
            </CreateTherapist>

        </PageWrapper>
        </>
    )
        

}



export default UserManagement;