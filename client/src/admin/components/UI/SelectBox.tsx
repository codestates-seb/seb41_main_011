import { Category } from '../../SelectOptions';
import styled from 'styled-components';
import { useState, ChangeEvent, useEffect } from 'react';
import { checklistProps } from '../../types';

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

const SelectBox = (props: checklistProps) => {
  const { value } = props;
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (value) {
      setCheckedList(value);
    }
  }, [value]);
  useEffect(() => {
    props.setValue(checkedList);
  }, [checkedList]);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    } else {
      return;
    }
  };
  const checkHandler = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, event.target.checked);
  };

  return (
    <SelectWrapper>
      <strong className='inputlabel'>카테고리</strong>
      <SelectWrapper>
        {Category.map((item) => (
          <div key={item.id}>
            <input
              type='checkbox'
              value={item.name}
              id={item.id}
              checked={checkedList.includes(item.name)}
              onChange={(event) => checkHandler(event, item.name)}
            ></input>
            <label htmlFor={item.id}>{item.name}</label>
          </div>
        ))}
      </SelectWrapper>
    </SelectWrapper>
  );
};

export default SelectBox;
