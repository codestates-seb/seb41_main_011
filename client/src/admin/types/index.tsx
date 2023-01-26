export interface modalCloseProps {
  id?: number;
  name?: string;
  close: () => void;
}

export interface paginationProps {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
}

export interface userListProps {
  memberId: number;
  memberName: string;
  nickName: string;
  birth: string;
  role: string;
}

export interface userProgramListProps {
  payId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  counselorName: string;
  userMax: number;
}

export interface therapistListProps {
  counselorId: number;
  counselorName: string;
}

export interface therapistProgramListProps {
  programId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  userCount: number;
  userMax: number;
}
