import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";
import type { MessageFormat } from "./components/chat/ChatHistory";

export const testinit = [
  {
    userType: "customer",
    message: "hi there",
    time: 1711215412079,
  },
  {
    userType: "admin",
    message: "hello what ",
    time: 1711225692079,
  },
  {
    userType: "admin",
    message: "can i do for you sir",
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

export type ChatHistoryProps = { [key: string]: MessageFormat[] } | undefined;

export type ChatHistoryContextProps = {
  history: ChatHistoryProps;
  updateHistory: Dispatch<SetStateAction<ChatHistoryProps>> | (() => void);
};

const ChatHistoryContext = createContext<ChatHistoryContextProps>({
  history: undefined,
  updateHistory: () => {},
});

const ChatHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<ChatHistoryProps>({});
  return (
    <ChatHistoryContext.Provider value={{ history, updateHistory: setHistory }}>
      {children}
    </ChatHistoryContext.Provider>
  );
};

export { ChatHistoryContext, ChatHistoryProvider };
