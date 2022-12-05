import {useDispatch} from 'react-redux';
import {closeModalWin} from '../../redux/modalWin';
import styled from 'styled-components';
import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import { jakartaSans } from '../../lib/fonts';


const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

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
    <Backdrop onClick={() => dispatch(closeModalWin())}>
      <Container onClick={onClickHandler}>
        <Content className={jakartaSans.className}>
          {children}
        </Content>
      </Container>
    </Backdrop>
  );
}