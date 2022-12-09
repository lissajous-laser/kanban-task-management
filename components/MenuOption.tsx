import styled from "styled-components";

export const MenuOption = styled.li`
  height: 2.5rem;
  width: 100%;
  line-height: 1.44rem;
  text-align: left;
  display: flex;
  align-items: center;
  padding: 0 1rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.accentFaded}
  }
`
