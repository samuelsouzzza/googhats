export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  online: boolean;
  lastAcess: Date;
}

export interface IMessage {
  _id: string;
  senderId: string;
  text: string;
  sentAt: Date;
  read: boolean;
}

export interface IChat {
  _id: string;
  participants: IUser[];
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IModalActions {
  icon?: IconDefinition;
  type: 'yes-no' | 'ok';
  message: string;
  onOk: () => void | null;
}
