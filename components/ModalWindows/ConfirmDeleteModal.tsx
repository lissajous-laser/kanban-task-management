import { current } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State, Task, TaskAction } from '../../lib/types';
import { deleteBoard, deleteTask } from '../../redux/boards';
import { changeBoard } from '../../redux/currentBoardId';
import { closeModalWin, viewTask } from '../../redux/modalWin';
import { Button } from './Button';
import ModalWinBackdropAndContainer from './ModalWinBackdropAndContainer';
import { Text } from './Text';
import { Title } from './Title';

const DeleteTitle = styled(Title)`
  color: ${(props) => props.theme.colors.danger};
`

const ButtonCluster = styled.div`
  display: flex;
  gap: 1rem;
`

const DeleteButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.danger};
  color: ${(props) => props.theme.colors.buttonPrimaryText};
`

const CancelButton = styled(Button)`
  background-color: rgba(99, 95, 199, 0.25);
  color: ${(props) => props.theme.colors.accent};
`

export default function ConfirmDeleteModal() {
  const modalWinAction = useSelector((state: State) => state.modalWin);
  const dispatch = useDispatch();
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  const boards = useSelector((state: State) => state.boards);

  const deleteClickHandler = () => {
    if ('subtasks' in  modalWinAction.data) {
      const taskAction: TaskAction = {
        boardId: currentBoardId,
        task: modalWinAction.data
      };
  
      dispatch(deleteTask(taskAction));

    } else if ('columns' in modalWinAction.data) {
      // Determine which board to show in BoardView
      // after deletiono of current board.
      const currentBoard = boards.filter(
        (board) => board.id === currentBoardId
      )[0];
      const currentBoardIdx = boards.indexOf(currentBoard);
      console.log('current: ' + currentBoardIdx);
      const nextCurrentBoardIdx =
        boards[currentBoardIdx + 1] === undefined
        ? currentBoardIdx - 1
        : currentBoardIdx + 1;
      
      let nextCurrentBoardId: number;
      if (nextCurrentBoardIdx < 0) {
        nextCurrentBoardId = -1;
      } else {
        nextCurrentBoardId = boards[nextCurrentBoardIdx].id;
      }

      dispatch(changeBoard(nextCurrentBoardId));
      dispatch(deleteBoard(modalWinAction.data.id));
      
    } else {
      throw new Error(
        `Expected Task or Board in modalWinAction, but found {}`
      );
    }
    dispatch(closeModalWin());
  }

  const cancelClickHandler = () => {
    if ('subtasks' in modalWinAction.data) {
      dispatch(viewTask(modalWinAction.data));
    } else {
      dispatch(closeModalWin());
    }
  }

  const message = () => {
    if ('subtasks' in modalWinAction.data) {
      return `
        Are you sure you want to delete the
        ‘${modalWinAction.data.title}’
        task and its subtasks?
        This action cannot be reversed.
      `;
    } else if ('columns' in modalWinAction.data) {
      return `
        Are you sure you want to delete the 
        ‘${modalWinAction.data.name}’ board? 
        This action will remove all columns 
        and tasks and cannot be reversed.
      `
    }
  }

  return (
    <ModalWinBackdropAndContainer>
      <DeleteTitle>Delete this Task?</DeleteTitle>
      <Text>
        {message()}
      </Text>
      <ButtonCluster>
        <DeleteButton onClick={deleteClickHandler}>Delete</DeleteButton>
        <CancelButton onClick={cancelClickHandler}>Cancel</CancelButton>
      </ButtonCluster>
    </ModalWinBackdropAndContainer>
  );
}