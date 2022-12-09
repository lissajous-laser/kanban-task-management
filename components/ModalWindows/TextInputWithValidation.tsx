import styled from "styled-components";
import { TextInput } from "./TextInput";

export const TextInputWithValidation = styled(TextInput)<{isValidInput: boolean}>`
  border-color: ${
    (props) => props.isValidInput
    ? (props) => props.theme.colors.controlOutline
    : (props) => props.theme.colors.danger
  };  
`