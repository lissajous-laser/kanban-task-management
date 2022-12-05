import styled from "styled-components";

export const MoreButton = styled.button`
  border: none;
  padding: 0;
  background-color:  ${(props) => props.theme.colors.main};
  width: 1rem;
  display: grid;
  place-items: center;
  position: relative;
  left: 0.34rem;

  &:hover {
    cursor: pointer;
  }
`