import styled from "styled-components";

const TextAreaWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    label {
    
    
    }

`
const CustomTa = styled.textarea`
    width: 100%;
    height: 100%;
`
type TaProps = {
    placeholder?: string;
    value?: string|number;
    onChange?: any;
    id?: string;
    cols?: number;
    rows?: number;
    child?: string;
    className?: string;
}
const TextArea = ({placeholder,value,onChange,id,cols,rows,child,className}:TaProps)=>{

    return (
        <TextAreaWrapper>
            <label htmlFor={id}>{child}</label>
            <CustomTa id={id} cols={cols} rows={rows} placeholder={placeholder} onChange={onChange} value={value} className={className} required></CustomTa>
        </TextAreaWrapper>
    )


}


export default TextArea