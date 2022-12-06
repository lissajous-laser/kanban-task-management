import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../lib/fonts";
import { Task } from "../lib/types";
import { viewTask } from "../redux/modalWin";

const Container = styled.li`
  background-color: ${(props) => props.theme.colors.main};
  width: 100%;
  border-radius: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  box-shadow: 0 0.3rem 0.5rem rgba(191, 191, 191, 0.3);

  &:hover {
    cursor: pointer;
  }
`

const Title = styled.h4`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: 0.94rem;
  font-weight: 700;
  margin-top: 1.44rem;
  margin-bottom: 0;
`

const Progess = styled.h5`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 700;
  margin-top: 0.50rem;
  margin-bottom: 1.44rem;

`

export default function TaskCard({task} : {task: Task}) {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(viewTask(task));
  };

  return (
    <Container onClick={clickHandler}>
      <Title>{task.title}</Title>
      <Progess>
        {task.subtasks.filter((subtask) => subtask.isCompleted).length}
        &nbsp;of {task.subtasks.length} subtasks
      </Progess>
    </Container>
  );
}