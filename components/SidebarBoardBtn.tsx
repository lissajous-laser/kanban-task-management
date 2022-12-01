import Image from 'next/image';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Board, State } from '../lib/types';
import boardIcon from '../public/assets/icon-board.svg';
import style from '../styles/Sidebar.module.css';




export default function SidebarBoardBtn({board} : {board: Board}) {
  const currentBoard = useSelector((state: State) => state.currentBoard);


const BoardBtnWrapper = styled.div`
  height: 3.0rem;
  display: flex;
  align-items: center;
  width: 17.25rem;
  border-radius: 0 1.5rem 1.5rem 0;
  background-color:  ${
    currentBoard === board.id
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
  border-left: 2.0rem solid ${
    currentBoard === board.id
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
`

  const BoardBtn = styled.button`
    background-color:  ${
      currentBoard === board.id
      ? (props) => props.theme.colors.accent
      : (props) => props.theme.colors.main
    };
    color: ${
      currentBoard === board.id
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

  return (
    <BoardBtnWrapper>
      <BoardBtn>
        <Image
          className={style.boardIcon}
          src={boardIcon}
          alt='Kanban board icon'
        />
        <div>{board.name}</div>
      </BoardBtn>
    </BoardBtnWrapper>
  );
}