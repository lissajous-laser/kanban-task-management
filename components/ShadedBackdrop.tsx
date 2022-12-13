import { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`

export default function ShadedBackdrop({
  children,
  onClick
} : {
  children: ReactNode,
  onClick: MouseEventHandler<HTMLDivElement>
}) {

  return (
    <Container onClick={onClick}>
      {children}
    </Container>
  );
}