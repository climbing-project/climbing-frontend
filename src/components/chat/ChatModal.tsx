import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Client, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import { MdOutlineClose, MdOutlineSupportAgent } from "react-icons/md";
import Socket from "./Socket";
import { SERVER_ADDRESS, SOCKET_ADDRESS } from "@/constants/constants";

interface ChatModalProps {
  gymId: string;
  gymName: string;
}

type ExistingRoom = {
  exists: boolean;
  roomId: string | null;
};

const ChatModal = ({ gymId, gymName }: ChatModalProps) => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<null | Client>(null);
  const [roomId, setRoomId] = useState<null | string>(null);

  useEffect(() => {
    if (!session || client) return;

    const clientInstance = new Client({
      brokerURL: `${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session.jwt.accessToken },
    });

    const checkExistingRoom = async (nickname: string): Promise<ExistingRoom> => {
      try {
        const res = await fetch(`${SERVER_ADDRESS}/chat/room-check/${nickname}/${gymId}`, {
          headers: {
            Authorization: "Bearer " + session.jwt.accessToken,
          },
        });
        if (!res.ok) throw new Error("알 수 없는 오류가 발생했습니다.");
        const data = await res.json();
        return data;
      } catch (e) {
        console.log(e);
      }
      return { exists: false, roomId: null };
    };

    const createRoom = async (nickname: string) => {
      console.log("새 채팅방을 생성합니다.");
      try {
        const res = await fetch(`${SERVER_ADDRESS}/chat/room/${nickname}/${gymId}`, {
          method: "POST",
          headers: { Authorization: "Bearer " + session.jwt.accessToken },
        });
        if (res.redirected) throw new Error("로그인이 필요한 서비스입니다.");
        const { id } = await res.json();
        setRoomId(id);
      } catch (e) {
        console.log(e);
      }
    };

    const joinRoom = async () => {
      const nickname = session.user.nickname;
      const fetchedRoom = await checkExistingRoom(nickname);
      if (fetchedRoom.exists) return setRoomId(fetchedRoom.roomId);
      createRoom(nickname);
    };

    clientInstance.activate();

    clientInstance.onConnect = () => {
      joinRoom();
      setClient(clientInstance);
    };

    clientInstance.onStompError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const toggleModal = () => {
    if (isOpen) {
      setIsOpen(false);
    } else if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <S.Wrapper>
      <S.Modal>
        <S.Button $isOpen={isOpen} onClick={toggleModal}>
          {isOpen ? <MdOutlineClose size="2.2rem" /> : <MdOutlineSupportAgent size="2.2rem" />}
        </S.Button>
        {isOpen && <Socket gymName={gymName} client={client} roomId={roomId} />}
      </S.Modal>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: fixed;
    z-index: 100;
    bottom: 40px;
    right: 40px;
  `,
  Modal: styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
  `,
  Button: styled.div<{ $isOpen: boolean }>`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ $isOpen }) => ($isOpen ? "coral" : "black")};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    cursor: pointer;
  `,
};

export default ChatModal;
