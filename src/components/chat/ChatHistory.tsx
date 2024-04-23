import { useEffect } from "react";
import styled from "styled-components";

// 소켓 동작 확인 후에 적용
export type MessageFormat = {
  userType: string;
  message: string;
  time: number;
};

type SortedMessageList = {
  date: string;
  messages: MessageFormat[];
}[];

interface ChatHistoryProps {
  history: MessageFormat[] | undefined;
  speaker: string;
}

const OPPOSITE_SPEAKER = {
  customer: "관리자",
  admin: "이용자",
};

const ChatHistory = ({ history, speaker }: ChatHistoryProps) => {
  useEffect(() => {
    document.querySelector(".tracker")?.scrollIntoView();
  }, [history]);

  const sortMessages = (messages: MessageFormat[]) => {
    const list: SortedMessageList = [];
    messages.forEach((message) => {
      const date = getDate(message.time);
      const listItem = list.find((item) => item.date === date);
      if (!listItem) {
        const newItem = { date, messages: [message] };
        list.push(newItem);
      } else {
        listItem.messages.push(message);
      }
    });
    return list;
  };

  const getDate = (epoch: number) => {
    return new Date(epoch).toLocaleDateString("ko-KR");
  };

  const getTime = (epoch: number) => {
    return new Date(epoch).toLocaleTimeString("ko-KR").slice(0, -3);
  };

  const sortedMessages: SortedMessageList = history ? sortMessages(history) : [];

  return (
    <Wrapper>
      {sortedMessages.map((batch, i) => (
        <div className="batch" key={i}>
          <div className="divider">{batch.date}</div>
          {batch.messages.map(({ userType, message, time }, i) => (
            <M.Wrapper key={i}>
              {userType !== speaker && batch.messages[i - 1]?.userType !== userType
                ? OPPOSITE_SPEAKER[speaker as keyof typeof OPPOSITE_SPEAKER]
                : null}
              <M.Message
                $speaker={userType === speaker}
                className={batch.messages[i + 1]?.userType !== userType ? "lastMessage" : ""}
              >
                {userType !== speaker ||
                (batch.messages[i + 1]?.userType === userType &&
                  batch.messages[i + 1] &&
                  getTime(batch.messages[i + 1].time) === getTime(time)) ? null : (
                  <span>{getTime(time)}</span>
                )}
                <div>{message}</div>
                {userType === speaker ||
                (batch.messages[i + 1]?.userType === userType &&
                  batch.messages[i + 1] &&
                  getTime(batch.messages[i + 1].time) === getTime(time)) ? null : (
                  <span>{getTime(time)}</span>
                )}
              </M.Message>
            </M.Wrapper>
          ))}
        </div>
      ))}
      <div className="tracker"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border-radius: 6px;
  padding: 5px;
  padding-left: 22px;
  flex: 1 0 0;
  margin-bottom: 12px;
  overflow-y: auto;
  scrollbar-gutter: stable;

  & .batch {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  & .divider {
    text-align: center;
    font-weight: 700;
    margin: 12px 0;
  }
`;

const M = {
  Wrapper: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
  `,
  Name: styled.div`
    font-weight: 700;
  `,
  Message: styled.div<{ $speaker: boolean }>`
    display: flex;
    align-items: flex-end;
    gap: 4px;
    max-width: 90%;
    align-self: ${({ $speaker }) => ($speaker ? "flex-end" : "flex-start")};

    &.lastMessage {
      margin-bottom: 18px;
    }

    & span {
      color: #9a9a9a;
      font-size: 0.8rem;
      flex-shrink: 0;
    }

    & > div {
      border-radius: 6px;
      border: 1px solid #cacaca;
      padding: 8px;
      background: ${({ $speaker }) => ($speaker ? null : "#cacaca")};
    }
  `,
};

export default ChatHistory;
