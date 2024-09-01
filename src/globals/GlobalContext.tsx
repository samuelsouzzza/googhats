'use client';
import { IContact, IUser } from '@/@types/types';
import React from 'react';

type IScreens = {
  openedChat: IContact | null;
  setOpenedChat: React.Dispatch<React.SetStateAction<IContact | null>>;
  modalSearchUsers: boolean;
  setModalSearchUsers: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [openedChat, setOpenedChat] = React.useState<IContact | null>(null);
  const [modalSearchUsers, setModalSearchUsers] =
    React.useState<boolean>(false);

  const [userLogged, setUserLogged] = React.useState<IUser | null>({
    _id: '66d42e73e7d13e3d2f4fcc7c',
    name: 'Samuel',
    email: 'rssamuel17@gmail.com',
    profilePic:
      'https://www.vie-aesthetics.com/wp-content/uploads/2021/09/shutterstock_1877631178-1024x683.jpg',
    status: 'online',
    lastAcess: new Date(),
  });

  return (
    <GlobalContext.Provider
      value={{
        openedChat,
        setOpenedChat,
        modalSearchUsers,
        setModalSearchUsers,
        userLogged,
        setUserLogged,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
