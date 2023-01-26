export interface CategorysProps {
  name: string;
  id: string;
}

export const Category: CategorysProps[] = [
  {
    name: '스트레스',
    id: 'stress',
  },
  {
    name: '불안',
    id: 'anxiety',
  },
  {
    name: '우울',
    id: 'depression',
  },
  {
    name: '중독',
    id: 'addiction',
  },
];
