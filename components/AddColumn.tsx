import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { jakartaSans } from "../lib/fonts";
import { State } from "../lib/types";
import { editBoard } from "../redux/modalWin";

const ButtonContainer = styled.div`
  width: 17.5rem;
  height: 100%;
  padding-top: 3.94rem;
  padding-left: 1.5rem;
  padding-bottom: 3.13rem;
`

const Button = styled.button`
  /* width: 17.5rem;
  height: 70%; */
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.addColumnBg};
  color: ${(props) => props.theme.colors.textSecondary};
  padding: 0;
  border: 0;
  border-radius: 0.38rem;
  /* margin-left: 1.5rem; */
  /* margin-top: 3.94rem; */
  font-size: 1.5rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`

export default function AddColumn() {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const currentBoardId = useSelector((state: State) => state.currentBoardId);

  const clickHandler = () => {
    if (boards.length > 0) {
      dispatch(editBoard(
        boards.filter((board) => board.id === currentBoardId)[0]
      ));
    }
  }

  return (
    <ButtonContainer onClick={clickHandler}>
      <Button className={jakartaSans.className}>
        + New Column
      </Button>
    </ButtonContainer>
  );
}