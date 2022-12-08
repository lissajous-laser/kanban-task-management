import styled from "styled-components";

export const TextInput = styled.input`
  height: 2.5rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 0.25rem;
  border: 0.06rem solid ${(props) => props.theme.colors.controlOutline};
  width: 100%;
  color: ${(props) => props.theme.colors.textPrimary};
  line-height: 1.44rem;
  font-size: 0.81rem;
  font-weight: 500;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.81rem;
  font-weight: 500;

  &::placeholder {
    color: ${(props) => props.theme.colors.textPlaceholder};
  }
`
