import Image from 'next/image';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {jakartaSans} from '../lib/fonts';
import {State} from '../lib/types';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import {addTask} from '../redux/modalWin';
import style from '../styles/Header.module.css';
import { MoreButton } from './MoreButton';

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

const AddTaskAndMoreBtns = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 12.04rem;
  /* gap: 1.5rem; */
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
  padding: 0;
  background-color:  ${(props) => props.theme.colors.main};
  width: 1rem;
  display: grid;
  place-items: center;

  &:hover {
    cursor: pointer;
  }
`

export default function Header() {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: State) => state.currentBoardId);
  const boards = useSelector((state: State) => state.boards);

  const addTaskHandler = () => {
    dispatch(addTask({
      id: Date.now(),
      title: '',
      description: '',
      subtasks: [{id: Date.now(),title: '', isCompleted: false}]
    }))
  };

  return (
    <Container className={jakartaSans.className}>
      <BoardHeading>
        {boards.filter((board) => board.id === currentBoard)[0].name}
      </BoardHeading>
      <AddTaskAndMoreBtns>
        <AddTaskBtn
          className={jakartaSans.className}
          onClick={addTaskHandler}          
        >
          + Add New Task
        </AddTaskBtn>
        <MoreButton>
          <Image
            className={style.moreIcon}
            src={moreIcon}
            alt='Vertical ellipsis icon'
          />
        </MoreButton>
      </AddTaskAndMoreBtns>
    </Container>
  );
}