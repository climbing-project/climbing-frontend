import { useSession } from "next-auth/react";
import { useEffect, useRef, useState, type ReactElement } from "react";
import { Client, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import { requestData } from "@/service/api";
import { SOCKET_ADDRESS } from "@/constants/constants";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import type { NextPageWithLayout } from "@/pages/_app";
import type { MessageFormat } from "@/components/chat/ChatHistory";
import GlobalStyle from "@/styles/global-styles";
import ChatHistory from "@/components/chat/ChatHistory";
import ChatForm from "@/components/chat/ChatForm";
import { Chatroom } from "@/constants/admin/types";

const ChatPopup: NextPageWithLayout = ({
  roomId,
}: InferGetServerSidePropsType<GetServerSideProps>) => {
  const { data: session } = useSession();
  const [roomName, setRoomName] = useState("()");
  const clientRef = useRef(
    new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session?.user.token },
    }),
  );
  const [messages, setMessages] = useState<MessageFormat[]>(sampleData);

  console.log(session);

  useEffect(() => {
    const client = clientRef.current;
    console.log("STOMP 클라이언트:"); // 클라이언트 생성 확인
    console.log(client);

    const onClientConnect = () => {
      console.log("연결 성공");
      console.log("구독 시도");
      client.subscribe("/app", (message) => {
        console.log(message);

        // TALK 타입일 경우 리턴받은 message를 현재 상태에 추가
        // setMessages((prev) => [...prev, message]);
      });
      client.publish({
        destination: "/queue",
        body: JSON.stringify({
          type: "ENTER",
          sender: "testUser@gmail.com",
        }),
      });
    };

    const onClientDisconnect = () => {
      console.log("연결 종료");
      client.publish({
        destination: "/queue",
        body: JSON.stringify({
          type: "LEAVE",
        }),
      });
    };

    const onClientError = (frame: IFrame) => {
      console.log("에러 발생");
      console.log(frame); // 에러 확인
    };

    client.onConnect = onClientConnect;
    client.onDisconnect = onClientDisconnect;
    client.onStompError = onClientError;
    client.activate();
    requestData({
      option: "GET",
      url: `/room/${roomId}`,
      onSuccess: (roomData: Chatroom) => setRoomName(roomData.roomName),
    });

    return () => {
      client.deactivate();
    };
  }, [roomId]);

  const handleSend = (message: string) => {
    if (!clientRef.current.connected) {
      console.log("소켓 연결 안됨");
      return;
    }
    clientRef.current.publish({
      destination: "/queue",
      body: JSON.stringify({
        type: "TALK",
        roomId,
        sender: "testUser@gmail.com",
        message,
      }),
    });
  };

  return (
    <S.Wrapper>
      <S.Header>{roomName}님과의 채팅방</S.Header>
      <S.Container>
        <ChatHistory speaker="admin" history={messages} />
        <ChatForm placeholder="답변하기" handleSend={handleSend} />
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    height: 100vh;
  `,
  Header: styled.div`
    display: grid;
    place-content: center start;
    padding: 12px 8px;
    box-shadow: 0 1px 5px #d0d0d0;
    font-weight: 700;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    padding: 12px;
    height: calc(100% - 70px);
  `,
};

ChatPopup.getLayout = (page: ReactElement) => (
  <>
    <GlobalStyle />
    {page}
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const roomId = context.query.id;
  return { props: { roomId } };
};

export default ChatPopup;

const sampleData = [
  {
    userType: "customer",
    message: "dflkajsdf",
    time: 1711215412079,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1711225692079,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1712226312579,
  },
  {
    userType: "customer",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nesciunt maxime nam vel accusantium fugiat enim recusandae cumque est eligendi?",
    time: 1712226412091,
  },
  {
    userType: "admin",
    message: "dflkajsdf",
    time: 1712237512879,
  },
  {
    userType: "admin",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis nesciunt maxime nam vel accusantium fugiat enim recusandae cumque est eligendi?",
    time: 1712237622981,
  },
  {
    userType: "customer",
    message: "asdf1",
    time: 1713365096453,
  },
  {
    userType: "customer",
    message: "asdf2 fljgdlf kfjd lksjdlkfjlskdfj lsdkj fsldkjf kdjfsd8f sd8fj sdlfkj fff1321",
    time: 1713365099453,
  },
];
