import Image from 'next/image';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import Select, { ActionMeta, OnChangeValue, SingleValue } from 'react-select';
import styled from 'styled-components';
import {jakartaSans} from '../lib/fonts';
import {Board, Column, State, Task, TaskAction} from '../lib/types';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import {editTask} from '../redux/boards';
import {closeModalWin} from '../redux/modalWin';
import SubtaskCard from './SubtaskCard';

const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`

const Container = styled.div`
  width: 30rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 0.38rem;
  background-color: ${(props) => props.theme.colors.main};
`

const Content = styled.section`
  width: 25.98rem;
  margin: 2.0rem auto;

`

const TitleAndMoreBtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.h4`
  color: ${(props) => props.theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: 0;
  font-size: 1.13rem;
  line-height: 1.44rem;
  font-weight: 700;
  width: 24.19rem;
`

const MoreBtn = styled.button`
  border: none;
  padding: 0;
  background-color:  ${(props) => props.theme.colors.main};

  &:hover {
    cursor: pointer;
  }
`
const Description = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.81rem;
  line-height: 1.44rem;
  font-weight: 500;
  margin-top: 1.5rem;
` 

const Subheading = styled.h5`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 1.5rem;

`

const SubtaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 0;

`

const DropDown = styled(Select)`

  & .Select__indicator-separator {
    opacity: 0;
  }
  & .Select__dropdown-indicator {
    color: rgb(99, 95, 199);
  }
  & .Select__single-value {
    font-size: 0.81rem;
    color: ${(props) => props.theme.colors.textPrimary};
    font-weight: 500;
  }
  & .Select__control {
    border: 1px solid rgba(130, 143, 163, 0.25);
    height: 2.5rem;
  }
  & .Select__value-container {
    padding-left: 0.88rem;
  }
  & .Select__option {
    padding-left: 1.0rem;
    color: ${(props) => props.theme.colors.textPrimary};
    font-size: 0.81rem;
  }
`

export default function TaskModal() {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  // Type has been checked by parent component
  const task = useSelector((state: State) => state.modalWin).data as Task;

  // Options for drop-down box.
  const columnOptions: {value: number, label: string}[] = 
    boards
    .filter((board) => board.id === currentBoardId)
    [0]
    .columns
    .map((column) => ({value: column.id, label: column.name}));

  // Default value for drop-down box.
  const dropdownDefaultVal = () => {
    const currentColumn =  
      boards
      .filter((board) => board.id === currentBoardId)
      [0]
      .columns.filter((column) =>
        column
        .tasks
        .map((task) => task.id).includes(task.id)
      )
      [0];
    return {value: currentColumn.id, label: currentColumn.name};
  }

  const dropDownChangeHandler = 
    (newValue: SingleValue<{value: number, label: string}>) => {
      const taskAction: TaskAction = {
        boardId: currentBoardId,
        columnMoveToId: newValue?.value,
        task: task
      }
      dispatch(editTask(taskAction));
    };


  return (
    <Backdrop onClick={() => dispatch(closeModalWin())}>
      <Container onClick={(e) => {e.stopPropagation()}}>
        <Content>
          <TitleAndMoreBtn>
            <Title>{task.title}</Title>
            <MoreBtn>
              <Image src={moreIcon} alt='Vertical ellipsis icon'/>
            </MoreBtn>
          </TitleAndMoreBtn>
          <Description>
            {task.description}
          </Description>
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
          <DropDown
            onChange={dropDownChangeHandler}
            options={columnOptions}
            defaultValue={dropdownDefaultVal()}
            classNamePrefix={'Select'}
            className={jakartaSans.className}
          />
        </Content>
      </Container>
    </Backdrop>
  );
}