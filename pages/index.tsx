import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components';
import BoardView from '../components/BoardView';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import TaskModal from '../components/TaskModal';
import { Board, State, Task } from '../lib/types';
import data from '../public/data.json'
import {importBoards} from '../redux/boards';
import styles from '../styles/Home.module.css';
import {lightTheme} from '../themes';


const Container = styled.div`
  display: flex;
  width: 100wv;
  height: 100vh;
`;

const Main = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export default function Home() {
  const dispatch = useDispatch();
  const boards = useSelector((state: State) => state.boards);
  const modalWin = useSelector((state: State) => state.modalWin);
  
  // Loads saved data if there is any.
  useEffect(() => {
    const savedData = localStorage.getItem('boards');

    if (savedData) {
      dispatch(importBoards(JSON.parse(savedData)));
    }
  });

  const renderTaskModal = () => {
    let maybeTask = modalWin.data as Task;

    if (maybeTask.subtasks !== undefined && modalWin.mode !== 'inactive') {
      return (
        <TaskModal/>
      );
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={lightTheme}>
        {renderTaskModal()}
        <Container>
          <Sidebar/>
          <Main>
            <Header/>
            <BoardView/>
          </Main>
        </Container>
      </ThemeProvider>
    </div>
  )
}
