import React, { useState } from 'react';
import styled from 'styled-components';


const Input = styled.input`
    width: 280px;
    height: 40px;
    border-radius: 12px;
    font-size: 1rem;
    border: 1px #DDDDDD solid;
`
const InputNumber = styled(Input)`
  ::-webkit-inner-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
  }
  ::-webkit-outer-spin-button{
  -webkit-appearance: none; 
  margin: 0; 
  }
`

type InputTempProps = {
  placeholder?: React.ReactNode;
  type?: string;
  category?: string;
  value?: string|number;
  onChange?: any;
  id?: string;
}

const InputTemp = ({type,value,id,placeholder,category,onChange}: InputTempProps) =>{

const handleInput = (e:any) => {
  const { value } = e.target;
  if (value.length >= 8) {
    e.preventDefault();
    return;
  }
};
  
    {
      if(category === 'password'){
        return (
              <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
        )
      }
      if(category === 'birth'){
        return (
          <InputNumber type='number' id={id} value={value} onChange={onChange} placeholder={placeholder as string} pattern="\d*" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} onKeyPress={handleInput} required></InputNumber>
          
        )
      }
      else{
        return <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
      }
  }
  


}

export default InputTemp;