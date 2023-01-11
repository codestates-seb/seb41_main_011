import styled from 'styled-components';

const Contents = styled.div`
  width: 100%;
  padding: 16px 20px;
  overflow-x: auto;

  ul {
    width: max-content;
    gap: 8px;
    display: flex;
  }
  ul li {
    background: #d9d9d9;
    border-radius: 8px;
    font-weight: 500;
    text-align: center;
    width: fit-content;
    padding: 2px 12px;
    font-size: 1rem;
    color: #777;
    cursor: pointer;

    &.on {
      background: #e2d48a;
      color: #5b3e00;
      font-weight: 700;
      &:hover,
      &:active {
        background: #d6c87e;
        color: #5b3e00;
      }
    }

    &:hover,
    &:active {
      background: #ccc;
      color: #666;
    }
  }

  @media screen and (min-width: 768px) {
    width: 700px;
    margin: 0 auto;
    padding: 16px 0;
  }
`;

const ProgramFilter = () => {
  return (
    <Contents>
      <ul>
        <li className='on'>전체</li>
        <li>우울감</li>
        <li>감정기복</li>
        <li>불안</li>
        <li>수면장애</li>
        <li>트라우마</li>
      </ul>
    </Contents>
  );
};

export default ProgramFilter;
