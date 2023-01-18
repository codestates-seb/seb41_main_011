import { Category } from '../../SelectOptions'
import styled from 'styled-components'

type SelectBoxProps = {
  onChange?: any;
  value?: any;
}

const SelectWrapper = styled.div`
  display: flex;
  gap: 15px;
`





const SelectBox = ({onChange, value}: SelectBoxProps) =>{
  return (
  <div>
    카테고리
    <SelectWrapper>
    {Category.map((item,idx)=> <a><input type='checkbox' key={idx} value={item.name} id={item.id} onChange={onChange}></input><label htmlFor={item.id}>{item.name}</label></a>)}
    </SelectWrapper>
  </div>
)

}
    

export default SelectBox;