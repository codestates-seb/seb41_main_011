import styled from 'styled-components';

const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  label {
  }
`;
const CustomTa = styled.textarea`
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
type TaProps = {
  placeholder?: string;
  value?: string | number;
  onChange?: any;
  id?: string;
  cols?: number;
  rows?: number;
  child?: string;
  className?: string;
};
const TextArea = ({
  placeholder,
  value,
  onChange,
  id,
  cols,
  rows,
  child,
  className,
}: TaProps) => {
  return (
    <TextAreaWrapper>
      <label htmlFor={id}>{child}</label>
      <CustomTa
        id={id}
        cols={cols}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={className}
        required
      ></CustomTa>
    </TextAreaWrapper>
  );
};

export default TextArea;
