import Image from 'next/image';
import {useSelector} from 'react-redux';
import styled from 'styled-components';
import {jakartaSans} from '../../lib/fonts';
import {State, Task, TaskAction} from '../../lib/types';
import moreIcon from '../../public/assets/icon-vertical-ellipsis.svg';
import ModalWinBackdropAndContainer from './ModalWinBackdropAndContainer';
import SubtaskCard from './SubtaskCard';
import { Subheading } from './Subheading';
import DropDown from './DropDown';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../../redux/modalWin';
import { Title } from './Title';
import { Text } from './Text';

const TitleAndMoreBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const MoreBtn = styled.button`
  border: none;
  padding: 0;
  background-color:  ${(props) => props.theme.colors.main};
  position: relative;
  width: 0.75rem;
  display: flex;
  justify-content: right;

  &:hover {
    cursor: pointer;
  }
`

const SubtaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 0;

`

const Menu = styled.ul`
  height: 5.88rem;
  width: 12.0rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 0.5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  top: 2.63rem;
  transform: translateX(-50%);
  box-shadow: 0 0.1rem 0.6rem rgba(191, 191, 191, 0.3);
  margin-block-start: 0;
  margin-block-end: 0;
  list-style-type: none;
  font-size: 0.81rem;
  font-weight: 500;
  z-index: 1;

  &:hover {
    cursor: default;
  }
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
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  // Type has been checked by parent component
  const task = useSelector((state: State) => state.modalWin).data as Task;
  const dispatch = useDispatch();

  const moreBtnClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMenuIsOpen((state) => !state);
    e.stopPropagation();
  }

  const deleteTaskClickHandler = () => {
    dispatch(deleteTask(task));
  }

  return (
    <ModalWinBackdropAndContainer containerClickHandler={setMenuIsOpen}>
      <TitleAndMoreBtn>
        <Title>{task.title}</Title>
        <MoreBtn onClick={moreBtnClickHandler}>
          <Image src={moreIcon} alt='Vertical ellipsis icon'/>
        {menuIsOpen &&
          <Menu className={jakartaSans.className}>
            <EditTaskOption>Edit Task</EditTaskOption>
            <DeleteTaskOption onClick={deleteTaskClickHandler}>Delete Task</DeleteTaskOption>
          </Menu>
        }
        </MoreBtn>

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
          />
        )}
      </SubtaskList>
      <Subheading>Current Status</Subheading>
      <DropDown/>
    </ModalWinBackdropAndContainer>
  );
}