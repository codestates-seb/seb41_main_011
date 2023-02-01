const getHour = (date: Date) => {
  const ampm = date.getHours() < 12 ? '오전' : '오후';
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  return `${ampm} ${hour}`;
};

export const viewProgramDate = (start: string, end: string) => {
  const sDate = new Date(start);
  const eDate = new Date(end);

  const year = sDate.getFullYear();
  const month =
    +(sDate.getMonth() + 1) < 10
      ? '0' + +(sDate.getMonth() + 1)
      : sDate.getMonth() + 1;
  const date = sDate.getDate() < 10 ? '0' + sDate.getDate() : sDate.getDate();

  const sHour = getHour(sDate);
  const sMin =
    sDate.getMinutes() < 10 ? '0' + sDate.getMinutes() : sDate.getMinutes();

  const eHour = getHour(eDate);
  const eMin =
    eDate.getMinutes() < 10 ? '0' + eDate.getMinutes() : eDate.getMinutes();

  return `${year}.${month}.${date} ${sHour}:${sMin} ~ ${eHour}:${eMin}`;
};

export const viewCost = (cost: number) => {
  return cost.toLocaleString('ko-KR');
};

export const viewBookDate = (bookdate: string) => {
  const bookDate = new Date(bookdate);

  const year = bookDate.getFullYear();
  const month =
    +(bookDate.getMonth() + 1) < 10
      ? '0' + +(bookDate.getMonth() + 1)
      : bookDate.getMonth() + 1;
  const date =
    bookDate.getDate() < 10 ? '0' + bookDate.getDate() : bookDate.getDate();
  const hour = getHour(bookDate);
  const min =
    bookDate.getMinutes() < 10
      ? '0' + bookDate.getMinutes()
      : bookDate.getMinutes();

  return `${year}.${month}.${date} ${hour}:${min}`;
};

export const calculateStatus = (
  bookstatus: string,
  start: string,
  end: string,
) => {
  if (bookstatus === '취소 대기중') {
    return '취소 신청';
  }
  if (bookstatus === '결제 취소') {
    return '결제 취소';
  }

  const now = new Date();
  const sDate = new Date(start);
  const eDate = new Date(end);

  if (now < sDate) {
    return '진행 예정';
  } else if (now > eDate) {
    return '완료';
  } else {
    return '진행 중';
  }
};
export const viewBoardCategory = (kind: string) => {
  return kind === 'REVIEW' ? '후기' : '일반';
};
