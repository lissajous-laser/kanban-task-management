import styled from 'styled-components';
import { jakartaSans } from '../lib/fonts';


// TODO:
// - has data about column of current board
// - has tasks of each item in board

const Container = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  flex-grow: 1;
  width: 100%;
`


export default function BoardView() {
  return (
    <Container>
      
    </Container>
  );
}