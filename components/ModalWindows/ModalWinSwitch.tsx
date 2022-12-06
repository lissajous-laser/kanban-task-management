import { useSelector } from "react-redux";
import { State } from "../../lib/types";
import AddOrEditBoardModal from "./AddOrEditBoardModal";
import AddOrEditTaskModal from "./AddOrEditTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import ViewTaskModal from "./ViewTaskModal";

export default function ModalWinSwitch() {
  const modalWin = useSelector((state: State) => state.modalWin);

  if (modalWin.mode === 'inactive') {
    return null;
  }

  // Test if modalWin.data is a Task or Board.
  if ('description' in modalWin.data) {
    switch (modalWin.mode) {
      case 'view':
        return <ViewTaskModal/>;
      case 'add':
        return <AddOrEditTaskModal/>;
      case 'delete':
        return <DeleteTaskModal/>;
      case 'edit':
        return <AddOrEditTaskModal/>;
      default:
        return null;
    }
  } else {
    switch (modalWin.mode) {
      case 'edit':
        return <AddOrEditBoardModal/>;
      default:
        return null;
    }
  }

}