import { type Dispatch, type ReactNode, type SetStateAction, createContext, useState } from "react";

type GymListProps = Array<{ id: string; name: string }> | null;

type AdminContextProps = AdminStateProps | null;

export type AdminStateProps = {
  gymList: GymListProps;
  setGymList: Dispatch<SetStateAction<GymListProps | null>>;
  selectedGymId: string | null;
  setSelectedGymId: Dispatch<SetStateAction<string | null>>;
};

const AdminContext = createContext<AdminContextProps>(null);

const AdminContextProvider = ({ children }: { children: ReactNode }) => {
  const [gymList, setGymList] = useState<GymListProps>(null);
  const [selectedGymId, setSelectedGymId] = useState<null | string>(null);
  return (
    <AdminContext.Provider value={{ gymList, setGymList, selectedGymId, setSelectedGymId }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminContext, AdminContextProvider };
