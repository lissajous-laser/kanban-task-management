import { current } from '@reduxjs/toolkit';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { jakartaSans } from '../lib/fonts';
import { State } from '../lib/types';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import style from '../styles/Header.module.css';

// TODO:
// - heading name uses state of current board

const Container = styled.header`
  width: 100%;
  height: 6.06rem;
  background-color: ${(props) => props.theme.colors.main};
  border-bottom: 0.06rem solid ${(props) => props.theme.colors.outline};
  display: flex;
  justify-content: space-between;
`

const BoardHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-left: 1.50rem;
  margin-top: 1.81rem;
`

const AndTaskAndMoreBtns = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-right: 2.02rem;
`

const AddTaskBtn = styled.button`
  width: 10.25rem;
  height: 3.0rem;
  border: none;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.buttonPrimaryText};
  font-size: 0.94rem;
  font-weight: 700;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`

const MoreBtn = styled.button`
  border: none;
  background-color:  ${(props) => props.theme.colors.main};
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`

export default function Header() {
  const currentBoard = useSelector((state: State) => state.currentBoardId)
  const boards = useSelector((state: State) => state.boards)

  return (
    <Container className={jakartaSans.className}>
      <BoardHeading>
        {boards.filter((board) => board.id === currentBoard)[0].name}
      </BoardHeading>
      <AndTaskAndMoreBtns>
        <AddTaskBtn className={jakartaSans.className}>
          + Add New Task
        </AddTaskBtn>
        <MoreBtn>
          <Image className={style.moreIcon} src={moreIcon} alt='Vertical ellipsis icon'/>
        </MoreBtn>
      </AndTaskAndMoreBtns>
    </Container>
  );
}