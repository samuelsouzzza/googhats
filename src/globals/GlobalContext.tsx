'use client';
import { IChat, IUser } from '@/@types/types';
import React from 'react';

type IScreens = {
  openedChat: IChat | null;
  setOpenedChat: React.Dispatch<React.SetStateAction<IChat | null>>;
  menuSearchUsers: boolean;
  setMenuSearchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  userLogged: IUser | null;
  setUserLogged: React.Dispatch<React.SetStateAction<IUser | null>>;
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
  const [openedChat, setOpenedChat] = React.useState<IChat | null>(null);
  const [menuSearchUsers, setMenuSearchUsers] = React.useState<boolean>(false);
  const [userLogged, setUserLogged] = React.useState<IUser | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        openedChat,
        setOpenedChat,
        menuSearchUsers,
        setMenuSearchUsers,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
