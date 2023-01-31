export interface programListItemProps {
  programId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  symptomTypes: string[];
  counselorName: string;
}
export interface programListProps {
  data: programListItemProps[];
}
export interface programInfoProps {
  item: programListItemProps;
}
export interface programInfoItemProps {
  programId: number;
  title: string;
  content: string;
  userMax: number;
  userCount: number;
  cost: number;
  image: string;
  dateStart: string;
  dateEnd: string;
  symptomTypes: string[];
  counselorName: string;
  profile: string;
  introduce: string;
  expertiseField: string;
}
export interface programIdProps {
  id?: string;
}
export interface myProgramListItemProps {
  payId: number;
  memberId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  userMax: number;
  createdAt: string;
  counselorName: string;
  status: string;
}
export interface myProgramListProps {
  item: myProgramListItemProps;
}
export interface myProgramInfoItemProps {
  payId: number;
  createdAt: string;
  status: string;
  programId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  userMax: number;
  cost: number;
  zoomLink: string;
  announce: string;
  counselorName: string;
}
export interface therapistProgramListItemProps {
  programId: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  userMax: number;
  userCount: number;
}
export interface therapistProgramListProps {
  item: therapistProgramListItemProps;
}
export interface memberInPayListItemProps {
  nickName: string;
  birth: string | null;
}
export interface memberInPayListProps {
  data: memberInPayListItemProps[];
}
export interface paginationProps {
  totalPage: number;
  limit: number;
  page: number;
  setPage: (value: number) => void;
}
