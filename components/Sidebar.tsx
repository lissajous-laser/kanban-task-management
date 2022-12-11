import Image from "next/image";
import styled, { StyledComponent } from "styled-components";
import {jakartaSans} from '../lib/fonts';
import boardIcon from '../public/assets/icon-board.svg';
import logoLight from '../public/assets/logo-dark.svg';
import logoDark from '../public/assets/logo-light.svg';
import sun from '../public/assets/icon-light-theme.svg';
import moon from '../public/assets/icon-dark-theme.svg';
import hideSidebarIcon from '../public/assets/icon-hide-sidebar.svg';
import style from '../styles/Sidebar.module.css';
import { useSelector } from "react-redux";
import { Board, State } from "../lib/types";
import SidebarBoardBtn from "./SidebarBoardBtn";
import { useDispatch } from "react-redux";
import { addBoard } from "../redux/modalWin";
import sidebarVis, { hideSidebar } from "../redux/sidebarVis";
import { toggleDarkMode } from "../redux/darkMode";
import { SidebarBtn } from "./SidebarBtn";
import { device } from "../styles/breakpoints";

const Container = styled.nav<{sidebarVis: boolean}>`
  width: 18.75rem;
  height: ${(props) => props.sidebarVis ? '100%' : '6.06rem'};
  background-color: ${(props) => props.theme.colors.main};
  border-right: 0.06rem solid ${(props) => props.theme.colors.outline};
  border-bottom: 
    ${(props) => props.sidebarVis 
    ? 'none'
    : '0.06rem solid rgba(130, 143, 163, 0.25)'
    };
  flex-shrink: 0;
  position: fixed;
  top: 0;

  @media only screen and (${device.md}) {
    width: 16.25rem;
    height: ${(props) => props.sidebarVis ? '100%' : '5.06rem'};
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`

const Logo = styled(Image)`
  margin-top: 2.05rem;
  margin-left: 2.13rem;

  @media only screen and (${device.md}) {
    margin-left: 1.63rem;
  }
`

const BoardsListHead = styled.div`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: 0.75rem;
  letter-spacing: 0.15rem;
  font-weight: 700;
  margin-top: 3.38rem;
  margin-left: 2.0rem;

  @media only screen and (${device.md}) {
    margin-left: 1.5rem;
  }
`

const BoardsPanel = styled.div`
  width: 17.25rem;
`

const NewBoardBtn: StyledComponent<'button', any, {}, never> = styled(SidebarBtn)`
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.accent};
  
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.buttonSecondaryBg};
    color: ${(props) => props.theme.colors.accent};
  }
`

const ListOfBoards = styled.ul`
  padding-inline-start: 0;
  margin-top: 1.19rem;
  margin-bottom: 0;
`

const ThemePanel = styled.div`
  width: calc(100% - 3.0rem);
  height: 3.0rem;
  background-color: ${(props) => props.theme.colors.secondary};
  margin: 0 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.48rem;
  border-radius: 0.38rem;

  @media only screen and (${device.md}) {
    width: calc(100% - 1.5rem);
    margin: 0 0.75rem;
  }  
`

const ThemeBtn = styled.button<{darkMode: boolean}>`
  background-color: ${(props) => props.theme.colors.accent};
  width: 2.50rem;
  height: 1.25rem;
  border: none;
  border-radius: 0.63rem;
  display: flex;
  justify-content: ${(props) => 
    props.darkMode 
    ? 'right' 
    : 'left'};
  align-items: center;
  padding: 0.19rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.accentHover};

  }
`

const ToggleLever = styled.div`
  background-color: ${(props) => props.theme.colors.buttonPrimaryText};
  height: 0.88rem;
  width: 0.88rem;
  border-radius: 0.44rem;

`

const HideSidebarBtn = styled(SidebarBtn)`
  background-color: ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.textSecondary};
  margin-top: 0.5rem;
  margin-bottom: 2.0rem;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.buttonSecondaryBg};
    color: ${(props) => props.theme.colors.accent};
  }
`

export default function Sidebar() {
  const dispatch = useDispatch();
  const boards: Board[] = useSelector((state: State) => state.boards);
  const darkMode = useSelector((state: State) => state.darkMode);
  const sidebarVis = useSelector((state: State) => state.sidebarVis);

  const newBoardClickHandler = () => {
    const baseId = Date.now();

    const newBoard: Board = {
      id: baseId,
      name: '',
      columns: [
        {id: baseId + 1, name: '', tasks: []},
      ]
    }
    dispatch(addBoard(newBoard));
  }

  const darkModeClickHandler = () => {
    console.log(boards);
    dispatch(toggleDarkMode());
  }


  const hideSidebarClickHandler = () => {
    dispatch(hideSidebar());
  }

  return (
    <Container
      sidebarVis={sidebarVis}
      className={jakartaSans.className}
    >
      <Column>
        <div>
          <Logo
            className={style.logo}
            src={darkMode ? logoDark :  logoLight}
            alt='logo'
          />
          {sidebarVis &&
            <BoardsPanel>
              <BoardsListHead>
                ALL BOARDS
              </BoardsListHead>
              <ListOfBoards>
                {boards.map((board) => 
                  <SidebarBoardBtn key={board.id} board={board}/>
                )}
              </ListOfBoards>
              <NewBoardBtn 
                onClick={newBoardClickHandler} 
                className={jakartaSans.className}
              >
                <Image
                  className={style.boardIcon}
                  src={boardIcon}
                  alt='Kanban board icon'
                />
                <div>+ Create New Board</div>
              </NewBoardBtn>
            </BoardsPanel>
          }
        </div>
        {sidebarVis &&
          <div>
            <ThemePanel>
              <Image src={sun} alt='Sun icon'/>
              <ThemeBtn
                onClick={darkModeClickHandler}
                darkMode={darkMode}
              >
                <ToggleLever/>
              </ThemeBtn>
              <Image src={moon} alt='Moon icon'/>
            </ThemePanel>   
            <HideSidebarBtn
              onClick={hideSidebarClickHandler}
              className={jakartaSans.className}
            >
              <Image 
                className={style.hideSidebarIcon} 
                src={hideSidebarIcon} 
                alt='Hide sidebar icon'
              />
              <div>Hide Sidebar</div>
            </HideSidebarBtn>
          </div>
        }
      </Column>
    </Container>
  );
}