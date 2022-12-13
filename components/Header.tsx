import Image from 'next/image';
import { MouseEvent, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {jakartaSans} from '../lib/fonts';
import {State} from '../lib/types';
import addIcon from '../public/assets/icon-add-task-mobile.svg';
import smallLogo from '../public/assets/logo-mobile.svg';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import downArrow from '../public/assets/icon-chevron-down.svg';
import upArrow from '../public/assets/icon-chevron-up.svg';
import { toggleMenu } from '../redux/dropDownMenu';
import {addTask, deleteBoard, editBoard} from '../redux/modalWin';
import { device } from '../styles/breakpoints';
import { ButtonLg } from './ButtonLg';
import { Menu } from './Menu';
import { MenuOption } from './MenuOption';
import { MoreButton } from './MoreButton';
import { showSidebar } from '../redux/sidebarVis';

const Container = styled.header<{sidebarVis: boolean}>`
  width: calc(100vw - 18.75rem);
  height: 6.06rem;
  background-color: ${(props) => props.theme.colors.main};
  border-bottom: 0.06rem solid ${(props) => props.theme.colors.outline};
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 18.75rem;
  top: 0;

  @media screen and (${device.md}) {
    width: ${
      (props) => props.sidebarVis
      ? 'calc(100vw - 16.25rem)'
      : 'calc(100vw - 12.5rem)'
    };
    height: 5.06rem;
    left: ${(props) => props.sidebarVis ? '16.25rem' : '12.5rem'};
  }

  @media screen and (${device.sm}) {
    height: 4.0rem; 
    border-bottom: none;
    left: 0;
    width: 100%;
  }
`

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 2;
  width: calc(100% - 15.5rem);

  @media screen and (${device.sm}) {
    margin-left: 1.0rem;
    width: calc(100% - 7.33rem);
  }
`

const SmallLogo = styled(Image)`
  display: none;

  @media screen and (${device.sm}) {
    display: block;
  }
`

const BoardHeading = styled.h1`
  font-size: 1.5rem;
  height: 6.0rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  padding-top: 1.81rem;
  margin: 0 0 0 1.50rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media screen and (${device.md}) {
    font-size: 1.25rem;
    height: 5.0rem;
    padding-top: 1.75rem;
    padding-bottom: 1.75rem;
  }

  @media screen and (${device.sm}) {
    display: none;
  }
`

const BoardHeadingAsBtnTxt = styled(BoardHeading)`
  display: none;
  color: inherit;

  @media screen and (${device.sm}) {
    font-size: 1.13rem;
    height: 4.0rem;
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
    margin-left: 1.0rem;
    display: block;
  }

`

const ShowSidebarBtn = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.textPrimary};
  padding: 0;
  border: none;
  display: none;
  margin-left: 0;
  gap: 0.5rem;
  align-items: center;
  width: calc(100% - 2.5rem);

  @media screen and (${device.sm}) {
    display: flex;

  }

  &:hover {
    cursor: pointer;
    color: ${(props) => props.theme.colors.accent};
  }
`


const AddTaskAndMoreBtns = styled.div`
  padding-bottom: 0.5rem;
  height: 6.0rem;
  display: flex;
  align-items: center;
  gap: 1.0rem;
  margin-right: 1.50rem;

  @media screen and (${device.md}) {
    height: 5.0rem;
    padding-bottom: 0;
  }

  @media screen and (${device.sm}) {
    height: 4.0rem;
    gap: 0.5rem;
    margin-right: 1.02rem;
  }
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

  @media screen and (${device.sm}) {
    height: 2.0rem;
    width: 3.0rem;
    display: grid;
    place-items: center;
  }
`

const AddTaskBtnText = styled.div`
  display: block;
  margin: 0;

  @media screen and (${device.sm}) {
    display: none;
  }
`

const AddTaskBtnIcon = styled(Image)`
  display: none;

  @media screen and (${device.sm}) {
    display: block;
    height: auto;
    width: auto;
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
  const sidebarVis = useSelector((state: State) => state.sidebarVis);

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
    <Container
      className={jakartaSans.className}
      sidebarVis={sidebarVis}
    >
      <LeftGroup>
        <SmallLogo
          src={smallLogo}
          alt='Logo'
        />
        <BoardHeading>
          {currentBoard ? currentBoard.name : ''}
        </BoardHeading>
        <ShowSidebarBtn onClick={() => dispatch(showSidebar())}>
          <BoardHeadingAsBtnTxt>
            {currentBoard ? currentBoard.name : ''}
          </BoardHeadingAsBtnTxt>
          <Image
            src={sidebarVis ? upArrow : downArrow}
            alt='Show sidebar icon'
          />
        </ShowSidebarBtn>
      </LeftGroup>
      <AddTaskAndMoreBtns>
        <AddTaskBtn
          className={jakartaSans.className}
          onClick={addTaskHandler}
          enabled={boards.length > 0 && currentBoard && currentBoard.columns.length > 0}
        >
          <AddTaskBtnText>
            + Add New Task
          </AddTaskBtnText>

          <AddTaskBtnIcon
            src={addIcon}
            alt='Add task icon'
          />
        </AddTaskBtn>
        <MoreButton onClick={moreBtnClickHandler}>
          <Image
            src={moreIcon}
            alt='More icon'
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