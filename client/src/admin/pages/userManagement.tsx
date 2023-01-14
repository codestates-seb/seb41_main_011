import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import InputAdmin from "../components/Input";
import {FaUserCircle} from "react-icons/fa";
import TextArea from "../components/Textarea";
import React, {useState} from 'react'

interface CreateTherapist {
    url: string,
    name: string,
    college:string,
    email: string,
    password:string,
    career: string,
    promote:string
}

export const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    background-color: gray;
    

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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 30% 0;
    height: 100%;
    .top{

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    
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
        .urlInputWrapper{
            display: grid;
            width:70%;
            border: 1px solid red;
            grid-template-columns: 30% 70%;
        }
    }

    .middle{
        display: grid;
        width:70%;
        border: 1px solid red;
        grid-template-columns: 30% 70%;


    }
    .bottom{
        display: grid;
        width:70%;
        border: 1px solid red;
        grid-template-columns: 30% 70%;

    }

`
const InputWrapper2 =styled.div`
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    border: 1px solid blue;
    height: 100%;
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: 40% 40% 20%;
    .career{
        grid-row: 1 / 2;
        width:100%;
        height: 70%;
        border: 1px solid red;
    }
    .promote{
        grid-row: 2 / 3;
        height: 70%;
        width:100%;
        border: 1px solid red;
    }

    `
const InputWrapper3 =styled.div`
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
    const [url,setUrl] = useState<string>('');
    const [signupName,setSignupName] = useState<string>('');
    const [birth,setBirth] = useState<any>();
    const [college,setCollege] = useState<string>('');
    const [signupEmail,setSignupEmail] = useState<string>('');
    const [signupPassword,setSignupPassword] = useState<string>('');
    const [verifyPassword,setverifyPassword] = useState<string>('');
    const [career,setCareer] = useState<string>('');
    const [promote,setPromote] = useState<string>('');


    const handleUrlChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setUrl(target.value);
    }
    const handleSignupEmailChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setSignupEmail(target.value);
    }
    const handleSignupPasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupPassword(target.value);
    }
    const handleVerifyPasswordChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setverifyPassword(target.value);
    }
    const handleSignupNameChange = (e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setSignupName(target.value);
    }
    const handleBirthChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setBirth(target.value);
    }
    const handleCareerChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setCareer(target.value);
    }
    const handlePromoteChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setPromote(target.value);
    }
    const handleCollegeChange = (e: React.ChangeEvent) =>{
        const target = e.target as HTMLInputElement
        setCollege(target.value);
    }
    const handleAdmissionSubmit = (e:React.FormEvent) =>{
        e.preventDefault();
        console.log(signupEmail,signupPassword,verifyPassword,url,signupName,career,promote,college)
        const regexPassword = new RegExp(/^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,'g');
        const regexEmail = new RegExp(/^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,'g')
        //체크박스 체크 -> 체크박스 체크안되면 
        if(!regexEmail.test(signupEmail)){
            return console.log('올바른 이메일 형식이 아닙니다.')
        }
        if(!regexPassword.test(signupPassword)){
            return console.log('비밀번호 형식이 일치하지 않습니다.');
            // return window.alert('비밀번호가 형식이 일치하지 않습니다.')
        }else if(!(signupPassword === verifyPassword)){
            return console.log('비밀번호가 같지 않습니다.')
            // window.alert('비밀번호가 같지 않습니다.')
        }else{
              // axios
            }
    
    }

    return (
        <>
        <PageWrapper>
        <Sidebar/>
            <CreateTherapist onSubmit={handleAdmissionSubmit}>
                <ContentWrapper>
                    <Title>상담사 등록</Title>
                    <InputWrapper>
                        <div className='top'>
                            <div className='imageWrapper'>
                                <FaUserCircle size={50} color='white' className='profileImage' />
                            </div>
                            <div className='urlInputWrapper'>
                                <label htmlFor='url'>이미지 등록 url</label>
                                <InputAdmin category='url' id="url" placeholder='이미지url' value={url} onChange={handleUrlChange} name='url'/>               
                            </div>
                        </div>
                        
                        <div className='middle'>
                            <label htmlFor='name'>이름</label>
                            <InputAdmin category="name" id="name" placeholder='상담사 실명' value={signupName} onChange={handleSignupNameChange}/>
                            <label htmlFor='birth'>생일</label>
                            <InputAdmin category="birth" id='birth' placeholder='생년월일 8자리' value={birth} onChange={handleBirthChange}/>
                            <label htmlFor='학력'>학력</label>
                            <InputAdmin type="text" id="학력" placeholder='대학 기입란' value={college} onChange={handleCollegeChange}/>
                        </div>
                        <div className='bottom'>
                            <label htmlFor='E-mail'>이메일</label>
                            <InputAdmin type="text" id="E-mail" placeholder='회원가입 이메일' value={signupEmail} onChange={handleSignupEmailChange}/>
                            <label htmlFor='password'>비밀번호</label>
                            <InputAdmin category="password" id='password' placeholder='패스워드' value={signupPassword} onChange={handleSignupPasswordChange} />
                            <label htmlFor='passwordCheck'>비밀번호 확인</label>
                            <InputAdmin category="passwordCheck" id='passwordCheck' placeholder='패스워드 재입력' value={verifyPassword} onChange={handleVerifyPasswordChange}/>
                        </div>
                    </InputWrapper>
                    <InputWrapper2>
                        <TextArea cols={30} rows={15} id='carrer' child="경력" placeholder="경력을 입력하세요" value={career} className='career' onChange={handleCareerChange}/>
                        <TextArea cols={30} rows={15} id='promote' child="소개" placeholder="소개글을 입력하세요" value={promote} className='promote' onChange={handlePromoteChange}/>
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