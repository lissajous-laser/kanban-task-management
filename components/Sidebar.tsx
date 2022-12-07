import Image from "next/image";
import styled from "styled-components";
import {jakartaSans} from '../lib/fonts';
import boardIcon from '../public/assets/icon-board.svg';
import logoLight from '../public/assets/logo-dark.svg';
import logoDark from '../public/assets/logo-light.svg';
import sun from '../public/assets/icon-light-theme.svg';
import moon from '../public/assets/icon-dark-theme.svg';
import hideSidebarIcon from '../public/assets/icon-hide-sidebar.svg';
import style from '../styles/Sidebar.module.css';
import { useSelector } from "react-redux";
import { State } from "../lib/types";
import SidebarBoardBtn from "./SidebarBoardBtn";

const Container = styled.nav`
  width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.colors.main};
  border-right: 0.06rem solid ${(props) => props.theme.colors.outline}
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const BoardsListHead = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  letter-spacing: 0.15rem;
  font-weight: 700;
  margin-top: 3.38rem;
  margin-left: 2.0rem;
`

const BoardsPanel = styled.div`
  width: 17.25rem;
`

const ColumnLOffset = styled.div`
  padding-left: 2.0rem;
`

const NewBoardBtn = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.accent};
  border: none;
  font-size: 0.94rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0;
  margin-left: 2.0rem;
  
  &:hover {
    cursor: pointer;
  }
`

const ListOfBoards = styled.ul`
  padding-inline-start: 0;
  margin-top: 1.19rem;
  margin-bottom: 0;
`

const ThemePanel = styled.div`
  width: 15.69rem;
  height: 3.0rem;
  background-color: ${(props) => props.theme.colors.secondary};
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.48rem;
  border-radius: 0.38rem;
`

const ThemeBtn = styled.button`
  background-color: ${(props) => props.theme.colors.accent};
  width: 2.50rem;
  height: 1.25rem;
  border: none;
  border-radius: 0.63rem;
  display: flex;
  align-items: center;
  padding: 0.19rem;

  &:hover {
    cursor: pointer;
  }
`

const ToggleLever = styled.div`
  background-color: ${(props) => props.theme.colors.main};
  height: 0.88rem;
  width: 0.88rem;
  border-radius: 0.44rem;

`

const SidebarVisibleBtn = styled.button`
  border: none;
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.94rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  margin-left: 1.94rem;
  margin-top: 1.38rem;
  margin-bottom: 2.94rem;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`


export default function Sidebar() {
  const boards = useSelector((state: State) => state.boards);

  return (
  <Container className={jakartaSans.className}>
    <Column>
      <div>
        <Image
          className={style.logo}
          src={logoLight}
          alt='logo'
        />
        <BoardsPanel>
          <BoardsListHead>
            ALL BOARDS
          </BoardsListHead>
          <ListOfBoards>
            {boards.map((board) => <SidebarBoardBtn key={board.id} board={board}/>)}
          </ListOfBoards>
          <NewBoardBtn className={jakartaSans.className}>
            <Image
              className={style.boardIcon}
              src={boardIcon}
              alt='Kanban board icon'
            />
            <div>+ Create New Board</div>
          </NewBoardBtn>

        </BoardsPanel>
      </div>
      <div>
        <ThemePanel>
          <Image src={sun} alt='Sun icon'/>
          <ThemeBtn>
            <ToggleLever/>
          </ThemeBtn>
          <Image src={moon} alt='Moon icon'/>
        </ThemePanel>   
        <SidebarVisibleBtn className={jakartaSans.className}>
          <Image className={style.hideSidebarIcon} src={hideSidebarIcon} alt='Hide sidebar icon'/>
          <div>Hide Sidebar</div>
        </SidebarVisibleBtn>
      </div>
    </Column>
  </Container>);
}