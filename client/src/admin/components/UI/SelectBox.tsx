import { Category } from '../../SelectOptions'

type SelectBoxProps = {
  onChange?: any;
  value?: any;
}



const SelectBox = ({onChange, value}: SelectBoxProps) =>{
  return (<div>
  
  {Category.map((item,idx)=> <div><label htmlFor={item.id}>{item.name}</label><input type='checkbox' key={idx} value={item.name} id={item.id} onChange={onChange}></input></div>)}
  </div>)

}
    

export default SelectBox;