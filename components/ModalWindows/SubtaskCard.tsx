import Image from "next/image";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../../lib/fonts";
import { State, Subtask, Task, TaskAction } from "../../lib/types";
import checkIcon from '../../public/assets/icon-check.svg';
import {editTask} from "../../redux/boards";
import {viewTask} from "../../redux/modalWin";

const SubtaskContainer = styled.li`
  display: flex;
`

const SubtaskBtn = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  flex-grow: 1;
  gap: 1rem;
  border-radius: 0.25rem;

  &:hover {
    cursor: pointer;
    background-color: rgba(99, 95, 199, 0.25);
  }
`

const CheckBox = styled.div<{isCompleted: boolean}>`
  height: 1.0rem;
  width: 1.0rem;
  border-radius: 0.13rem;
  background-color: 
    ${(props) => props.isCompleted
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
  display: grid;
  place-items: center;
  flex-shrink: 0;
`

const Title = styled.p<{isCompleted: boolean}>`
  font-size: 0.75rem;
  line-height: 0.94rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  text-align: left;
  text-decoration-line: ${(props) =>
    props.isCompleted
    ? 'line-through'
    : 'none'
  };
  color: ${(props) =>
    props.isCompleted
    ? (props) => props.theme.colors.strikethroughTxt
    : (props) => props.theme.colors.textPrimary
  };
`

export default function SubtaskCard({
  subtask,
  task, // the Task where subtask is located in 
  columnId
} : {
  subtask: Subtask,
  task: Task,
  columnId: number
}) {
  
  const dispatch = useDispatch();
  const currendBoardId = useSelector((state: State) => state.currentBoardId);

  const clickHandler = () => {
    const changedTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      subtasks: task.subtasks.map((subtask_) => 
        subtask_.title === subtask.title
        ? {...subtask_, isCompleted: !subtask_.isCompleted}
        : subtask_
      )
    };

    const taskAction: TaskAction = {
      boardId: currendBoardId,
      columnSelected: columnId,
      task: changedTask
    };
    dispatch(editTask(taskAction));
    dispatch(viewTask(changedTask));
  }

  return (
    <SubtaskContainer>
      <SubtaskBtn
        onClick={clickHandler}
        className={jakartaSans.className}
      >
        <CheckBox isCompleted={subtask.isCompleted}>
          {subtask.isCompleted &&
            <Image src={checkIcon} alt='Check mark icon'/>
          }
        </CheckBox>
        <Title isCompleted={subtask.isCompleted}>
          {subtask.title}
        </Title>
      </SubtaskBtn>
    </SubtaskContainer>
  );
};