import { useSelector } from "react-redux";
import { State } from "../../lib/types";
import AddOrEditBoardModal from "./AddOrEditBoardModal";
import AddOrEditTaskModal from "./AddOrEditTaskModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import ViewTaskModal from "./ViewTaskModal";

export default function ModalWinSwitch() {
  const modalWin = useSelector((state: State) => state.modalWin);

  if (modalWin.mode === 'inactive') {
    return null;
  }

  // Test if modalWin.data is a Task or Board.
  if ('subtasks' in modalWin.data) {
    switch (modalWin.mode) {
      case 'view':
        return <ViewTaskModal/>;
      case 'add':
      case 'edit':
        return <AddOrEditTaskModal/>; 
      case 'delete':
        return <ConfirmDeleteModal/>;

      default:
        return null;
    }
  } else if ('columns' in modalWin.data) {
    switch (modalWin.mode) {
      case 'add':
      case 'edit':
        return <AddOrEditBoardModal/>;
      case 'delete':
        return <ConfirmDeleteModal/>;        
      default:
        return null;
    }
  } else {
    return null;
  }

}