import {useDispatch} from 'react-redux';
import styled from 'styled-components';
import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import { jakartaSans } from '../../lib/fonts';
import ShadedBackdrop from '../ShadedBackdrop';
import { closeModalWin } from '../../redux/modalWin';

const Container = styled.div`
  width: 30rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.38rem;
  background-color: ${(props) => props.theme.colors.main};
`

const Content = styled.section`
  width: 25.98rem;
  margin: 2.0rem auto;
`


export default function ModalWinBackdropAndContainer({
  children,
  containerClickHandler // Closes menu
} : {
  children: ReactNode,
  containerClickHandler?: Dispatch<SetStateAction<boolean>>
}) {
  const dispatch = useDispatch();

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (containerClickHandler) {
      containerClickHandler(false);
    }
    e.stopPropagation();
  }

  return(
    <ShadedBackdrop onClick={() => dispatch(closeModalWin())}>
      <Container onClick={onClickHandler}>
        <Content className={jakartaSans.className}>
          {children}
        </Content>
      </Container>
    </ShadedBackdrop>
  );
}
