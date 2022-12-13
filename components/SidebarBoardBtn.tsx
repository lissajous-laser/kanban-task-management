import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Board, State } from '../lib/types';
import boardIcon from '../public/assets/icon-board.svg';
import boardIconWhite from '../public/assets/icon-board-white.svg';
import { changeBoard } from '../redux/currentBoardId';
import style from '../styles/Sidebar.module.css';
import { jakartaSans } from '../lib/fonts';
import { SidebarBtn } from './SidebarBtn';

const BoardBtn = styled(SidebarBtn)<{isCurrentBoard: boolean}>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  background-color:  ${(props) =>
    props.isCurrentBoard
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
  color: ${(props) =>
    props.isCurrentBoard
    ? (props) => props.theme.colors.buttonPrimaryText
    : (props) => props.theme.colors.textSecondary
  };
  
  &:hover {
    cursor: pointer;
    background-color: ${(props) =>
      props.isCurrentBoard
      ? (props) => props.theme.colors.accent
      : (props) => props.theme.colors.buttonSecondaryBg
    };
    color: ${(props) =>
      props.isCurrentBoard
      ? (props) => props.theme.colors.buttonPrimaryText
      : (props) => props.theme.colors.accent
    };
  }

`

const Name = styled.div`
  font-size: 0.94rem;
  padding-right: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

`

export default function SidebarBoardBtn({board} : {board: Board}) {
  const currentBoard = useSelector((state: State) => state.currentBoardId);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(changeBoard(board.id));

  }

  return (
    <li>
      <BoardBtn
        isCurrentBoard={currentBoard === board.id}
        onClick={clickHandler}
        className={jakartaSans.className}
      >
        <Image
          className={style.boardIcon}
          src={currentBoard === board.id ? boardIconWhite : boardIcon}
          alt='Kanban board icon'
        />
        <Name>{board.name}</Name>
      </BoardBtn>
    </li>
  );
}