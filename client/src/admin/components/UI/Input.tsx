import styled from "styled-components"


const Input = styled.input`
    /* width: 250px;
    height: 40px; */
    border-radius: 10px;
    font-size: 1rem;
    border: 1px #DDDDDD solid;
    margin-bottom: 10px;
    padding-left: 1%;
`
const InputName = styled(Input)`
    


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
    name?: string;
    onClick?: any;

}





const InputAdmin = ({type,value,id,placeholder,category,onChange,name,onClick}: InputTempProps) =>{

        const handleInput = (e:any) => {
            const { value } = e.target;
            if (value.length >= 8) {
                e.preventDefault();
                return;
            }
        };
    
        
        if(category === 'password'){
            return (
                <>
                    <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} name={name} required></Input>
                </>
            )
        }
        if(category === 'passwordCheck'){
            return (
                <>
                    <Input type='password' id={id} value={value} onChange={onChange} placeholder={placeholder as string} name={name} required></Input>
                </>
                )
        }
        if(category === 'birth'){
            return (
            <>
                <InputNumber type='number' id={id} value={value} onChange={onChange} placeholder={placeholder as string} name={name}  pattern="\d*" onKeyDown={(e) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()} onKeyPress={handleInput} required></InputNumber>
            </>
            
            )
        }
        if(category === 'name'){
            return (
                <>
                    <InputName type='text' id={id} value={value} onChange={onChange} placeholder={placeholder as string}  name={name}  required></InputName>
                </>
        
            )
        }
        else{
            return(
                <>
                    <Input type={type} id={id} value={value} onChange={onChange} placeholder={placeholder as string}name={name} onClick={onClick} required></Input>
                </>

            ) 
        
        }
    
    


}






export default InputAdmin