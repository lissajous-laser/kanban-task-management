import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { State, Task, TaskAction } from '../../lib/types';
import { deleteTask } from '../../redux/boards';
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

export default function DeleteTaskModal() {
  const task = useSelector((state: State) => state.modalWin).data as Task;
  const dispatch = useDispatch();
  const currentBoardId = useSelector((state: State) => state.currentBoardId);

  const deleteClickHandler = () => {
    const taskAction: TaskAction = {
      boardId: currentBoardId,
      task: task
    };

    dispatch(deleteTask(taskAction));
    dispatch(closeModalWin());
  }

  const cancelClickHandler = () => {
    dispatch(viewTask(task));
  }

  return (
    <ModalWinBackdropAndContainer>
      <DeleteTitle>Delete this Task?</DeleteTitle>
      <Text>
        Are you sure you want to delete the
        &nbsp;‘{task.title}’&nbsp;
        task and its subtasks?
        This action cannot be reversed.
      </Text>
      <ButtonCluster>
        <DeleteButton onClick={deleteClickHandler}>Delete</DeleteButton>
        <CancelButton onClick={cancelClickHandler}>Cancel</CancelButton>
      </ButtonCluster>
    </ModalWinBackdropAndContainer>
  );
}