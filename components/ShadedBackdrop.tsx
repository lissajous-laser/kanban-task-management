import { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { device } from '../styles/breakpoints';


const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;

  @media screen and (${device.sm}) {
    height: auto;
    min-height: 100%;
  }

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