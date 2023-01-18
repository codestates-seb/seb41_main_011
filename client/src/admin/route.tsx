import {FaUserAlt,FaRegCalendarAlt,FaDonate} from "react-icons/fa";

export interface MenuItemsProps {
    path: string,
    name: string,
    icon: any
}

export const SideMenu: MenuItemsProps[] = [
    {
        path: '/userManagement',
        name: '회원 관리',
        icon: <FaUserAlt/>,
    },
    {
        path: '/programsManagement',
        name: '프로그램 관리',
        icon: <FaRegCalendarAlt/>,
    },
    {
        path: '/paymentManagement',
        name: '결제 관리',
        icon: <FaDonate />,
    },
    


]