import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {jakartaSans} from '../lib/fonts';
import {State} from '../lib/types';
import BoardColumn from './BoardColumn';
import AddColumn from './AddColumn';
import { ButtonLg } from './ButtonLg';
import { useDispatch } from 'react-redux';
import { editBoard } from '../redux/modalWin';
import { device } from '../styles/breakpoints';

const Container = styled.main<{isPopulated: boolean, sidebarVis: boolean}>`
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.textSecondary};
  font-weight: 700;
  font-size: 1.13rem;
  height: 100%;
  display: flex;
  justify-content: ${(props) => props.isPopulated ? 'left' : 'center'};
  align-items: ${(props) => props.isPopulated ? 'start' : 'center'};
  overflow-x: scroll;
  margin-left: ${(props) => props.sidebarVis ? '18.75rem' : '0'};
  padding-top: 6.06rem;

  @media only screen and (${device.md}) {
    margin-left: ${(props) => props.sidebarVis ? '16.25rem' : '0'};
    padding-top: 5.06rem;
  }

  @media screen and (${device.sm}) {
    margin-left: 0;
    padding-top: 4.0rem;
  }
`

const AddColumnPrompt = styled.p`
  margin: 0 1rem;
  text-align: center;
`

const AddColumnGivenEmptyBoard = styled(ButtonLg)`
  width: 10.88rem;
  background-color: ${(props) => props.theme.colors.accent};

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
  }

`

const CenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.0rem;
  justify-content: center;
  place-items: center;
`

export default function BoardView() {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId)
  const currentBoard = 
    boards.filter((board) => board.id === currentBoardId)[0];
  const sidebarVis = useSelector((state: State) => state.sidebarVis);

  const clickHandler = () => {
    if (boards.length > 0) {

      dispatch(editBoard({
        ...currentBoard,
        columns: [{id: Date.now(), name: '', tasks: []}]
      }));
    }
  }

  return (
    <Container
      className={jakartaSans.className}
      isPopulated={currentBoard && currentBoard.columns.length > 0}
      sidebarVis={sidebarVis}
    >
      {
        currentBoard && currentBoard.columns.length > 0
        ? <>
            {currentBoard.columns.map((column, idx) =>
              <BoardColumn key={column.id} idx={idx}/>
            )}
            <AddColumn/>
          </>
        : currentBoard
        ? <CenteredContent>
            <AddColumnPrompt>
              This board is empty. Create a new column to get started.
            </AddColumnPrompt>
            <AddColumnGivenEmptyBoard onClick={clickHandler}>
              + Add New Column
            </AddColumnGivenEmptyBoard>
          </CenteredContent>
        : null
      }
    </Container>
  );
}