export const viewProgramDate = (start: string, end: string) => {
  const sdate = new Date(start);
  const edate = new Date(end);

  const year = sdate.getFullYear();
  const month =
    +(sdate.getMonth() + 1) < 10
      ? '0' + +(sdate.getMonth() + 1)
      : sdate.getMonth();
  const date = sdate.getDate() < 10 ? '0' + sdate.getDate() : sdate.getDate();

  const getHour = (date: Date) => {
    const ampm = date.getHours() < 12 ? '오전' : '오후';
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    return `${ampm} ${hour}`;
  };
  const shour = getHour(sdate);
  const smin =
    sdate.getMinutes() < 10 ? '0' + sdate.getMinutes() : sdate.getMinutes();

  const ehour = getHour(edate);
  const emin =
    edate.getMinutes() < 10 ? '0' + edate.getMinutes() : edate.getMinutes();

  return `${year}.${month}.${date} ${shour}:${smin} ~ ${ehour}:${emin}`;
};
export const viewCost = (cost: number) => {
  return cost.toLocaleString('ko-KR');
};
