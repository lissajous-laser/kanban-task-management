import {useSelector} from "react-redux";
import styled from "styled-components";
import {State} from "../lib/types";
import TaskCard from "./TaskCard";

const Container = styled.section`
  width: 17.5rem;
  margin-top: 1.56rem;
  margin-left: 1.5rem;
  flex-shrink: 0;
`

const Title = styled.h2`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  margin-top: 0;
  margin-bottom: 0;
`

const colorMarkers = ['#49C4E5', '#8471F2', '#67E2AE', '#f084f0'];

const ColorCircle = styled.div<{idx: number}>`
  height: 0.94rem;
  width: 0.94rem;
  border-radius: 9999rem;
  background-color: ${(props) =>
    colorMarkers[props.idx % colorMarkers.length]};
  flex-shrink: 0;
`

const Header = styled.div`
  display: flex;
  gap: 0.75rem;
`

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-inline-start: 0;
  margin-top: 1.50rem;
  list-style-type: none;
`

export default function BoardColumn({idx}: {idx: number}) {
  const boards = useSelector((state: State) => state.boards)
  const currentBoard = useSelector((state: State) => state.currentBoardId);
  const column = boards
      .filter((board) => board.id === currentBoard)[0]
      .columns[idx];

  return (
    <Container>
      <Header>
        <ColorCircle idx={idx}/>
        <Title>{column.name.toUpperCase()} ({column.tasks.length})</Title>
      </Header>
      <TaskList>{column.tasks.map((task) => <TaskCard key={task.id} task={task}/>)}</TaskList>
      
    </Container>
  );
}