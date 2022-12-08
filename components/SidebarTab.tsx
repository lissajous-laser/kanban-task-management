import Image from "next/image";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import eye from '../public/assets/icon-show-sidebar.svg';
import { hideSidebar, showSidebar } from "../redux/sidebarVis";


const Container = styled.button`
  height: 3.5rem;
  width: 3rem;
  border-radius: 0 2rem 2rem 0;
  background-color: ${(props) => props.theme.colors.accent};
  position: absolute;
  bottom: 2rem;
  left: 0;
  border: 0;
  padding: 0;


  &:hover {
    cursor: pointer;
  }
`

export default function SidebarTab() {
  const dispatch = useDispatch();

  const showSidebarClickHandler = () => {
    dispatch(showSidebar());
  }

  return (
    <Container onClick={showSidebarClickHandler}>
      <Image
        src={eye}
        alt='Show sidebar icon'
      />
    </Container>
  );
}