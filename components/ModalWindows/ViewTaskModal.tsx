import Image from 'next/image';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import styled from 'styled-components';
import {jakartaSans} from '../../lib/fonts';
import {State, Task, TaskAction} from '../../lib/types';
import moreIcon from '../../public/assets/icon-vertical-ellipsis.svg';
import { deleteTask, editTask } from '../../redux/modalWin';
import { MoreButton } from '../MoreButton';
import SubtaskCard from './SubtaskCard';
import { Subheading } from './Subheading';
import DropDown from './DropDown';
import ModalWinBackdropAndContainer from './ModalWinBackdropAndContainer';
import { Title } from './Title';
import { Text } from './Text';
import { Menu } from '../Menu';

const TitleAndMoreBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MoreBtnRelative = styled(MoreButton)`
  position: relative;
`

const SubtaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 0;

`

const PositionedMenu = styled(Menu)`
  top: 2.63rem;
`

const MenuOption = styled.li`
  height: 1.44rem;
  width: 100%;
  line-height: 1.44rem;
  text-align: left;

  &:hover {
    cursor: pointer;
  }
`

const EditTaskOption = styled(MenuOption)`
  color: ${(props) => props.theme.colors.textSecondary};

`

const DeleteTaskOption = styled(MenuOption)`
  color: ${(props) => props.theme.colors.danger};
`

export default function ViewTaskModal() {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  // Type has been checked by parent component
  const task = useSelector((state: State) => state.modalWin).data as Task;

  const columnId = boards.filter(
    (board) => board.id === currentBoardId
  )[0].columns.filter(
    (column) => column.tasks.map(
      (task_) => task_.id
    ).includes(task.id)
  )[0].id;

  const moreBtnClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuIsOpen((state) => !state);
    e.stopPropagation();
  }

  const editTaskClickHandler = () => {
    dispatch(editTask(task));
  }

  const deleteTaskClickHandler = () => {
    dispatch(deleteTask(task));
  }

  return (
    <ModalWinBackdropAndContainer containerClickHandler={setMenuIsOpen}>
      <TitleAndMoreBtn>
        <Title>{task.title}</Title>
        <MoreBtnRelative onClick={moreBtnClickHandler}>
          <Image src={moreIcon} alt='Vertical ellipsis icon'/>
          {menuIsOpen &&
            <PositionedMenu className={jakartaSans.className}>
              <EditTaskOption onClick={editTaskClickHandler}>
                Edit Task
              </EditTaskOption>
              <DeleteTaskOption onClick={deleteTaskClickHandler}>
                Delete Task
              </DeleteTaskOption>
            </PositionedMenu>
          }
        </MoreBtnRelative>

      </TitleAndMoreBtn>
      <Text>
        {task.description}
      </Text>
      <Subheading>
      Subtasks
      ({task.subtasks.filter((task) => task.isCompleted).length}
      &nbsp;of {task.subtasks.length})
      </Subheading>
      <SubtaskList>
        {task.subtasks.map((subtask) =>
          <SubtaskCard
            key={subtask.title}
            subtask={subtask}
            task={task}
            columnId={columnId}
          />
        )}
      </SubtaskList>
      <Subheading>Current Status</Subheading>
      <DropDown/>
    </ModalWinBackdropAndContainer>
  );
}