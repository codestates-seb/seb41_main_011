import {FaUserAlt, FaRegCalendarAlt, FaDonate, FaHome} from "react-icons/fa";
import {RiAdminFill} from "react-icons/ri"

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
    {
        path: '/admin/editInfo',
        name: '마이페이지',
        icon: <RiAdminFill />,
    },
    {
        path: '/',
        name: '홈페이지 가기',
        icon: <FaHome />,
    },

]