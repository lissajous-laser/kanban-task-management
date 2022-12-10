import styled from "styled-components";

export const ButtonLg = styled.button`
  width: 100%;
  height: 3.0rem;
  border: none;
  border-radius: 1.5rem;
  color: ${(props) => props.theme.colors.buttonPrimaryText};
  font-size: 0.94rem;
  font-weight: 700;
  padding: 0;

  &:hover {
    cursor: pointer;  
  }
`