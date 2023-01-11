import React, { useState } from 'react';
import styled from 'styled-components';


const Input = styled.input`
    width: 280px;
    height: 40px;
    border-radius: 12px;
    font-size: 1rem;
    border: 1px #DDDDDD solid;
`

type InputTempProps = {
  placeholder?: React.ReactNode;
  type?: string;
  category?: string;
  value?: string;
  onChange?: any;
  id?: string;
}

const InputTemp = ({type,value,id,placeholder,category,onChange}: InputTempProps) =>{

  
    {
      if(category === 'password'){
        return (
              <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
        )
      }else{
        return <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder as string}required></Input>
      }
  }
  


}

export default InputTemp;