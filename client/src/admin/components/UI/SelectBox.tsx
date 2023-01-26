import { Category } from '../../SelectOptions';
import styled from 'styled-components';

const CheckboxWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: whitesmoke;
  label {
  }
`;
type SelectBoxProps = {
  onChange?: any;
};

const SelectWrapper = styled.div`
  display: flex;

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  label {
    font-weight: 400;
  }
`;

const SelectBox = ({ onChange }: SelectBoxProps) => {
  return (
    <SelectWrapper>
      <strong className='inputlabel'>카테고리</strong>
      <SelectWrapper>
        {Category.map((item, idx) => (
          <div>
            <input
              type='checkbox'
              key={idx}
              value={item.name}
              id={item.id}
              onChange={onChange}
            ></input>
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        ))}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default SelectBox;
