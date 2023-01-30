import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  border-radius: 12px;
  border: 1px solid #ddd;
  padding: 8px 16px;
  margin-top: 4px;
  resize: none;
  overflow: auto;
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
};

const InputTemp = ({
  type,
  value,
  id,
  placeholder,
  category,
  onChange,
}: InputTempProps) => {
  const handleInput = (e: any) => {
    const { value } = e.target;
    if (value.length >= 8) {
      e.preventDefault();
      return;
    }
  };

  {
    if (category === 'password') {
      return (
        <Input
          type='password'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          required
        ></Input>
      );
    }
    if (category === 'birth') {
      return (
        <InputNumber
          type='number'
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          pattern='\d*'
          onKeyDown={(e) =>
            ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
          }
          onKeyPress={handleInput}
          required
        ></InputNumber>
      );
    } else {
      return (
        <Input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder as string}
          required
        ></Input>
      );
    }
  }
};

export default InputTemp;
