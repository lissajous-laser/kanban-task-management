import { taskCancelled } from "@reduxjs/toolkit/dist/listenerMiddleware/exceptions";
import Image from "next/image";
import styled from "styled-components";
import { Subtask } from "../lib/types";
import checkIcon from '../public/assets/icon-check.svg';

const SubtaskContainer = styled.li`
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 0.75rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
`

const SubtaskBtn = styled.button`
  background-color: ${(props) => props.theme.colors.secondary};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.colors.textSecondary};
  display: flex;
  align-items: center;
  height: 2rem;
  gap: 1rem;

  &:hover {
    cursor: pointer;
  }
`

const CheckBox = styled.div<{isCompleted: boolean}>`
  height: 1.0rem;
  width: 1.0rem;
  border-radius: 0.13rem;
  background-color: ${(props) =>
    props.isCompleted
    ? (props) => props.theme.colors.accent
    : (props) => props.theme.colors.main
  };
  display: grid;
  place-items: center;
`

const Title = styled.p<{isCompleted: boolean}>`
  font-size: 0.75rem;
  line-height: 0.94rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 0;
  text-decoration-line: ${(props) =>
    props.isCompleted
    ? 'line-through'
    : 'none'
  };
  color: ${(props) =>
    props.isCompleted
    ? (props) => props.theme.colors.textSecondary
    : (props) => props.theme.colors.textPrimary
  };
`

export default function SubtaskCard({subtask} : {subtask: Subtask}) {
  return (
    <SubtaskContainer>
      <SubtaskBtn>
        <CheckBox isCompleted={subtask.isCompleted}>
          <Image src={checkIcon} alt='Check mark icon'/>
        </CheckBox>
        <Title isCompleted={subtask.isCompleted}>
          {subtask.title}
        </Title>
      </SubtaskBtn>
    </SubtaskContainer>
  );
}