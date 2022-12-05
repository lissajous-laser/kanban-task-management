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

const SubtaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-inline-start: 0;

`

export default function ViewTaskModal() {
  // Type has been checked by parent component
  const task = useSelector((state: State) => state.modalWin).data as Task;

  return (
    <ModalWinBackdropAndContainer>
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
      <DropDown/>
    </ModalWinBackdropAndContainer>
  );
}