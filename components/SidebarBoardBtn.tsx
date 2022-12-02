import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Board, State } from '../lib/types';
import boardIcon from '../public/assets/icon-board.svg';
import boardIconWhite from '../public/assets/icon-board-white.svg';
import { changeBoard } from '../redux/currentBoard';
import style from '../styles/Sidebar.module.css';

const BoardBtnWrapper = styled.div<{isCurrentBoard: boolean}>`
  height: 3.0rem;
  display: flex;
  align-items: center;
  width: 17.25rem;
  border-radius: 0 1.5rem 1.5rem 0;
  background-color:  ${(props) =>
    props.isCurrentBoard
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
  border-left: 2.0rem solid ${(props) =>
    props.isCurrentBoard
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
`

const BoardBtn = styled.button<{isCurrentBoard: boolean}>`
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
  border: none;
  font-size: 0.94rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 0;
  height: 2rem;
  width: 13.75rem;
  
  &:hover {
    cursor: pointer;
  }
`


export default function SidebarBoardBtn({board} : {board: Board}) {
  const currentBoard = useSelector((state: State) => state.currentBoard);
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(changeBoard(board.id))
  }

  return (
    <BoardBtnWrapper isCurrentBoard={currentBoard === board.id}>
      <BoardBtn
        isCurrentBoard={currentBoard === board.id}
        onClick={clickHandler}
      >
        <Image
          className={style.boardIcon}
          src={currentBoard === board.id ? boardIconWhite : boardIcon}
          alt='Kanban board icon'
        />
        <div>{board.name}</div>
      </BoardBtn>
    </BoardBtnWrapper>
  );
}