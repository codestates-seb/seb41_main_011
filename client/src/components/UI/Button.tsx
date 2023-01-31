import styled from 'styled-components';

interface ButtonProps {
  width: string;
  height: string;
  fontsize: string;
}

const Button = styled.button<ButtonProps>`
  background: #c4dcbf;
  border-radius: 12px;
  text-align: center;
  width: ${(props) => props.width || 'fit-content'};
  height: ${(props) => props.height || 'fit-contents'};
  line-height: ${(props) => props.height || 'inherit'};
  font-size: ${(props) => props.fontsize || 'inherit'};
  color: #333;
  border: 0;
  cursor: pointer;
  transition: all 0.2s;

  &:hover,
  &:active {
    background: #70846c;
    color: #fff;
  }

  @media screen and (min-width: 768px) {
    font-size: 1rem;
  }
`;

export default Button;
