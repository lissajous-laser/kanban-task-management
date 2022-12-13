import styled from 'styled-components';
import { device } from '../styles/breakpoints';

export const SidebarBtn = styled.button`
  border: none;
  font-size: 0.94rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 0 0 0 2.0rem;
  height: 3.0rem;
  width: 17.25rem;
  border-radius: 0 1.5rem 1.5rem 0;

  @media screen and (${device.md}) {
    padding-left: 1.5rem;
    width: 15rem;
  }
`
