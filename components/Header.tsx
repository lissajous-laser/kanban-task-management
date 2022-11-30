import Image from 'next/image';
import styled from 'styled-components';
import { jakartaSans } from '../lib/fonts';
import moreIcon from '../public/assets/icon-vertical-ellipsis.svg';
import style from '../styles/Header.module.css';

// TODO:
// - heading name uses state of current board

const Container = styled.div`
  width: 100%;
  height: 6.06rem;
  background-color: ${(props) => props.theme.colors.main};
  border-bottom: 0.06rem solid ${(props) => props.theme.colors.outline};
  display: flex;
  justify-content: space-between;
`

const BoardHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.colors.textPrimary};
  margin-left: 1.50rem;
  margin-top: 1.81rem;
`

const AndTaskAndMoreBtns = styled.div`
  margin-top: 1.25rem;
  margin-bottom: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-right: 2.02rem;
`

const AddTaskBtn = styled.button`
  width: 10.25rem;
  height: 3.0rem;
  border: none;
  border-radius: 1.5rem;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.buttonPrimaryText};
  font-size: 0.94rem;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }
`

const MoreBtn = styled.button`
  border: none;
  background-color:  ${(props) => props.theme.colors.main};

  &:hover {
    cursor: pointer;
  }
`

export default function Header() {
  return (
    <Container>
      <BoardHeading className={jakartaSans.className}>
        Platform Launch
      </BoardHeading>
      <AndTaskAndMoreBtns>
        <AddTaskBtn className={jakartaSans.className}>
          + Add New Task
        </AddTaskBtn>
        <MoreBtn>
          <Image className={style.moreIcon} src={moreIcon} alt='Vertical ellipsis icon'/>
        </MoreBtn>
      </AndTaskAndMoreBtns>
    </Container>
  );
}