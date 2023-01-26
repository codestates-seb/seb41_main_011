export interface modalCloseProps {
  memberId?: number;
  nickName?: string;
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
