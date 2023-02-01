import styled from 'styled-components';
import { useEffect, useState } from 'react';

const Input = styled.input`
  /* width: 250px;
    height: 40px; */
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 6px 12px;
  ::placeholder {
    color: #828282;
    font-size: 0.85rem;
  }
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    outline: none;
  }
`;
const InputName = styled(Input)``;
const InputNumber = styled(Input)`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

type InputTempProps = {
  placeholder?: React.ReactNode;
  type?: string;
  category?: string;
  value?: string | number;
  onChange?: any;
  id?: string;
  name?: string;
  onClick?: any;
};

const InputAdmin = ({
  type,
  value,
  id,
  placeholder,
  category,
  onChange,
  name,
  onClick,
}: InputTempProps) => {
  const [startingTime, setStartingTime] = useState<any>('');
  const getTime = () => {
    const startTime = new Date().toISOString();
    setStartingTime(startTime);
    console.log(startTime);
  };

  const handleInput = (e: any) => {
    const { value } = e.target;
    if (value.length >= 8) {
      e.preventDefault();
      return;
    }
  };

  if (category === 'password') {
    return (
      <>
        <Input
          type='password'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          required
        ></Input>
      </>
    );
  }
  if (category === 'passwordCheck') {
    return (
      <>
        <Input
          type='password'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          required
        ></Input>
      </>
    );
  }
  if (category === 'birth') {
    return (
      <>
        <InputNumber
          type='number'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          pattern='\d*'
          onKeyDown={(e) =>
            ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
          }
          onKeyPress={handleInput}
          required
        ></InputNumber>
      </>
    );
  }
  if (category === 'name') {
    return (
      <>
        <InputName
          type='text'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          required
        ></InputName>
      </>
    );
  }
  if (category === 'date') {
    return (
      <>
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          onClick={onClick}
          min='2023-01-20T15:43'
          required
        ></Input>
      </>
    );
  } else {
    return (
      <>
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          name={name}
          onClick={onClick}
          required
        ></Input>
      </>
    );
  }
};

export default InputAdmin;
