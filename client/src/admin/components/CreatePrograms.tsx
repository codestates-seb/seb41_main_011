import React, {useState} from 'react'
import axios from 'axios';
import styled from "styled-components";
import InputAdmin from './UI/Input';
import TextArea from './UI/Textarea';
import SelectBox from './UI/SelectBox';
interface CreateProgram {
  id: string,
  startingtime:string,
  endtime: string,
  regularnumber:string,
  title: string,
  description:string,
  tag?: string,
  url: string,
}


const RowWrapper = styled.div`
  border: 1px solid blue;
  display: flex;
  flex-direction: column;
  width: 70vw;
  height: 50vh;
  justify-content: center;
  align-items: center;
`
const Row1 = styled.div`
  display: flex;
  border: 1px solid red;
  grid-column: 1 / 2;
  width: 100%;
  height: 5%;
  align-items: center;
  input{
    width: 10%;
    height: 30px;
  }
  label{
    margin-left: 5px;
    margin-right: 5px;
  }
`
const Row2 = styled.div`
  display: flex;
  align-items: center;
  label{
    margin-left: 5px;
    margin-right: 5px;
  }
  border: 1px solid red;
  width: 100%;
  height: 10%;
  input {
    width: 80%;
    height: 30px;
  }

`
const Row3 = styled.div`
  display: flex;
  width: 100%;
  height: 40%;
  margin-left: 5px;
  margin-right: 5px;
  align-items: center;
  border: 1px solid red;
  div {
    width: 70%;
  }

`
const Row4 = styled.div`
  display: flex;
  border: 1px solid red;
  width: 100%;
  height: 10%;
  input {
    width: 80%;
    height: 30px;
  }
  

`
const Row5 = styled.div`
  display: flex;
  border: 1px solid red;
  width: 100%;
  height: 10%;
  justify-content: flex-end;
  button{
    margin-right: 20px;

  }

`
const Button = styled.button`
  width: 100px;
  height: 80px;
  background-color: blue;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 12px;
`

const CreatePrograms = () =>{
  const [id,setId] = useState<string>('');
  const [startingtime,setStartingtime] = useState<string>('');
  const [endtime,setEndtime] = useState<string>('');
  const [title,setTitle] = useState<string>('');
  const [description,setDescription] = useState<string>('');
  const [tag,setTag] = useState<string>('');
  const [url,setUrl] = useState<string>('');
  const [regularnumber,setRegularnumber] = useState<any>();
  
  const handleTitleChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setTitle(target.value);
  }
  const handleDescriptionChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setDescription(target.value);
  }
  const handleTagChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setTag(target.value);
  }
  const handleUrlChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setUrl(target.value);
  }
  const handleTherapistChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setId(target.value);
  }
  const handleRegularnumberChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setRegularnumber(target.value);
  }
  const handleStartingtimeChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setStartingtime(target.value);
  }
  const handleEndtimeChange =(e: React.ChangeEvent) =>{
    const target = e.target as HTMLInputElement
    setEndtime(target.value);
  }
  const handleSubmit =(e:React.FormEvent) =>{
    e.preventDefault();
    const reqbody:CreateProgram = {
    id,
    startingtime,
    endtime,
    regularnumber,
    title,
    description,
    tag,
    url,
    }
    axios.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(reqbody))
    .then((res)=>console.log)
    .catch((err)=>console.log)
  }
  return (

    <form onSubmit={handleSubmit}>

        <RowWrapper>
          <Row1>
            <div>세션시간</div>
            <label htmlFor='startingtime'>시작일시</label>
            <InputAdmin type='time'  id='startingtime'/>
            <label htmlFor='endtime'>종료일시</label>
            <InputAdmin type='time' id='endtime'/>
            <label htmlFor='regularnumber'>정원</label>
            <InputAdmin type='number' id='regularnumber'/>
            <label htmlFor='therapist'>상담사</label>
            <InputAdmin type='text' id='therapist'/>
          </Row1>
          <Row2>
            <label htmlFor='title'>제목</label>
            <InputAdmin type='text' id='title' onChange={handleTitleChange}/>
          </Row2>
          <Row3>
            <TextArea id='description' cols={30} rows={15} child='설명' onChange={handleDescriptionChange} placeholder='프로그램 설명'/>
            <SelectBox></SelectBox>
          </Row3>
          <Row4>
            <label htmlFor='url'>이미지 url</label>
            <InputAdmin type='text'id='url' placeholder='url을 입력해주세요' onChange={handleUrlChange}/>
          </Row4>
          <Row5>
            <Button>등록</Button>
          </Row5>
        </RowWrapper>
    </form>
  )



}

export default CreatePrograms;