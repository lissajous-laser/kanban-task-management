import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { jakartaSans } from '../../lib/fonts';
import { Board, State, TaskAction } from '../../lib/types';
import { addBoard, closeModalWin, editBoard } from '../../redux/modalWin';
import { addBoard as addBoardToBoards, editBoard as editBoardToBoards } from '../../redux/boards';
import { Button } from './Button';
import InputAndDeleteCombo from './InputAndDeleteCombo';
import ModalWinBackdropAndContainer from './ModalWinBackdropAndContainer';
import { Subheading } from './Subheading';
import { Title } from './Title';
import { TextInputWithValidation } from './TextInputWithValidation';
import ValidationMsg from './ValidationMsg';
import { changeBoard } from '../../redux/currentBoardId';

const TextInputWithValidationContainer = styled.div`
  position: relative;
`

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

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
  }
`

export default function AddOrEditBoardModal() {
  const dispatch = useDispatch();
  // State for showing validation message
  // - if Name text input is empty.
  const [isValidInput, setIsValidInput] = useState(true);  
  const modalWinAction = useSelector((state: State) => state.modalWin);
  const board = modalWinAction.data as Board;
  const mode = modalWinAction.mode;

  const nameInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changedBoard = {
      ...board,
      name: event.target.value
    };

    dispatchByMode(changedBoard);
    setIsValidInput(true);
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
    // Stop submission if Title text input is empty. 
    if (board.name === '') {
      setIsValidInput(false);
      return;
    }

    const changedBoard = {
      ...board,
      columns: board.columns.filter((column) => column.name !== '')
    }

    switch (mode) {
      case 'add':
        dispatch(addBoardToBoards(changedBoard));
        dispatch(changeBoard(board.id));
        break;
      case 'edit':
        dispatch(editBoardToBoards(changedBoard));
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
      <TextInputWithValidationContainer>
        <TextInputWithValidation
          className={jakartaSans.className}
          onChange={nameInputHandler}
          value={board.name}
          placeholder={'e.g. Web Design'}
          isValidInput={isValidInput}
        />
        {!isValidInput && <ValidationMsg/>}
      </TextInputWithValidationContainer>

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
        {mode === 'add' ? 'Create Board' : 'Save Changes'}
      </SubmitButton>
    </ModalWinBackdropAndContainer>
  );
}
