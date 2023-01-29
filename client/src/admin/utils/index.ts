export const viewProgramDate = (start: string, end: string) => {
  const sdate = new Date(start);
  const edate = new Date(end);

  const year = sdate.getFullYear();
  const month =
    +(sdate.getMonth() + 1) < 10
      ? '0' + +(sdate.getMonth() + 1)
      : sdate.getMonth();
  const date = sdate.getDate() < 10 ? '0' + sdate.getDate() : sdate.getDate();
  const shour =
    sdate.getHours() < 10 ? '0' + sdate.getHours() : sdate.getHours();
  const smin =
    sdate.getMinutes() < 10 ? '0' + sdate.getMinutes() : sdate.getMinutes();
  const ehour =
    edate.getHours() < 10 ? '0' + edate.getHours() : edate.getHours();
  const emin =
    edate.getMinutes() < 10 ? '0' + edate.getMinutes() : edate.getMinutes();

  return `${year}.${month}.${date} ${shour}:${smin} ~ ${ehour}:${emin}`;
};

export const viewCost = (cost: number) => {
  return cost.toLocaleString('ko-KR');
};
