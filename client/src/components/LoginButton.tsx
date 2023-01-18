import styled from 'styled-components';

const ButtonLogin = styled.button`
    width: 80vw;
    height: 40px;
    border-radius: 12px;
    font-size: 1.25rem;
    text-align: center;
    background-color: #D5E6CF;
    border: none;
    box-shadow: #af9a7052 0px 3px 8px;
    &:hover{
      background-color: #70846C;
    }
    @media screen and (min-width: 768px) {
      width: 600px;
    }
`

type LoginButtonProps ={
  children?: React.ReactNode;
  onClick?: any;
}

const LoginButton = ({children, onClick}: LoginButtonProps) =>{
  if(onClick === undefined){
    return <ButtonLogin >{children}</ButtonLogin>
  }
  return <ButtonLogin onClick={onClick}>{children}</ButtonLogin>
  
}

export default LoginButton;