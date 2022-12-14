import Head from 'next/head';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import BoardView from '../components/BoardView';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { State } from '../lib/types';
import {importBoards} from '../redux/boards';
import {lightTheme, darkTheme} from '../themes';
import ModalWinSwitch from '../components/ModalWindows/ModalWinSwitch';
import { closeMenu } from '../redux/dropDownMenu';
import SidebarTab from '../components/SidebarTab'
import { setDarkMode } from '../redux/darkMode';

const Container = styled.div`
  width: 100wv;
  height: max(100vh);
  position: relative;
`

export default function Home() {
  const dispatch = useDispatch();
  const sidebarVis = useSelector((state: State) => state.sidebarVis);
  const darkMode = useSelector((state: State) => state.darkMode);
  const boards = useSelector((state: State) => state.boards);
  
  // Loads saved data into applicaction state if there is any.
  useLayoutEffect(() => {
    const savedBoards = localStorage.getItem('boards');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedBoards && savedDarkMode) {
      dispatch(importBoards(JSON.parse(savedBoards)));
      dispatch(setDarkMode(JSON.parse(savedDarkMode)[0]));
    }
  }, [dispatch]);

  // Saves to localStorage each time boards updates.
  useEffect(() => {
    // Timout required, otherwise default initial state
    // overwrites data in localStorage before it is retrieved. 
    setTimeout(() => {
      localStorage.setItem('boards', JSON.stringify(boards));
    }, 500);
    console.log('saved');
  }, [boards]);

  useEffect (() => {
    setTimeout(() => {
      localStorage.setItem('darkMode', JSON.stringify([darkMode]));
    })
  }, [darkMode]);


  const containerClickHandler = () => {
    dispatch(closeMenu());
  }

  return (
    <div>
      <Head>
        <title>Kanban Task Management</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <ModalWinSwitch/>
        <Container onClick={containerClickHandler}>
          <Sidebar/>
          {sidebarVis || <SidebarTab/>}
            <Header/>
            <BoardView/>
        </Container>
      </ThemeProvider>
    </div>
  )
}
