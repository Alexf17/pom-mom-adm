import { StyledBtn } from './Button.styled';

const Button = ({ children, href, bgColor, width, onClick }) => (
  <StyledBtn href={href} bgColor={bgColor} width={width} onClick={onClick}>
    {children}
  </StyledBtn>
);

export default Button;
