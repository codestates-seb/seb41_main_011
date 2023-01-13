import styled from "styled-components"


const Input = styled.input`
    width: 250px;
    height: 40px;
    border-radius: 10px;
    font-size: 1rem;
    border: 1px #DDDDDD solid;
    margin-bottom: 10px;
    padding-left: 5%;
    padding-right: 5%
`
const InputName = styled(Input)`
    
    width: 150px;


`
const InputNumber = styled(Input)`
    width: 150px;

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





const InputAdmin = ({type,value,id,placeholder,category,onChange}: InputTempProps) =>{

        const handleInput = (e:any) => {
            const { value } = e.target;
            if (value.length >= 8) {
                e.preventDefault();
                return;
            }
        };
    
        
        if(category === 'password'){
            return (
                <label htmlFor={id}>비밀번호
                    <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
                </label>
            )
        }
        if(category === 'passwordCheck'){
            return (
                <label htmlFor={id}>비밀번호 확인
                    <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
                </label>
                )
        }
        if(category === 'birth'){
            return (
            <label htmlFor={id}>나이
                <InputNumber type='number' id={id} value={value} onChange={onChange} placeholder={placeholder as string} pattern="\d*" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} onKeyPress={handleInput} required></InputNumber>
            </label>
            
            )
        }
        if(category === 'name'){
            return (
            <label htmlFor={id}>이름
            <InputName type='text' id={id} value={value} onChange={onChange} placeholder={placeholder as string}  required></InputName>
            </label>
        
            )
        }
        else{
            return <label htmlFor={id}>{id}
                <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder as string} required></Input>
            </label>
        
        }
    
    


}






export default InputAdmin