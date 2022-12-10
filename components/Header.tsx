import Image from 'next/image';
import { MouseEvent } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {jakartaSans} from '../lib/fonts';
import {State} from '../lib/types';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import { toggleMenu } from '../redux/dropDownMenu';
import {addTask, deleteBoard, editBoard} from '../redux/modalWin';
import { ButtonLg } from './ButtonLg';
import { Menu } from './Menu';
import { MenuOption } from './MenuOption';
import { MoreButton } from './MoreButton';

const Container = styled.header`
  width: 100%;
  height: 6.06rem;
  background-color: ${(props) => props.theme.colors.main};
  border-bottom: 0.06rem solid ${(props) => props.theme.colors.outline};
  display: flex;
  justify-content: space-between;
  position: relative;
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
  margin-right: 2.02rem;
`

const AddTaskBtn = styled(ButtonLg)<{enabled: boolean}>`
  width: 10.25rem;
  background-color: ${
    (props) => props.enabled 
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.accentFaded
  };

  &:hover {
    background-color: ${
      (props) => props.enabled 
      ? (props) => props.theme.colors.accentHover
      : (props) => props.theme.colors.accentFaded};
  }
`

const PositionedMenu = styled(Menu)`
  right: 1.5rem;
  top: 5.63rem;
`

const EditBoardOption = styled(MenuOption)`
  color: ${(props) => props.theme.colors.textSecondary};
`

const DeleteBoardOption = styled(MenuOption)`
  color: ${(props) => props.theme.colors.danger};
`

export default function Header() {
  const dispatch = useDispatch();
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  const boards = useSelector((state: State) => state.boards);
  const dropDownMenu = useSelector((state: State) => state.dropDownMenu);
  const currentBoard = boards.filter((board) => board.id === currentBoardId)[0];

  const addTaskHandler = () => {
    if (currentBoard && currentBoard.columns.length > 0) {
        const newTask = {
        id: Date.now(),
        title: '',
        description: '',
        subtasks: [{id: Date.now(), title: '', isCompleted: false}]
      }

      dispatch(addTask(newTask))
    }
  };

  const moreBtnClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    dispatch(toggleMenu());
    event.stopPropagation();
  }

  const editBoardClickHandler = () => {
    if (boards.length > 0) {
      dispatch(editBoard(boards.filter(
        (board) => board.id === currentBoardId)[0])
      );
    }
  }

  const deleteBoardClickHandler = () => {
    if (boards.length > 0) {
      dispatch(deleteBoard(boards.filter(
        (board) => board.id === currentBoardId)[0])
      );
    }
  }

  return (
    <Container className={jakartaSans.className}>
      <BoardHeading>
        {currentBoard ? currentBoard.name : ''}
      </BoardHeading>
      <AddTaskAndMoreBtns>
        <AddTaskBtn
          className={jakartaSans.className}
          onClick={addTaskHandler}
          enabled={boards.length > 0 && currentBoard.columns.length > 0}
        >
          + Add New Task
        </AddTaskBtn>
        <MoreButton onClick={moreBtnClickHandler}>
          <Image
            src={moreIcon}
            alt='Vertical ellipsis icon'
          />
        </MoreButton>
      </AddTaskAndMoreBtns>
      {dropDownMenu &&
        <PositionedMenu>
          <EditBoardOption onClick={editBoardClickHandler}>
            Edit Board
          </EditBoardOption>
          <DeleteBoardOption onClick={deleteBoardClickHandler}>
            Delete Board
          </DeleteBoardOption>
        </PositionedMenu>
      }
    </Container>
  );
}