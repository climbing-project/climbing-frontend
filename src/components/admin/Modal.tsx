import styled from "styled-components";
import { type ReactNode } from "react";

interface ModalProps {
  closeModal: () => void;
  children: ReactNode;
}

export default function Modal({ closeModal, children }: ModalProps) {
  return (
    <Wrapper>
      <Background onClick={closeModal} />
      <Foreground>{children}</Foreground>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  display: grid;
  place-content: center center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Foreground = styled.div`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 1);
  border-radius: 1rem;
  padding: 2rem;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;
