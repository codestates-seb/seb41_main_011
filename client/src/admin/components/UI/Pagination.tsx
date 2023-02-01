import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { paginationProps } from '../../types';

const PaginationWrapper = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.11) 0px 3px 8px;
  width: fit-content;
  margin: 0 auto;
  button {
    color: black;
    float: left;
    padding: 8px 16px;
    text-decoration: none;
    background-color: white;
    border: 0;
    cursor: pointer;
    :hover {
      background-color: #009779;
      color: white;
    }
  }
  button.page {
    background-color: #009779;
    color: white;
  }
  button:disabled {
    color: #999;
    cursor: default;
    :hover {
      background-color: white;
      color: #999;
    }
  }
`;

const Pagination = (props: paginationProps) => {
  // 총 페이지 갯수에 따라 Pagination 갯수 정하기, limit 단위로 페이지 리스트 넘기기
  const { totalPage, limit, page, setPage } = props;
  const [currentPageArray, setCurrentPageArray] = useState<any[]>([]);
  const [totalPageArray, setTotalPageArray] = useState<any[]>([]);

  // 특정 숫자까지의 배열을 만들고 limit 기준으로 자른 배열 만들기
  const sliceArrayByLimit = (totalPage: number, limit: number) => {
    const totalPageArray = Array.from({ length: totalPage }, (_, i) => i);
    return Array.from({ length: Math.ceil(totalPage / limit) }, () =>
      totalPageArray.splice(0, limit),
    );
  };

  useEffect(() => {
    if (page % limit === 1) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit)]);
    } else if (page % limit === 0) {
      setCurrentPageArray(totalPageArray[Math.floor(page / limit) - 1]);
    }
  }, [limit, page, totalPageArray]);

  useEffect(() => {
    const slicedPageArray = sliceArrayByLimit(totalPage, limit);
    setTotalPageArray(slicedPageArray);
    setCurrentPageArray(slicedPageArray[0]);
  }, [limit, totalPage]);

  return (
    <PaginationWrapper>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        &laquo;
      </button>
      {currentPageArray?.map((i) => (
        <button
          key={i + 1}
          onClick={() => setPage(i + 1)}
          className={page === i + 1 ? 'page' : ''}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setPage(page + 1)} disabled={page === totalPage}>
        &raquo;
      </button>
    </PaginationWrapper>
  );
};

export default Pagination;
