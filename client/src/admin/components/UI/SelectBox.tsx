import { Category } from '../../SelectOptions'
import styled from "styled-components";

const CheckboxWrapper = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: whitesmoke;
    label {

    }

`
type SelectBoxProps = {
  onChange?: any;
}



const SelectBox = ({onChange}: SelectBoxProps) =>{


  return (<CheckboxWrapper>
  
  {Category.map((item,idx)=> <div><label htmlFor={item.id}>{item.name}</label><input type='checkbox' key={idx} value={item.name} id={item.id} onChange={onChange}></input></div>)}
  </CheckboxWrapper>)

}
    

export default SelectBox;