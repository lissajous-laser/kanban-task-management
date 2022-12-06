import styled from "styled-components"

export const Menu = styled.ul`
  height: 5.88rem;
  width: 12.0rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  box-shadow: 0 0.1rem 0.5rem rgba(191, 191, 191, 0.3);
  margin-block-start: 0;
  margin-block-end: 0;
  list-style-type: none;
  font-size: 0.81rem;
  font-weight: 500;
  z-index: 1;

  &:hover {
    cursor: default;
  }
`