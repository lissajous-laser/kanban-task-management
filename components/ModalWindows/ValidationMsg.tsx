import styled from "styled-components";

const Message = styled.p`
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  margin: 0;
  color: ${(props) => props.theme.colors.danger};
  font-size: 0.81rem;
  font-weight: 500;
  line-height: 1.44rem;
`

export default function ValidationMsg() {
  return (
    <Message>Can&apos;t be empty</Message>
  );
} 