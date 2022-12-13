import styled from "styled-components";

export const MoreButton = styled.button`
  border: none;
  padding: 0 0.5rem;
  background-color:  ${(props) => props.theme.colors.main};
  height: 1.5rem;
  display: grid;
  place-items: center;

  &:hover {
    cursor: pointer;
  }
`