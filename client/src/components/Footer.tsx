import styled from 'styled-components';

const StyledFooter = styled.footer`
  display: none;

  @media screen and (min-width: 768px) {
    display: block;
    padding: 20px 0;
    color: #828282;
  }
`;

const Footer = () => {
  return <StyledFooter>© 2023 Team Woori</StyledFooter>;
};

export default Footer;
