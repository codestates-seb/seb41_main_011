import styled from 'styled-components';


const AcceptButton = styled.button`
    width: 280px;
    height: 40px;
    border-radius: 12px;
    font-size: 1.25rem;
    text-align: center;
    background-color: #F4E7A4;
    border: none;
`

type ButtonAcceptProps ={
  children?: React.ReactNode;
  onClick?: any;
}

const ButtonAccept = ({children, onClick}: ButtonAcceptProps) =>{
  if(onClick === undefined){
    return <AcceptButton >{children}</AcceptButton>
  }
  return <AcceptButton onClick={onClick}>{children}</AcceptButton>
  
}

export default ButtonAccept;