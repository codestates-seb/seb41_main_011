import styled from 'styled-components';

const AcceptButton = styled.button`
  box-shadow: #af9a7052 0px 2px 4px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 3em;
  background-color: #f4e7a4;
  font-weight: 500;
  color: #535353;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #f2e293;
  }
`;

type ButtonAcceptProps = {
  children?: React.ReactNode;
  onClick?: any;
};

const ButtonAccept = ({ children, onClick }: ButtonAcceptProps) => {
  if (onClick === undefined) {
    return <AcceptButton>{children}</AcceptButton>;
  }
  return <AcceptButton onClick={onClick}>{children}</AcceptButton>;
};

export default ButtonAccept;
