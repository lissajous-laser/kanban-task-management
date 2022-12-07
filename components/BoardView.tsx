import styled from 'styled-components';
import {useSelector} from 'react-redux';
import TaskCard from './TaskCard';
import { jakartaSans } from '../lib/fonts';
import { use } from 'react';
import { Board, State } from '../lib/types';
import BoardColumn from './BoardColumn';
import AddColumn from './AddColumn';


// TODO:
// - has data about column of current board
// - has tasks of each item in board

const Container = styled.main`
  background-color: ${(props) => props.theme.colors.secondary};
  flex-grow: 1;
  width: 100%;
  display: flex;
  overflow: scroll;
`


export default function BoardView() {
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId)
  const currentBoard = boards.filter(
    (board) => board.id === currentBoardId
  )[0];

  return (
    <Container className={jakartaSans.className}>
      {currentBoard
        ? currentBoard.columns.map((column, idx) =>
          <BoardColumn key={column.id} idx={idx}/>
        )
        : null
      }
      <AddColumn/>
    </Container>
  );
}