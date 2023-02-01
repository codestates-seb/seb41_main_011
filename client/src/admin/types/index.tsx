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

export interface createProgramProps {
  title: string;
  content: string;
  image: string;
  userMax: number;
  dateStart: string;
  dateEnd: string;
  symptomTypes: string[];
  cost: number;
  counselorId: number;
}

export interface checklistProps {
  value?: string[];
  setValue: (value: string[]) => void;
}

export interface programListProps {
  programId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  userMax: number;
  userCount: number;
  counselorName: string;
}

export interface paymentListItemProps {
  memberId: number;
  memberName: string;
  payId: number;
  status: string;
  title: string;
  cost: number;
}
