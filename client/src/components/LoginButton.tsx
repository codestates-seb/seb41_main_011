import styled from 'styled-components';

const ButtonLogin = styled.button`
  box-shadow: #af9a7052 0px 2px 4px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 50px;
  background-color: #d5e6cf;
  font-weight: 500;
  color: #535353;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #70846c;
    color: #fff;
  }
`;

type LoginButtonProps = {
  children?: React.ReactNode;
  onClick?: any;
};

const LoginButton = ({ children, onClick }: LoginButtonProps) => {
  if (onClick === undefined) {
    return <ButtonLogin>{children}</ButtonLogin>;
  }
  return <ButtonLogin onClick={onClick}>{children}</ButtonLogin>;
};

export default LoginButton;
