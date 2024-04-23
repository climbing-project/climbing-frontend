import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Client, type IFrame } from "@stomp/stompjs";
import styled from "styled-components";
import ChatForm from "./ChatForm";
import ChatHistory from "./ChatHistory";
import LoginPrompt from "../common/LoginPrompt";
import { type ChatHistoryProps, ChatHistoryContext, testinit } from "@/ChatHistoryContext";
import { SERVER_ADDRESS, SOCKET_ADDRESS } from "@/constants/constants";

const Socket = ({ gymName }: { gymName: string }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const clientRef = useRef(
    new Client({
      brokerURL: `ws://${SOCKET_ADDRESS}/ws/chat`,
      connectHeaders: { Authorization: "Bearer " + session?.user.token },
    }),
  );
  const roomRef = useRef("");
  const { history, updateHistory } = useContext(ChatHistoryContext);

  useEffect(() => {
    const client = clientRef.current;

    // room 생성
    // roomId fetch
    const testurl = `${SERVER_ADDRESS}/chat/room`;
    // fetch(testurl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "text/plain",
    //     Authorization: session?.user.token!,
    //   },
    //   body: "test@gmail.com",
    // }).then((res) => {
    //   console.log(res);
    //   console.log(res.json());
    // });

    roomRef.current = "tet"; // 임시, 실제 roomId가 fetch되면 여기에 저장
    const loadedHistory: ChatHistoryProps = {};

    // 해당 room의 이전 채팅기록 fetch하고 context에 업데이트
    // fetch()
    // loadedHistory[roomRef.current as keyof typeof loadedHistory] = testinit; // 임시(테스트값)
    // updateHistory((prev) => ({ ...prev, ...loadedHistory }));

    const onClientConnect = () => {
      console.log("연결 성공");
      console.log("구독 시도");
      client.subscribe(`/queue/chat/room/${roomRef.current}`, (message) => {
        console.log(message); // 서버에서 도착한 메시지 확인
        // TALK 타입일 경우 리턴받은 message를 현재 상태에 추가
        // setMessages((prev) => [...prev, message]);
      });
      client.publish({
        destination: "/app/chat/message",
        body: JSON.stringify({
          type: "ENTER",
          roomId: roomRef.current,
          sender: "testUser@gmail.com",
        }),
      });
    };

    const onClientDisconnect = () => {
      console.log("연결 종료");
      client.publish({
        destination: "/app/chat/message",
        body: JSON.stringify({
          type: "LEAVE",
          roomId: roomRef.current,
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

    return () => {
      client.deactivate();
    };
  }, [updateHistory]);

  const handleSend = (message: string) => {
    if (message === "") return;
    // if (!clientRef.current.connected) {
    //   console.log("소켓 연결 안됨");
    //   return;
    // }
    // if (roomRef.current === "") {
    //   console.log("입장한 방이 없음");
    //   return;
    // }
    // clientRef.current.publish({
    //   destination: "/app/chat/message",
    //   body: JSON.stringify({
    //     type: "TALK",
    //     roomId: roomRef.current,
    //     sender: "testUser@gmail.com",
    //     message,
    //   }),
    // });

    const newMessage = { userType: "customer", message, time: Date.now() };
    const newHistory: ChatHistoryProps = { ...history };
    if (history?.[roomRef.current as keyof typeof history]) {
      newHistory[roomRef.current as keyof typeof newHistory] = [
        ...history[roomRef.current as keyof typeof history],
        newMessage,
      ];
    } else {
      newHistory[roomRef.current as keyof typeof newHistory] = [newMessage];
    }
    updateHistory((prev) => ({ ...prev, ...newHistory }));
  };

  return (
    <S.Wrapper>
      <S.Container>
        <S.Header>{gymName}</S.Header>
        {/* {session ? (
          <>
            <ChatHistory speaker="customer" history={history?.[roomRef.current]} />
            <ChatForm placeholder="문의를 남겨주세요 :)" handleSend={handleSend} />
          </>
        ) : (
          <LoginPrompt />
        )} */}
        <ChatHistory speaker="customer" history={history?.[roomRef.current]} />
        <ChatForm placeholder="문의를 남겨주세요 :)" handleSend={handleSend} />
      </S.Container>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    box-sizing: border-box;
    position: absolute;
    bottom: 75px;
    right: 0;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #cacaca;
    box-shadow: 0 3px 7px #cacaca;
    background: white;
    width: 370px;
    height: 500px;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  `,
  Header: styled.div`
    text-align: center;
    font-size: 1.2rem;
    font-weight: 700;
    padding-bottom: 8px;
    -webkit-box-shadow: 0 3px 7px -7px #cacaca;
    -moz-box-shadow: 0 3px 7px -7px #cacaca;
    box-shadow: 0 3px 7px -7px #cacaca;
  `,
};

export default Socket;
