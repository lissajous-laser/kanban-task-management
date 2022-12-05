import Image from "next/image";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../../lib/fonts";
import { Subtask, Task } from "../../lib/types";
import closeIcon from '../../public/assets/icon-cross.svg';
import { addTask } from "../../redux/modalWin";
import { TextInput } from "./TextInput";

const TextInputAndCloseBtn = styled.div`
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SubtaskInputWrapper = styled.div`
  width: 24.06rem;
`

const DeleteSubtaskBtn = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  padding: 0;
  height: 0.93rem;
  width: 0.93rem;

  &:hover {
    cursor: pointer;
  }
`

export default function SubtaskInputAndDeleteBtn({
  task,
  subtask
} : {
  task: Task,
  subtask: Subtask
}) {
  const dispatch = useDispatch();

  const deleteSubtaskHandler = () => {
    const changedTask = {
      ...task,
      subtasks: task.subtasks.filter(
        (subtask_) => subtask_.id !== subtask.id
      )
    };

    dispatch(addTask(changedTask));
  }

  return (
    <TextInputAndCloseBtn>
      <SubtaskInputWrapper>
      <TextInput
        className={jakartaSans.className}
        placeholder='e.g. Make coffee'
      />
      </SubtaskInputWrapper>
      <DeleteSubtaskBtn onClick={deleteSubtaskHandler}>
        <Image
          src={closeIcon}
          alt='Delete subtask'
        />
      </DeleteSubtaskBtn>
    </TextInputAndCloseBtn>
  );
}