import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Select, {SingleValue} from 'react-select';
import styled from 'styled-components';
import {jakartaSans} from '../../lib/fonts';
import { State, Task, TaskAction } from '../../lib/types';
import {editTask} from '../../redux/boards';

const StyledSelect = styled(Select)`
  & .Select__indicator-separator {
    opacity: 0;
  }
  & .Select__dropdown-indicator {
    color: ${(props) => props.theme.colors.accent};
  }
  & .Select__single-value {
    font-size: 0.81rem;
    color: ${(props) => props.theme.colors.textPrimary};
    font-weight: 500;
  }
  & .Select__control {
    border: 1px solid ${(props) => props.theme.colors.controlOutline};
    background-color: ${(props) => props.theme.colors.main};
    height: 2.5rem;

    &:hover {
      border-color: ${(props) => props.theme.colors.accent};
    }
  }
  & .Select__value-container {
    padding-left: 0.88rem;
  }
  & .Select__option {
    padding-left: 1.0rem;
    color: ${(props) => props.theme.colors.textSecondary};
    background-color: ${(props) => props.theme.colors.main};
    font-size: 0.81rem;
    &:hover {
      background-color: ${(props) => props.theme.colors.accentFaded};
    }
  }
  & .Select__menu {
    background-color: ${(props) => props.theme.colors.main};
  }
`

// Props are only required for adding or editing a task, where
// changes are not automatically updated in the boards redux slice.
export default function DropDown({
  dropDownSelected,
  setDropDownSelected
} : {
  dropDownSelected?: {value: number, label: string},
  setDropDownSelected?: Dispatch<SetStateAction<{value: number, label: string}>>
}) {

  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId);
  // Type of task has been checked by modal window component.
  const task = useSelector((state: State) => state.modalWin).data as Task;

  const columns =  boards.filter(
    (board) => board.id === currentBoardId)[0].columns;
    
  const currentColumn = columns.filter((column) =>
    column.tasks.map(
      (task_) => task_.id
    ).includes(task.id))[0];

  // Options for drop-down box.
  const options: {value: number, label: string}[] = 
    boards
    .filter((board) => board.id === currentBoardId)
    [0]
    .columns
    .map((column) => ({value: column.id, label: column.name}));

  // Default value for drop-down box.
  const dropdownDefaultVal = () => {
    // There is no current column if a new task is being added.
    if (currentColumn === undefined) {
      return {value: columns[0].id, label: columns[0].name}
    }

    return {value: currentColumn.id, label: currentColumn.name};
  }

  const dropDownChangeHandler = 
    (newValue: unknown) => {
      const castNewValue = newValue as {value: number, label: string}

      if (!setDropDownSelected && currentColumn !== undefined) {
        const taskAction: TaskAction = {
          boardId: currentBoardId,
          columnSelected: castNewValue.value,
          task: task
        };
        dispatch(editTask(taskAction));
      } else if (setDropDownSelected && newValue) {
        setDropDownSelected({
          value: castNewValue.value,
          label: castNewValue.label
        });
      }
    }

  return (
    <StyledSelect
      onChange={dropDownChangeHandler}
      options={options}
      defaultValue={dropDownSelected ? dropDownSelected : dropdownDefaultVal()}
      classNamePrefix={'Select'}
      className={jakartaSans.className}
    />
  );
}