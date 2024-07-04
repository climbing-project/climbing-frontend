import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useState,
  useRef,
  type MutableRefObject,
} from "react";
import { GymData } from "./constants/gyms/types";

type GymEditContextProps = EditStateProps | null;

export type EditStateProps = {
  currentData: GymData | null;
  loadedData: GymData | null;
  isUpdating: boolean;
  tracker: MutableRefObject<null | string>;
  setCurrentData: Dispatch<SetStateAction<GymData | null>>;
  setLoadedData: Dispatch<SetStateAction<GymData | null>>;
  setIsUpdating: Dispatch<SetStateAction<boolean>>;
};

const GymEditContext = createContext<GymEditContextProps>(null);

const GymEditContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentData, setCurrentData] = useState<GymData | null>(null);
  const [loadedData, setLoadedData] = useState<GymData | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const tracker = useRef<null | string>(null);
  const contextValue = {
    currentData,
    loadedData,
    isUpdating,
    tracker,
    setCurrentData,
    setLoadedData,
    setIsUpdating,
  };

  return <GymEditContext.Provider value={contextValue}>{children}</GymEditContext.Provider>;
};

export { GymEditContext, GymEditContextProvider };
