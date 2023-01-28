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
