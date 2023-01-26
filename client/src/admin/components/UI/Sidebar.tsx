import { SideMenu } from '../../route';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideBar = styled.div`
  a {
    padding: 15px 20px;
    display: block;
    display: flex;
    align-items: center;
    color: #333;
    width: 100%;
    gap: 12px;

    font-size: 1.45rem;
    font-weight: 700;
    &:hover {
      color: #2a8045;
    }

    &.active {
      background-color: #f1f2f3;
      color: #008446;
    }
  }
  &:hover {
    opacity: 80%;
  }
`;
const SideBarWrapper = styled.div`
  background-color: #ffffff;
  width: 240px;
  height: 100vh;
  border-right: 2px solid #cfcfcf;
  padding: 30px 0;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  max-width: 100%;
  padding: 0 20px 30px;
  border-bottom: 1px solid #cfcfcf;
`;

const Sidebar = () => {
  return (
    <SideBarWrapper>
      <Logo src='/teatime.png' alt='티타임' />
      {SideMenu.map((item, index) => {
        return (
          <SideBar key={index}>
            <NavLink to={item.path}>
              {item.icon}
              {item.name}
            </NavLink>
          </SideBar>
        );
      })}
    </SideBarWrapper>
  );
};
export default Sidebar;
