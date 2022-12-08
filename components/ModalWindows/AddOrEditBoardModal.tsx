import { current } from '@reduxjs/toolkit';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import { jakartaSans } from '../../lib/fonts';
import { Board, State, TaskAction } from '../../lib/types';
import { addBoard, closeModalWin, editBoard } from '../../redux/modalWin';
import { addBoard as addBoardToBoards, editBoard as editBoardToBoards } from '../../redux/boards';
import { Button } from './Button';
import InputAndDeleteCombo from './InputAndDeleteCombo';
import ModalWinBackdropAndContainer from './ModalWinBackdropAndContainer';
import { Subheading } from './Subheading';
import { TextInput } from './TextInput';
import { Title } from './Title';

const ColumnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const AddColumnButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.buttonSecondaryBg};
  color: ${(props) => props.theme.colors.accent};
`

const SubmitButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.buttonPrimaryText};
`

export default function AddOrEditBoardModal() {
  const dispatch = useDispatch();
  const modalWinAction = useSelector((state: State) => state.modalWin);
  const board = modalWinAction.data as Board;
  const mode = modalWinAction.mode;

  const nameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changedBoard = {
      ...board,
      name: event.target.value
    };
    dispatchByMode(changedBoard);
  }

  const addColumnClickHandler = () => {
    const changedBoard = {
      ...board,
      columns: [
        ...board.columns,
        {id: Date.now(), name: '', tasks: []}
      ]
    }
    dispatchByMode(changedBoard);
  }

  const dispatchByMode = (changedBoard: Board) => {
    switch (mode) {
      case 'add':
        dispatch(addBoard(changedBoard));
        break;
      case 'edit':
        dispatch(editBoard(changedBoard));
        break;

    }
  }  

  const submitClickHandler = () => {
    switch (mode) {
      case 'add':
        dispatch(addBoardToBoards(board));
        break;
      case 'edit':
        dispatch(editBoardToBoards(board));
        break;
    }
    dispatch(closeModalWin());
  }

  return (
    <ModalWinBackdropAndContainer>
      <Title>
        {mode === 'add' ? 'Add New' : 'Edit'} Board
      </Title>
      <Subheading>Board Name</Subheading>
      <TextInput
        className={jakartaSans.className}
        onChange={nameInputHandler}
        value={board.name}
      />
      <Subheading>Board Columns</Subheading>
      <ColumnsContainer>
        {board.columns.map((column) =>
          <InputAndDeleteCombo
            board={board}
            column={column}
            key={column.id}
          />
        )}
      </ColumnsContainer>
      <AddColumnButton
        className={jakartaSans.className}
        onClick={addColumnClickHandler}
      >
        + Add New Column
      </AddColumnButton>
      <SubmitButton
        className={jakartaSans.className}
        onClick={submitClickHandler}
      >
        {mode === 'add' ? 'Create Task' : 'Save Changes'}
      </SubmitButton>
    </ModalWinBackdropAndContainer>
  );
}