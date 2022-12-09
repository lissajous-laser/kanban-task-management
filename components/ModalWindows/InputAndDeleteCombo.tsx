import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../../lib/fonts";
import { Board, Column, State, Subtask, Task } from "../../lib/types";
import deleteIcon from '../../public/assets/icon-cross.svg';
import deleteIconHover from '../../public/assets/icon-cross-red.svg';
import { addBoard, addTask, editBoard, editTask } from "../../redux/modalWin";
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

export default function InputAndDeleteCombo(props : 
  {task: Task, subtask: Subtask} | {board: Board, column: Column}
) {

  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const modalWinAction = useSelector((state: State) => state.modalWin);

  const textInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if ('task' in props) {
      const {task, subtask} = props;

      const changedTask = {
        ...task,
        subtasks: task.subtasks.map((subtask_) => 
          subtask_.id === subtask.id
          ? {
            ...subtask,
            title: event.target.value,
          }
          : subtask_
        )
      }

      dispatchGivenMode(changedTask);

    } else {
      const {board, column} = props;

      const changedBoard = {
        ...board,
        columns: board.columns.map((column_) => 
          column_.id === column.id
          ? {
            ...column,
            name: event.target.value,
          }
          : column_
        )
      }

      dispatchGivenMode(changedBoard);      
    }
  }

  const deleteSubtaskHandler = () => {
    if ('task' in props) {
      const {task, subtask} = props;

      const changedTask = {
        ...task,
        subtasks: task.subtasks.filter(
          (subtask_) => subtask_.id !== subtask.id
        )
      };
  
      dispatchGivenMode(changedTask);

    } else {
      const {board, column} = props;

      const changedBoard = {
        ...board,
        columns: board.columns.filter(
          (column_) => column_.id !== column.id
        )
      };
  
      dispatchGivenMode(changedBoard);
    }


  }

  const dispatchGivenMode = (changedItem: Task | Board) => {
    if ('subtasks' in changedItem) {
      switch (modalWinAction.mode) {
        case 'add':
          dispatch(addTask(changedItem));
          break;
        case 'edit':
          dispatch(editTask(changedItem));
          break;
      }
    } else {
      switch (modalWinAction.mode) {
        case 'add':
          dispatch(addBoard(changedItem));
          break;
        case 'edit':
          dispatch(editBoard(changedItem));
          break;
      }      
    }
  }

  return (
    <TextInputAndCloseBtn>
      <SubtaskInputWrapper>
      <TextInput
        className={jakartaSans.className}
        placeholder={'task' in props ? 'e.g. Make coffee' : 'eg. Todo'}
        value={'task' in props ? props.subtask.title : props.column.name}
        onChange={textInputHandler}
      />
      </SubtaskInputWrapper>
      <DeleteSubtaskBtn
        onClick={deleteSubtaskHandler}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? deleteIconHover : deleteIcon}
          alt='Delete subtask'
        />
      </DeleteSubtaskBtn>
    </TextInputAndCloseBtn>
  );
}
