import Image from "next/image";
import { ChangeEvent, useState } from "react";
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../../lib/fonts";
import {State, Task, TaskAction} from "../../lib/types";
import {addTask as addTaskToBoards, editTask as editTaskToBoards} from "../../redux/boards";
import {addTask, closeModalWin, editTask} from "../../redux/modalWin";
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

const SubmitButton = styled(Button)`
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.main};
`

export default function AddOrEditTaskModal() {
  const dispatch = useDispatch();
  const modalWinAction = useSelector((state: State) => state.modalWin);
  const task = modalWinAction.data as Task;
  const mode = modalWinAction.mode;
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

    dispatchGivenMode(changedTask);
  }

  const descInputHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const changedTask = {
      ...task,
      description: event.target.value
    };
    
    dispatchGivenMode(changedTask);
  }

  const addSubTaskHandler = () => {
    const changedTask = {
      ...task,
      subtasks: [
        ...task.subtasks,
        {id: Date.now(), title: '', isCompleted: false}
      ]
    };

    dispatchGivenMode(changedTask);
  }

  const dispatchGivenMode = (changedTask: Task) => {
    switch (modalWinAction.mode) {
      case 'add':
        dispatch(addTask(changedTask));
      case 'edit':
        dispatch(editTask(changedTask));
    }
  }

  const submitHandler = () => {

    const taskAction: TaskAction = {
      boardId: currentBoardId,
      columnSelected: dropDownSelected.value, ///// FIX this
      task: {
        ...task,
        subtasks: task.subtasks.filter((subtask) => subtask.title !== '')
      }
    }

    switch (modalWinAction.mode) {
      case 'add':
        dispatch(addTaskToBoards(taskAction));
      case 'edit':
        dispatch(editTaskToBoards(taskAction));
    }
    dispatch(closeModalWin());
  }

  return (
    <ModalWinBackdropAndContainer>
      <Title>{mode === 'add' ? 'Add New' : 'Edit'} Task</Title>
      <Subheading>Title</Subheading>
      <TextInput
        className={jakartaSans.className}
        onChange={titleInputHandler}
        placeholder='e.g. Take coffee break'
        value={task.title}
      />
      <Subheading>Description</Subheading>
      <TextArea
        onChange={descInputHandler}
        className={jakartaSans.className}
        placeholder='e.g. It’s always good to take a break. This 15 minute break will 
        recharge the batteries a little.'
        value={task.description}
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
      <SubmitButton onClick={submitHandler}>
        {mode === 'add' ? 'Create Task' : 'Save Changes'}
      </SubmitButton>
    </ModalWinBackdropAndContainer>
  );
}