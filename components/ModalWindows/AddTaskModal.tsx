import Image from "next/image";
import { ChangeEvent, useState } from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../../lib/fonts";
import {State, Task, TaskAction} from "../../lib/types";
import {addTask as addTaskToBoards} from "../../redux/boards";
import {addTask, closeModalWin} from "../../redux/modalWin";
import DropDown from "./DropDown";
import ModalWinBackdropAndContainer from "./ModalWinBackdropAndContainer";
import { Subheading } from "./Subheading";
import SubtaskInputAndDeleteBtn from "./SubtaskInputAndDeleteBtn";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

const Title = styled.h4`
  font-size: 1.13rem;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-top: 0;
  margin-bottom: 1.5rem;
`

const TextArea = styled.textarea`
  height: 7rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 0.25rem;
  border: 0.06rem solid ${(props) => props.theme.colors.controlOutline};
  width: 100%;
  color: ${(props) => props.theme.colors.textSecondary};
  line-height: 1.44rem;
  font-size: 0.81rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  resize: none;
  
  &::placeholder {
    color: ${(props) => props.theme.colors.textPlaceholder};
  }
`

const SubtasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`

const AddSubtaskButton = styled(Button)`
  background-color: rgba(99, 95, 199, 0.25);
  color: ${(props) => props.theme.colors.accent};
`

const AddTaskButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.main};
`

export default function AddTaskModal() {
  const dispatch = useDispatch();
  const task = useSelector((state: State) => state.modalWin).data as Task;
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  const columns =  boards.filter(
    (board) => board.id === currentBoardId)[0].columns;

  const dropDownDefault = () => {
    const currentColumn = columns.filter((column) =>
      column.tasks.map(
        (task_) => task_.id
      ).includes(task.id))[0];

    if (currentColumn === undefined) {
      return {value: columns[0].id, label: columns[0].name}
    }

    return {value: currentColumn.id, label: currentColumn.name};
  }

  const [dropDownSelected, setDropDownSelected] = useState(dropDownDefault());

  const titleInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const changedTask = {
      ...task,
      title: event.target.value
    };

    dispatch(addTask(changedTask));
  }

  const descInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const changedTask = {
      ...task,
      description: event.target.value
    };
    
    dispatch(addTask(changedTask));
  }

  const addSubTaskHandler = () => {
    const changedTask = {
      ...task,
      subtasks: [
        ...task.subtasks,
        {id: Date.now(), title: '', isCompleted: false}
      ]
    };

    dispatch(addTask(changedTask));
  }

  const addTaskHandler = () => {


    const taskAction: TaskAction = {
      boardId: currentBoardId,
      columnIdToAddOrMove: dropDownSelected.value,
      task: {
        ...task,
        subtasks: task.subtasks.filter((subtask) => subtask.title !== '')
      }
    }

    dispatch(addTaskToBoards(taskAction));
    dispatch(closeModalWin());
  }

  return (
    <ModalWinBackdropAndContainer>
      <Title>Add New Task</Title>
      <TextInput
        className={jakartaSans.className}
        onChange={titleInputHandler}
      />
      <Subheading>Description</Subheading>
      <TextArea
        onChange={descInputHandler}
        className={jakartaSans.className}
        placeholder='e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little.'
      />
      <Subheading>Subtasks</Subheading>
      <SubtasksContainer>
        {task.subtasks.map((subtask) =>
          <SubtaskInputAndDeleteBtn
            key={subtask.id}
            task={task}
            subtask={subtask}
          />
        )}
      </SubtasksContainer>
      <AddSubtaskButton
        className={jakartaSans.className}
        onClick={addSubTaskHandler}
      >
        + Add New Subtask
      </AddSubtaskButton>
      <Subheading>Status</Subheading>
      <DropDown
        dropDownSelected={dropDownSelected}
        setDropDownSelected={setDropDownSelected}
      />
      <AddTaskButton onClick={addTaskHandler}>Create Task</AddTaskButton>
    </ModalWinBackdropAndContainer>
  );
}