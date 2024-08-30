'use client';
import { IContact } from '@/@types/types';
import React from 'react';

type IScreens = {
  openedChat: IContact | null;
  setOpenedChat: React.Dispatch<React.SetStateAction<IContact | null>>;
};

const GlobalContext = React.createContext<IScreens | null>(null);

export const UseGlobalContext = () => {
  const context = React.useContext(GlobalContext);
  if (!context) throw new Error('useContext deve estar dentro do Provider');
  return context;
};

export const GlobalContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [openedChat, setOpenedChat] = React.useState<IContact | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        openedChat,
        setOpenedChat,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
